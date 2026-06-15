import { redirect } from "next/navigation";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Elwison Denampo.",
};

export default function ContactPage() {
  redirect("/#contact");
}
