"use client";

import { FormEvent, KeyboardEvent, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";

type PipelineStage = "Enquiry" | "Qualified" | "Documents" | "Embassy" | "Visa Granted" | "Closed";
type AdminTab = "Dashboard" | "Email" | "Receipts" | "Clients";

type ClientRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  destination: string;
  stage: PipelineStage;
  notes: string;
};

type EmailFormState = {
  recipient: string;
  subject: string;
  message: string;
  campaignTag: string;
};

type ReceiptFormState = {
  clientName: string;
  serviceName: string;
  amount: string;
  currency: string;
  issuedDate: string;
  dueDate: string;
  notes: string;
};

const stages: PipelineStage[] = ["Enquiry", "Qualified", "Documents", "Embassy", "Visa Granted", "Closed"];
const adminTabs: AdminTab[] = ["Overview", "Messaging", "Billing", "Leads"];
const tabLabels: Record<AdminTab, string> = {
  Overview: "Overview",
  Messaging: "Messaging",
  Billing: "Billing",
  Leads: "Leads / CRM",
};
const tabStorageKey = "admin_active_tab";

const createClientId = () => `CL-${Math.floor(100000 + Math.random() * 900000)}`;
const createReceiptId = () => `RC-${Math.floor(100000 + Math.random() * 900000)}`;
const isAdminTab = (value: string | null): value is AdminTab => value !== null && adminTabs.includes(value as AdminTab);

export default function AdminPage() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activityMessage, setActivityMessage] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("Dashboard");

  const [email, setEmail] = useState("123@example.com");
  const [password, setPassword] = useState("123456");

  const [emailForm, setEmailForm] = useState<EmailFormState>({
    recipient: "",
    subject: "",
    message: "",
    campaignTag: "General",
  });

  const [receiptForm, setReceiptForm] = useState<ReceiptFormState>({
    clientName: "",
    serviceName: "",
    amount: "",
    currency: "USD",
    issuedDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    notes: "",
  });

  const [clientForm, setClientForm] = useState<ClientRecord>({
    id: createClientId(),
    fullName: "",
    email: "",
    phone: "",
    service: "Study Visa",
    destination: "Germany",
    stage: "Enquiry",
    notes: "",
  });

  const [clients, setClients] = useState<ClientRecord[]>([]);

  const [emailError, setEmailError] = useState("");
  const [receiptError, setReceiptError] = useState("");
  const [clientError, setClientError] = useState("");
  const [pipelineError, setPipelineError] = useState("");

  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSavingReceipt, setIsSavingReceipt] = useState(false);
  const [isSavingClient, setIsSavingClient] = useState(false);
  const [updatingClientId, setUpdatingClientId] = useState<string | null>(null);

  const tabButtonRefs = useRef<Record<AdminTab, HTMLButtonElement | null>>({
    Overview: null,
    Messaging: null,
    Billing: null,
    Leads: null,
  });

  useEffect(() => {
    const storedClients = window.localStorage.getItem("admin_clients");
    if (storedClients) {
      setClients(JSON.parse(storedClients) as ClientRecord[]);
    }

    const params = new URLSearchParams(window.location.search);
    const tabFromQuery = params.get("tab");
    const tabFromStorage = window.localStorage.getItem(tabStorageKey);
    if (isAdminTab(tabFromQuery)) {
      setActiveTab(tabFromQuery);
    } else if (isAdminTab(tabFromStorage)) {
      setActiveTab(tabFromStorage);
    }

    fetch("/api/admin/auth", { cache: "no-store" })
      .then((response) => response.ok)
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
      })
      .finally(() => setIsCheckingSession(false));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(tabStorageKey, activeTab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    window.history.replaceState({}, "", url);
  }, [activeTab]);

  const stageStats = useMemo(
    () =>
      stages.map((stage) => ({
        stage,
        total: clients.filter((client) => client.stage === stage).length,
      })),
    [clients],
  );

  const recentClients = useMemo(() => clients.slice(0, 4), [clients]);

  const persistClients = (nextClients: ClientRecord[]) => {
    setClients(nextClients);
    window.localStorage.setItem("admin_clients", JSON.stringify(nextClients));
  };

  const postToSheet = async (sheetType: string, payload: object) => {
    const response = await fetch("/api/admin/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sheetType, payload }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json?.error || "Unable to save.");
    }

    if (json?.warning) {
      return json.warning as string;
    }

    return "Saved to dashboard and forwarded to Google Sheets.";
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");

    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setAuthError("Invalid credentials. Use the configured admin account.");
      return;
    }

    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  const submitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError("");
    setIsSendingEmail(true);

    try {
      const nextMessage = await postToSheet("email_messages", emailForm);
      setActivityMessage(nextMessage);
      setEmailForm({ recipient: "", subject: "", message: "", campaignTag: "General" });
    } catch (error) {
      setEmailError(error instanceof Error ? error.message : "Unable to queue email message.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const submitClient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError("");
    setIsSavingClient(true);

    try {
      const nextClients = [clientForm, ...clients];
      persistClients(nextClients);
      const nextMessage = await postToSheet("clients", clientForm);
      setActivityMessage(nextMessage);
      setClientForm({
        id: createClientId(),
        fullName: "",
        email: "",
        phone: "",
        service: "Study Visa",
        destination: "Germany",
        stage: "Enquiry",
        notes: "",
      });
    } catch (error) {
      setClientError(error instanceof Error ? error.message : "Unable to save client record.");
    } finally {
      setIsSavingClient(false);
    }
  };

  const submitReceipt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReceiptError("");
    setIsSavingReceipt(true);

    try {
      const receipt = {
        receiptId: createReceiptId(),
        ...receiptForm,
        amount: Number(receiptForm.amount),
      };
      const nextMessage = await postToSheet("receipts", receipt);
      setActivityMessage(nextMessage);
      setReceiptForm({
        clientName: "",
        serviceName: "",
        amount: "",
        currency: "USD",
        issuedDate: new Date().toISOString().slice(0, 10),
        dueDate: "",
        notes: "",
      });
    } catch (error) {
      setReceiptError(error instanceof Error ? error.message : "Unable to save receipt.");
    } finally {
      setIsSavingReceipt(false);
    }
  };

  const updateClientStage = async (id: string, stage: PipelineStage) => {
    setPipelineError("");
    setUpdatingClientId(id);

    try {
      const nextClients = clients.map((client) => (client.id === id ? { ...client, stage } : client));
      persistClients(nextClients);

      const updatedClient = nextClients.find((client) => client.id === id);
      const nextMessage = await postToSheet("status_updates", {
        clientId: id,
        stage,
        fullName: updatedClient?.fullName,
        email: updatedClient?.email,
      });
      setActivityMessage(nextMessage);
    } catch (error) {
      setPipelineError(error instanceof Error ? error.message : "Unable to update client stage.");
    } finally {
      setUpdatingClientId(null);
    }
  };

  const handleTabKeyboardNavigation = (event: KeyboardEvent<HTMLButtonElement>, currentTab: AdminTab) => {
    const currentIndex = adminTabs.indexOf(currentTab);

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextTab = adminTabs[(currentIndex + 1) % adminTabs.length];
      setActiveTab(nextTab);
      tabButtonRefs.current[nextTab]?.focus();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const previousTab = adminTabs[(currentIndex - 1 + adminTabs.length) % adminTabs.length];
      setActiveTab(previousTab);
      tabButtonRefs.current[previousTab]?.focus();
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveTab(adminTabs[0]);
      tabButtonRefs.current[adminTabs[0]]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      const lastTab = adminTabs[adminTabs.length - 1];
      setActiveTab(lastTab);
      tabButtonRefs.current[lastTab]?.focus();
    }
  };

  if (isCheckingSession) {
    return <main className="mx-auto max-w-6xl px-4 py-12">Checking admin session...</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="mx-auto max-w-md px-4 py-12">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-600">Temporary access for operations management dashboard.</p>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {authError ? <p className="text-sm text-red-600">{authError}</p> : null}
            <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white">
              Sign in
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Advanced Admin Dashboard</h1>
            <p className="text-sm text-slate-600">CRM, receipts, and Google Sheet sync for operations.</p>
          </div>
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        {activityMessage ? <p className="mt-3 rounded-lg bg-emerald-50 p-2 text-sm text-emerald-700">{activityMessage}</p> : null}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Admin sections">
          {(["Dashboard", "Email", "Receipts", "Clients"] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {activeTab === "Dashboard" ? (
        <section className="grid gap-4 md:grid-cols-3">
          {stageStats.map((item) => (
            <article key={item.stage} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">{item.stage}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{item.total}</p>
            </article>
          ))}
        </section>
      ) : null}

      {activeTab === "Email" ? (
        <section>
          <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={submitEmail}>
            <h2 className="text-lg font-bold text-slate-900">Email Campaign Queue</h2>
            <p className="text-sm text-slate-600">Compose message and save it to a Google Sheet for Apps Script sending.</p>
            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Recipient email"
                value={emailForm.recipient}
                onChange={(event) => setEmailForm({ ...emailForm, recipient: event.target.value })}
                required
              />
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Subject"
                value={emailForm.subject}
                onChange={(event) => setEmailForm({ ...emailForm, subject: event.target.value })}
                required
              />
              <textarea
                className="h-32 w-full rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Email message"
                value={emailForm.message}
                onChange={(event) => setEmailForm({ ...emailForm, message: event.target.value })}
                required
              />
              <input
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Campaign tag"
                value={emailForm.campaignTag}
                onChange={(event) => setEmailForm({ ...emailForm, campaignTag: event.target.value })}
              />
              <button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white">
                Save email to sheet
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {activeTab === "Receipts" ? (
        <section>
          <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={submitReceipt}>
            <h2 className="text-lg font-bold text-slate-900">Receipt Builder</h2>
            <p className="text-sm text-slate-600">Generate receipt data and sync it to your finance sheet.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className="rounded-xl border border-slate-300 px-3 py-2 md:col-span-2"
                placeholder="Client name"
                value={receiptForm.clientName}
                onChange={(event) => setReceiptForm({ ...receiptForm, clientName: event.target.value })}
                required
              />
              <input
                className="rounded-xl border border-slate-300 px-3 py-2 md:col-span-2"
                placeholder="Service"
                value={receiptForm.serviceName}
                onChange={(event) => setReceiptForm({ ...receiptForm, serviceName: event.target.value })}
                required
              />
              <input
                type="number"
                className="rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Amount"
                value={receiptForm.amount}
                onChange={(event) => setReceiptForm({ ...receiptForm, amount: event.target.value })}
                required
              />
              <input
                className="rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Currency"
                value={receiptForm.currency}
                onChange={(event) => setReceiptForm({ ...receiptForm, currency: event.target.value.toUpperCase() })}
                required
              />
              <input
                type="date"
                className="rounded-xl border border-slate-300 px-3 py-2"
                value={receiptForm.issuedDate}
                onChange={(event) => setReceiptForm({ ...receiptForm, issuedDate: event.target.value })}
                required
              />
              <input
                type="date"
                className="rounded-xl border border-slate-300 px-3 py-2"
                value={receiptForm.dueDate}
                onChange={(event) => setReceiptForm({ ...receiptForm, dueDate: event.target.value })}
              />
              <textarea
                className="rounded-xl border border-slate-300 px-3 py-2 md:col-span-2"
                placeholder="Receipt notes"
                value={receiptForm.notes}
                onChange={(event) => setReceiptForm({ ...receiptForm, notes: event.target.value })}
              />
              <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white md:col-span-2">
                Save receipt
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {activeTab === "Clients" ? (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={submitClient}>
            <h2 className="text-lg font-bold text-slate-900">Client CRM Intake</h2>
            <p className="text-sm text-slate-600">Create client records and send to a dedicated sheet.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className="rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Full name"
                value={clientForm.fullName}
                onChange={(event) => setClientForm({ ...clientForm, fullName: event.target.value })}
                required
              />
              <input
                type="email"
                className="rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Email"
                value={clientForm.email}
                onChange={(event) => setClientForm({ ...clientForm, email: event.target.value })}
                required
              />
              <input
                className="rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Phone"
                value={clientForm.phone}
                onChange={(event) => setClientForm({ ...clientForm, phone: event.target.value })}
                required
              />
              <input
                className="rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Destination"
                value={clientForm.destination}
                onChange={(event) => setClientForm({ ...clientForm, destination: event.target.value })}
                required
              />
              <input
                className="rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Service type"
                value={clientForm.service}
                onChange={(event) => setClientForm({ ...clientForm, service: event.target.value })}
                required
              />
              <select
                className="rounded-xl border border-slate-300 px-3 py-2"
                value={clientForm.stage}
                onChange={(event) => setClientForm({ ...clientForm, stage: event.target.value as PipelineStage })}
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
              <textarea
                className="rounded-xl border border-slate-300 px-3 py-2 md:col-span-2"
                placeholder="Notes"
                value={clientForm.notes}
                onChange={(event) => setClientForm({ ...clientForm, notes: event.target.value })}
              />
              <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white md:col-span-2">
                Save client
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Pipeline Tracker</h2>
            <p className="text-sm text-slate-600">Move clients from enquiry to visa granted and sync status updates.</p>
            <div className="mt-4 max-h-96 space-y-3 overflow-auto pr-1">
              {clients.length === 0 ? <p className="text-sm text-slate-500">No clients yet. Add one from CRM intake.</p> : null}
              {clients.map((client) => (
                <article key={client.id} className="rounded-xl border border-slate-200 p-3">
                  <p className="font-semibold text-slate-900">{client.fullName}</p>
                  <p className="text-xs text-slate-500">{client.id} • {client.service}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <select
                      className="w-full rounded-lg border border-slate-300 px-2 py-1 text-sm"
                      value={client.stage}
                      onChange={(event) => updateClientStage(client.id, event.target.value as PipelineStage)}
                    >
                      {stages.map((stage) => (
                        <option key={`${client.id}-${stage}`} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
