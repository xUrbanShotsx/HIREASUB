import { OverviewView } from "@/components/app/OverviewView";
import type { Role } from "@/lib/roles";

export default async function Overview({
  params,
}: {
  params: Promise<{ role: Role }>;
}) {
  const { role } = await params;
  return <OverviewView role={role} />;
}
