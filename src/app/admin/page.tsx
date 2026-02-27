"use client";

import { FormEvent, KeyboardEvent, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";

type PipelineStage = "Enquiry" | "Qualified" | "Documents" | "Embassy" | "Visa Granted" | "Closed";
type AdminTab = "Overview" | "Messaging" | "Billing" | "Leads";

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
  const [activeTab, setActiveTab] = useState<AdminTab>("Overview");

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

      <AdminTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stageStats={stageStats}
        clientCount={clients.length}
        tabButtonRefs={tabButtonRefs}
        onTabKeyDown={handleTabKeyboardNavigation}
      />

      <DashboardTab
        activeTab={activeTab}
        stageStats={stageStats}
        recentClients={recentClients}
        onTabChange={setActiveTab}
      />

      <EmailTab
        activeTab={activeTab}
        emailForm={emailForm}
        setEmailForm={setEmailForm}
        onSubmit={submitEmail}
        errorMessage={emailError}
        isSubmitting={isSendingEmail}
      />

      <ReceiptsTab
        activeTab={activeTab}
        receiptForm={receiptForm}
        setReceiptForm={setReceiptForm}
        onSubmit={submitReceipt}
        errorMessage={receiptError}
        isSubmitting={isSavingReceipt}
      />

      <ClientsTab
        activeTab={activeTab}
        clientForm={clientForm}
        setClientForm={setClientForm}
        clients={clients}
        onSubmit={submitClient}
        onStageChange={updateClientStage}
        formErrorMessage={clientError}
        stageErrorMessage={pipelineError}
        isSubmitting={isSavingClient}
        updatingClientId={updatingClientId}
      />
    </main>
  );
}

function AdminTabs({
  activeTab,
  onTabChange,
  stageStats,
  clientCount,
  tabButtonRefs,
  onTabKeyDown,
}: {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  stageStats: Array<{ stage: PipelineStage; total: number }>;
  clientCount: number;
  tabButtonRefs: MutableRefObject<Record<AdminTab, HTMLButtonElement | null>>;
  onTabKeyDown: (event: KeyboardEvent<HTMLButtonElement>, currentTab: AdminTab) => void;
}) {
  const tabCounts: Record<AdminTab, number> = {
    Overview: stageStats.reduce((sum, item) => sum + item.total, 0),
    Messaging: 0,
    Billing: 0,
    Leads: clientCount,
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Admin sections">
        {adminTabs.map((tab) => {
          const tabId = `tab-${tab.toLowerCase()}`;
          const panelId = `panel-${tab.toLowerCase()}`;

          return (
            <button
              key={tab}
              type="button"
              id={tabId}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={panelId}
              tabIndex={activeTab === tab ? 0 : -1}
              ref={(element) => {
                tabButtonRefs.current[tab] = element;
              }}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              onClick={() => onTabChange(tab)}
              onKeyDown={(event) => onTabKeyDown(event, tab)}
            >
              {tabLabels[tab]}
              <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeTab === tab ? "bg-slate-700" : "bg-slate-200"}`}>
                {tabCounts[tab]}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DashboardTab({
  activeTab,
  stageStats,
  recentClients,
  onTabChange,
}: {
  activeTab: AdminTab;
  stageStats: Array<{ stage: PipelineStage; total: number }>;
  recentClients: ClientRecord[];
  onTabChange: (tab: AdminTab) => void;
}) {
  if (activeTab !== "Overview") {
    return null;
  }

  return (
    <section id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stageStats.map((item) => (
          <article key={item.stage} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.stage}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{item.total}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => onTabChange("Leads")}
          className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-300"
        >
          <p className="text-sm font-semibold text-slate-900">Add New Lead</p>
          <p className="mt-1 text-sm text-slate-600">Create client intake and move prospects through your pipeline.</p>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("Billing")}
          className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-300"
        >
          <p className="text-sm font-semibold text-slate-900">Create Billing Record</p>
          <p className="mt-1 text-sm text-slate-600">Build a receipt entry and send it to your finance sheet quickly.</p>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("Messaging")}
          className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-300"
        >
          <p className="text-sm font-semibold text-slate-900">Queue Campaign Message</p>
          <p className="mt-1 text-sm text-slate-600">Prepare outreach emails and push them to your messaging queue.</p>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Recent Lead Activity</h2>
        <p className="text-sm text-slate-600">Latest prospects added to your CRM.</p>
        <div className="mt-4 space-y-2">
          {recentClients.length === 0 ? <p className="text-sm text-slate-500">No recent leads yet.</p> : null}
          {recentClients.map((client) => (
            <article key={client.id} className="rounded-xl border border-slate-200 p-3">
              <p className="font-semibold text-slate-900">{client.fullName || "Unnamed lead"}</p>
              <p className="text-xs text-slate-500">
                {client.id} • {client.stage} • {client.destination}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmailTab({
  activeTab,
  emailForm,
  setEmailForm,
  onSubmit,
  errorMessage,
  isSubmitting,
}: {
  activeTab: AdminTab;
  emailForm: EmailFormState;
  setEmailForm: (nextState: EmailFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  errorMessage: string;
  isSubmitting: boolean;
}) {
  if (activeTab !== "Messaging") {
    return null;
  }

  return (
    <section id="panel-messaging" role="tabpanel" aria-labelledby="tab-messaging">
      <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={onSubmit}>
        <h2 className="text-lg font-bold text-slate-900">Campaign Messaging Queue</h2>
        <p className="text-sm text-slate-600">Compose message and save it to a Google Sheet for Apps Script sending.</p>
        <div className="mt-4 space-y-3">
          {errorMessage ? <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{errorMessage}</p> : null}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save email to sheet"}
          </button>
        </div>
      </form>
    </section>
  );
}

function ReceiptsTab({
  activeTab,
  receiptForm,
  setReceiptForm,
  onSubmit,
  errorMessage,
  isSubmitting,
}: {
  activeTab: AdminTab;
  receiptForm: ReceiptFormState;
  setReceiptForm: (nextState: ReceiptFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  errorMessage: string;
  isSubmitting: boolean;
}) {
  if (activeTab !== "Billing") {
    return null;
  }

  return (
    <section id="panel-billing" role="tabpanel" aria-labelledby="tab-billing">
      <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={onSubmit}>
        <h2 className="text-lg font-bold text-slate-900">Billing & Receipt Builder</h2>
        <p className="text-sm text-slate-600">Generate receipt data and sync it to your finance sheet.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {errorMessage ? <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700 md:col-span-2">{errorMessage}</p> : null}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            {isSubmitting ? "Saving..." : "Save receipt"}
          </button>
        </div>
      </form>
    </section>
  );
}

function ClientsTab({
  activeTab,
  clientForm,
  setClientForm,
  clients,
  onSubmit,
  onStageChange,
  formErrorMessage,
  stageErrorMessage,
  isSubmitting,
  updatingClientId,
}: {
  activeTab: AdminTab;
  clientForm: ClientRecord;
  setClientForm: (nextState: ClientRecord) => void;
  clients: ClientRecord[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onStageChange: (id: string, stage: PipelineStage) => Promise<void>;
  formErrorMessage: string;
  stageErrorMessage: string;
  isSubmitting: boolean;
  updatingClientId: string | null;
}) {
  if (activeTab !== "Leads") {
    return null;
  }

  return (
    <section id="panel-leads" role="tabpanel" aria-labelledby="tab-leads" className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={onSubmit}>
        <h2 className="text-lg font-bold text-slate-900">Leads Intake (CRM)</h2>
        <p className="text-sm text-slate-600">Create client records and send to a dedicated sheet.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {formErrorMessage ? <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700 md:col-span-2">{formErrorMessage}</p> : null}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            {isSubmitting ? "Saving..." : "Save lead"}
          </button>
        </div>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Pipeline Tracker</h2>
        <p className="text-sm text-slate-600">Move clients from enquiry to visa granted and sync status updates.</p>
        {stageErrorMessage ? <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{stageErrorMessage}</p> : null}
        <div className="mt-4 max-h-96 space-y-3 overflow-auto pr-1">
          {clients.length === 0 ? <p className="text-sm text-slate-500">No clients yet. Add one from CRM intake.</p> : null}
          {clients.map((client) => (
            <article key={client.id} className="rounded-xl border border-slate-200 p-3">
              <p className="font-semibold text-slate-900">{client.fullName}</p>
              <p className="text-xs text-slate-500">
                {client.id} • {client.service}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <select
                  className="w-full rounded-lg border border-slate-300 px-2 py-1 text-sm"
                  value={client.stage}
                  disabled={updatingClientId === client.id}
                  onChange={(event) => onStageChange(client.id, event.target.value as PipelineStage)}
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
  );
}
