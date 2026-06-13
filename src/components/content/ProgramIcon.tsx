import {
  PackageIcon,
  FlaskIcon,
  PlantIcon,
  RecycleIcon,
} from "@phosphor-icons/react/ssr";
import type { IconProps } from "@phosphor-icons/react";
import type { Program } from "@/content/programs";

/** Maps the data-layer icon name to a Phosphor icon component. */
const map = {
  PackageOpen: PackageIcon,
  FlaskConical: FlaskIcon,
  Sprout: PlantIcon,
  Recycle: RecycleIcon,
} as const;

export function ProgramIcon({
  name,
  weight = "duotone",
  ...props
}: { name: Program["iconName"] } & IconProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" weight={weight} {...props} />;
}
