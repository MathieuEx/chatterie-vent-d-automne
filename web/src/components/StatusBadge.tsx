import type { LitterStatus } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

const STATUS_CLASS: Record<LitterStatus, { className: string; pulse?: boolean }> = {
  a_venir: { className: "badge-statut--upcoming", pulse: true },
  disponible: { className: "badge-statut--available", pulse: true },
  option: { className: "badge-statut--reserved" },
  reserve: { className: "badge-statut--reserved" },
  adopte: { className: "badge-statut--adopted" },
};

export default function StatusBadge({
  status,
  locale,
}: {
  status: LitterStatus;
  locale: Locale;
}) {
  const config = STATUS_CLASS[status];
  const label = getDictionary(locale).status[status];

  return (
    <span
      className={`badge-statut ${config.className}`}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      {config.pulse && <span className="pulse-dot" style={{ marginRight: 6 }} />}
      {label}
    </span>
  );
}
