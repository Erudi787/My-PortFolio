import { redirect } from "next/navigation";

export const metadata = {
  title: "Projects",
  description: "Featured projects shipped by Elwison Denampo.",
};

export default function ProjectsPage() {
  redirect("/#projects");
}
