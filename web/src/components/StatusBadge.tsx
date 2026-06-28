import type { LitterStatus } from "@/lib/sanity/types";

const STATUS_CONFIG: Record<LitterStatus, { label: string; className: string; pulse?: boolean }> = {
  a_venir: { label: "À venir", className: "badge-statut--upcoming", pulse: true },
  disponible: { label: "Disponible", className: "badge-statut--available", pulse: true },
  option: { label: "Option", className: "badge-statut--reserved" },
  reserve: { label: "Réservé", className: "badge-statut--reserved" },
  adopte: { label: "Adopté", className: "badge-statut--adopted" },
};

export default function StatusBadge({ status }: { status: LitterStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`badge-statut ${config.className}`}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      {config.pulse && <span className="pulse-dot" style={{ marginRight: 6 }} />}
      {config.label}
    </span>
  );
}
