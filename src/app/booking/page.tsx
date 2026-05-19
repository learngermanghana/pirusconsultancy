import type { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Service",
  description: "Book Sedifex services and pay online securely.",
};

export default function BookingPage() {
  return <BookingClient />;
}
