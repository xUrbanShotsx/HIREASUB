import type { Metadata } from "next";
import { SubProfile } from "@/components/app/SubProfile";

export const metadata: Metadata = { title: "Subcontractor profile" };

export default async function Profile({
  params,
}: {
  params: Promise<{ role: string; id: string }>;
}) {
  const { role, id } = await params;
  return <SubProfile id={id} role={role} />;
}
