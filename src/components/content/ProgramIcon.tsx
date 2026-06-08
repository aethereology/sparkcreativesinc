import { PackageOpen, FlaskConical, Sprout, Recycle, type LucideProps } from "lucide-react";
import type { Program } from "@/content/programs";

const map = {
  PackageOpen,
  FlaskConical,
  Sprout,
  Recycle,
} as const;

export function ProgramIcon({
  name,
  ...props
}: { name: Program["iconName"] } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" {...props} />;
}
