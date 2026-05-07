import type { Metadata } from "next";
import { PaymentsPage } from "@/components/app/payments-page";

export const metadata: Metadata = {
  title: "Payments - Climate Kavach",
  description: "Fast payment gateway link for Climate Kavach premium data pack.",
};

export default function PaymentsRoute() {
  return <PaymentsPage />;
}
