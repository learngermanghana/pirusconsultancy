"use client";

import { useEffect, useMemo, useState } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  price?: string;
};

function parsePrice(value?: string) {
  if (!value) return 0;
  const parsed = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function BookingClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    serviceId: "",
    name: "",
    phone: "",
    email: "",
    bookingDate: "",
    bookingTime: "",
    notes: "",
  });

  const selectedService = useMemo(() => services.find((service) => service.id === form.serviceId), [services, form.serviceId]);
  const selectedAmount = useMemo(() => parsePrice(selectedService?.price), [selectedService]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/integration/bookings/services");
        const data = await res.json();
        if (data?.ok) {
          setServices(data.services || []);
          if (data.services?.[0]?.id) {
            setForm((prev) => ({ ...prev, serviceId: data.services[0].id }));
          }
        }
      } finally {
        setLoadingServices(false);
      }
    };

    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!selectedService) {
      setMessage("Please select a service.");
      return;
    }
    if (!selectedAmount || selectedAmount <= 0) {
      setMessage("Selected service has no valid Sedifex price. Please contact support.");
      return;
    }

    setSubmitting(true);

    try {
      const bookingRes = await fetch("/api/integration/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: form.serviceId,
          serviceName: selectedService.title,
          bookingDate: form.bookingDate,
          bookingTime: form.bookingTime,
          notes: form.notes,
          paymentAmount: selectedAmount,
          paymentMethod: "paystack",
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
          },
          attributes: {
            source: "website_booking_form",
          },
        }),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok || !bookingData?.ok) {
        setMessage(bookingData?.message || "Could not create booking.");
        return;
      }

      const bookingId = bookingData.bookingId;
      const clientOrderId = `BOOKING-${bookingId || Date.now()}`;

      const checkoutRes = await fetch("/api/integration/bookings/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          serviceId: form.serviceId,
          serviceName: selectedService.title,
          amount: selectedAmount,
          clientOrderId,
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
          },
        }),
      });

      const checkoutData = await checkoutRes.json();

      if (!checkoutRes.ok || !checkoutData?.ok || !checkoutData?.authorizationUrl) {
        setMessage(checkoutData?.message || "Checkout creation failed.");
        return;
      }

      window.location.href = checkoutData.authorizationUrl;
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Book an Appointment</h1>
      <p className="text-sm text-slate-600">Book a Sedifex service and pay online securely.</p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium">Service</label>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            value={form.serviceId}
            onChange={(e) => setForm((prev) => ({ ...prev, serviceId: e.target.value }))}
            disabled={loadingServices}
            required
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}{service.price ? ` — ${service.price}` : ""}
              </option>
            ))}
          </select>
          {selectedService ? <p className="mt-2 text-sm text-slate-600">Price from Sedifex: <strong>{selectedService.price || "Not set"}</strong></p> : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Full name" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Phone" required value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
          <input className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2" type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          <input className="rounded-lg border border-slate-300 px-3 py-2" type="date" required value={form.bookingDate} onChange={(e) => setForm((p) => ({ ...p, bookingDate: e.target.value }))} />
          <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Time (e.g. 10:00 AM)" required value={form.bookingTime} onChange={(e) => setForm((p) => ({ ...p, bookingTime: e.target.value }))} />
        </div>

        <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} rows={4} />

        <button type="submit" disabled={submitting || loadingServices} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
          {submitting ? "Processing..." : "Book & Pay Online"}
        </button>

        {message ? <p className="text-sm text-red-600">{message}</p> : null}
      </form>
    </section>
  );
}
