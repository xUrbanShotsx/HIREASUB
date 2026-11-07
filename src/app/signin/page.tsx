import type { Metadata } from "next";
import { RoleChoice } from "@/components/RoleChoice";

export const metadata: Metadata = { title: "Sign in" };

export default function SignIn() {
  return (
    <RoleChoice
      eyebrow="Sign in"
      title="Welcome back. Which are you?"
      note="Pick your account type and we will take you to your dashboard."
      alt={{ text: "New here?", href: "/signup", label: "Create an account" }}
    />
  );
}
