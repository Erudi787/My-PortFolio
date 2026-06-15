import { redirect } from "next/navigation";

export const metadata = {
  title: "About",
  description: "Learn about Elwison Denampo, a full-stack developer building production systems.",
};

export default function AboutPage() {
  redirect("/#about");
}
