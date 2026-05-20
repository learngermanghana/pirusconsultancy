import type { Metadata } from "next";
import { Suspense } from "react";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Service",
  description: "Book Sedifex services and pay online securely.",
};

export default function BookingPage() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-600">Loading booking form...</p>}>
      <BookingClient />
    </Suspense>
  );
}
