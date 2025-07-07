import WarningCard from "../cards/WarningCard";
import { AlertTriangle, Clock3, ChartArea } from "lucide-react";
import Colors from "../../constants/Colors";
import Loading from "../ui/Loading";
import { toast } from "react-hot-toast";
import { useWarningsData } from "../../hooks/useWarningsData";

export default function WarningsBlock() {
  const {
    tvsOffline,
    adLoad,
    contractsEnding, // ← NEW
    loading,
    error,
  } = useWarningsData();

  if (loading) return <Loading message="A analisar avisos…" full />;
  if (error) {
    toast.error(`Avisos: ${error.message}`);
    return null;
  }

  /* ---------- TVs off-line ---------- */
  const offlineRows = tvsOffline.slice(0, 3).map((t) => ({
    text: t.name ?? `TV #${t.id}`,
    label: "Offline",
    labelBgColor: Colors.red + "20",
    labelTextColor: Colors.red,
  }));

  const offlineContent =
    offlineRows.length > 0
      ? offlineRows
      : [
          {
            text: "Todas online",
            label: "✓",
            labelBgColor: "#d1fae5",
            labelTextColor: "#065f46",
          },
        ];

  /* ---------- Contratos a terminar ---------- */
  const contractContent =
    contractsEnding.length > 0
      ? contractsEnding.map((c) => ({
          text: c.company_name,
          label:
            c.daysLeft < 0
              ? "Expirado"
              : `${c.daysLeft} dia${c.daysLeft === 1 ? "" : "s"}`,
          labelBgColor: c.daysLeft < 0 ? "#fee2e2" : "rgba(0,0,0,0)",
          labelTextColor: c.daysLeft < 0 ? Colors.red : "#555",
        }))
      : [
          {
            text: "Nenhum contrato a terminar",
            label: "—",
            labelBgColor: "rgba(0,0,0,0)",
            labelTextColor: "#555",
          },
        ];

  return (
    <div className="mt-6 grid w-full grid-cols-3 gap-6">
      {/* TVs Inativas ------------------------------------------------ */}
      <WarningCard
        title="TVs Inativas"
        borderColor={Colors.red}
        icon={<AlertTriangle size={18} className="text-red-500" />}
        content={offlineContent}
      />

      {/* Anúncios / Contratos a terminar ---------------------------- */}
      <WarningCard
        title="Contratos a Terminar"
        borderColor="#FACC15"
        icon={<Clock3 size={18} className="text-yellow-600" />}
        content={contractContent}
      />

      {/* Status de TVs (carga de anúncios) -------------------------- */}
      <WarningCard
        title="Status de TVs"
        borderColor="#3B82F6"
        icon={<ChartArea size={18} className="text-blue-500" />}
        content={[
          {
            text: "Muitos anúncios",
            label: `${adLoad.many} TVs`,
            labelBgColor: "rgb(254,226,226)",
            labelTextColor: Colors.red,
          },
          {
            text: "Poucos anúncios",
            label: `${adLoad.few} TVs`,
            labelBgColor: "rgb(224,231,255)",
            labelTextColor: "#283593",
          },
          {
            text: "Balanceadas",
            label: `${adLoad.balanced} TVs`,
            labelBgColor: "rgb(209,250,229)",
            labelTextColor: "#065f46",
          },
        ]}
      />
    </div>
  );
}
