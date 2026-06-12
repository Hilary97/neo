import { cn } from "@/lib/cn";
import type { BadgeVariant } from "@/lib/products";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  "best-seller": "bg-blue-500 text-white",
  "limited-edition": "bg-amber-200 text-black",
  sale: "bg-sale text-white",
  new: "bg-green-600 text-white",
  "pre-order": "bg-black text-white",
  kit: "bg-sale text-white",
};

interface ProductBadgeProps {
  label: string;
  variant: BadgeVariant;
}

export function ProductBadge({ label, variant }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase leading-none tracking-wide",
        BADGE_STYLES[variant]
      )}
    >
      {label}
    </span>
  );
}
