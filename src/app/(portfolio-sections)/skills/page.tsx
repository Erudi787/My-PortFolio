import { redirect } from "next/navigation";

export const metadata = {
  title: "Skills",
  description: "Technical repertoire — frontend, backend, database, and tooling.",
};

export default function SkillsPage() {
  redirect("/#skills");
}
