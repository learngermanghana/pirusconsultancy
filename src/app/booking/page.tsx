import { redirect } from "next/navigation";

const WHATSAPP_BOOKING_URL = "https://wa.me/4917620721491";

export default function BookingPage() {
  redirect(WHATSAPP_BOOKING_URL);
}
