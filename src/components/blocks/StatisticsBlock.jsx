import StatisticCard from "../cards/StatisticCard";
import { Tv, Users, MapPin, ChartArea } from "lucide-react";

import { monthlyDelta } from "../../helpers/monthlyDelta.js";

const StatisticsBlock = ({ sites }) => {
  const siteStats = monthlyDelta(sites, "created_at", (s) => s.active);

  return (
    <div className="grid grid-cols-4 mt-6 items-center justify-center gap-6 w-full">
      <StatisticCard
        title={"TVs Ativas"}
        value={156}
        subtitle={"12 TVs inativas"}
        resume={"+8% vs mês anterior"}
        color={"#2dc82d"}
        icon={<Tv size={16} />}
      />
      <StatisticCard
        title={"Clientes Ativos"}
        value={156}
        subtitle={"12 Clientes inativas"}
        resume={"+8% vs mês anterior"}
        color={"#4182f1"}
        icon={<Users size={16} />}
      />
      <StatisticCard
        title="Locais/Pontos"
        value={siteStats.current}
        subtitle="Distribuídos pela cidade"
        resume={`${siteStats.diff >= 0 ? "+" : ""}${siteStats.pct.toFixed(
          0
        )}% vs mês anterior`}
        color="#a654f6"
        icon={<MapPin size={16} />}
      />
      <StatisticCard
        title={"Anúncios Ativos"}
        value={156}
        subtitle={"12 TVs inativas"}
        resume={"+8% vs mês anterior"}
        color={"#fb864a"}
        icon={<ChartArea size={16} />}
      />
    </div>
  );
};

export default StatisticsBlock;
