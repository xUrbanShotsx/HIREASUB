import type { Metadata } from "next";
import { RoleChoice } from "@/components/RoleChoice";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUp() {
  return (
    <RoleChoice
      eyebrow="Sign up"
      title="Join HireASub. Which are you?"
      note="Choose how you work. You can add your licence and insurance once you are in."
      alt={{
        text: "Already have an account?",
        href: "/signin",
        label: "Sign in",
      }}
    />
  );
}
