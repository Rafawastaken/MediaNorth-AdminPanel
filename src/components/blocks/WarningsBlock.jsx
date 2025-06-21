import WarningCard from "../cards/WarningCard";
import { AlertTriangle, Clock3, ChartArea } from "lucide-react";

const WarningsBlock = () => {
  return (
    <div className="grid grid-cols-3 mt-6 items-center justify-center gap-6 w-full">
      <WarningCard
        title="TVs Inativas"
        borderColor="#ef4444" // red-500
        icon={<AlertTriangle size={18} className="text-red-500" />}
        content={[
          {
            text: "Centro Comercial A",
            label: "Offline",
            labelBgColor: "#ef444420",
            labelTextColor: "#ef4444",
          },
          {
            text: "Shopping Mall B",
            label: "Offline",
            labelBgColor: "#ef444420",
            labelTextColor: "#ef4444",
          },
          {
            text: "Praça Central",
            label: "Offline",
            labelBgColor: "#ef444420",
            labelTextColor: "#ef4444",
          },
        ]}
      />

      <WarningCard
        title="Anúncios Finalizando"
        borderColor="#EBB611FF" // red-500
        icon={<Clock3 size={18} className="text-yellow-600" />}
        content={[
          {
            text: "Empresa XYZ",
            label: "2 dias",
            labelBgColor: "rgba(0,0,0,0)",
            labelTextColor: "#454545",
          },
          {
            text: "Shopping Mall B",
            label: "1 dia",
            labelBgColor: "rgba(0,0,0,0)",
            labelTextColor: "#454545",
          },
          {
            text: "Praça Central",
            label: "5 dias",
            labelBgColor: "rgba(0,0,0,0)",
            labelTextColor: "#454545",
          },
        ]}
      />

      <WarningCard
        title="TVs Inativas"
        borderColor="#4182f1" // red-500
        icon={<ChartArea size={18} className="text-blue-500" />}
        content={[
          {
            text: "Muitos anúncios",
            label: "8 TVs",
            labelBgColor: "rgb(251,243,194)",
            labelTextColor: "#7a6902",
          },
          {
            text: "Poucos anúncios",
            label: "4 TVs",
            labelBgColor: "#e3f0ff",
            labelTextColor: "#044fb3",
          },
          {
            text: "Balanceadas",
            label: "100 TVs",
            labelBgColor: "rgb(211,248,211)",
            labelTextColor: "#068706",
          },
        ]}
      />
    </div>
  );
};

export default WarningsBlock;
