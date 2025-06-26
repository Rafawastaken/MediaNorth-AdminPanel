// src/components/blocks/StatisticsBlock.jsx
import { useMemo } from "react";
import StatisticCard from "../cards/StatisticCard";
import { Tv, Users, MapPin, ChartArea } from "lucide-react";
import Colors from "../../constants/Colors";

import { useDeviceStats } from "../../hooks/useDeviceStats";
import { useSiteData } from "../../hooks/useSiteData";
import { computeSiteStats } from "../../helpers/computeSiteStats";

export default function StatisticsBlock() {
  /* TVs */
  const { stats: tv, loading: tvLoad } = useDeviceStats();

  /* Locais */
  const { sites, loading: siteLoad } = useSiteData();
  const site = useMemo(() => computeSiteStats(sites), [sites]); // { total, active, diff, pct }

  return (
    <div className="mt-6 grid w-full grid-cols-4 gap-6">
      {/* ───────── TVs ───────── */}
      <StatisticCard
        title="TVs Ativas"
        loading={tvLoad}
        value={tv.active}
        subtitle={tvLoad ? "—" : `${tv.inactive} TVs inativas`}
        resume={
          tv.total && !tvLoad
            ? `${Math.round((tv.active / tv.total) * 100)}% do total`
            : null
        }
        color={Colors.green}
        icon={<Tv size={16} />}
      />

      {/* ───────── Clientes (placeholder) ───────── */}
      <StatisticCard
        title="Clientes Ativos"
        value={156}
        subtitle="12 clientes inativos"
        resume="+8% vs mês anterior"
        color={Colors.blue}
        icon={<Users size={16} />}
      />

      {/* ───────── Locais ───────── */}
      <StatisticCard
        title="Locais/Pontos"
        loading={siteLoad}
        value={site.active}
        subtitle={siteLoad ? "—" : `${site.total} no total`}
        resume={
          siteLoad
            ? null
            : `${site.diff >= 0 ? "+" : ""}${site.pct}% vs mês anterior`
        }
        color={Colors.purple}
        icon={<MapPin size={16} />}
      />

      {/* ───────── Anúncios (placeholder) ───────── */}
      <StatisticCard
        title="Anúncios Ativos"
        value={156}
        subtitle="12 anúncios expirados"
        resume="+8% vs mês anterior"
        color={Colors.orange}
        icon={<ChartArea size={16} />}
      />
    </div>
  );
}
