import { Boxes, PackageCheck, Truck, GraduationCap, TrendingUp } from "lucide-react";

const STEPS = [
  { icon: Boxes, title: "Collect", body: "Donors and partners give useful goods, materials, and funds." },
  { icon: PackageCheck, title: "Pack", body: "Volunteers sort and pack supplies into Spark Boxes." },
  { icon: Truck, title: "Deliver", body: "Boxes reach families, students, and community partners." },
  { icon: GraduationCap, title: "Host", body: "Spark Labs turn materials into hands-on learning." },
  { icon: TrendingUp, title: "Grow", body: "Spark Studio supports mentorship, leadership, and ventures." },
];

export function ProcessFlow() {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        return (
          <li key={step.title} className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary font-display font-semibold">
                {i + 1}
              </span>
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
