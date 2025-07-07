import { useMemo } from "react";
import StatisticCard from "../cards/StatisticCard";
import { Tv, Users, MapPin, Film } from "lucide-react";
import Colors from "../../constants/Colors";

import { useDeviceStats } from "../../hooks/useDeviceStats";
import { useSiteData } from "../../hooks/useSiteData";
import { useCustomerStats } from "../../hooks/useCustomerStats";
import { useVideoStats } from "../../hooks/useVideoStats";
import { computeSiteStats } from "../../helpers/computeSiteStats";

export default function StatisticsBlock() {
  /* TVs -------------------------------------------------- */
  const { stats: tv, loading: tvLoad } = useDeviceStats();

  /* Clientes --------------------------------------------- */
  const { stats: cust, loading: custLoad } = useCustomerStats();

  /* Locais ------------------------------------------------ */
  const { sites, loading: siteLoad } = useSiteData();
  const site = useMemo(() => computeSiteStats(sites), [sites]);

  /* Vídeos ------------------------------------------------ */
  const { stats: vid, loading: vidLoad } = useVideoStats();

  return (
    <div className="mt-6 grid w-full grid-cols-4 gap-6">
      {/* TVs ------------------------------------------------ */}
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

      {/* Clientes ------------------------------------------ */}
      <StatisticCard
        title="Clientes Ativos"
        loading={custLoad}
        value={cust.active}
        subtitle={custLoad ? "—" : `${cust.inactive} clientes inativos`}
        resume={
          cust.total && !custLoad
            ? `${Math.round((cust.active / cust.total) * 100)}% do total`
            : null
        }
        color={Colors.blue}
        icon={<Users size={16} />}
      />

      {/* Locais -------------------------------------------- */}
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

      {/* Vídeos -------------------------------------------- */}
      <StatisticCard
        title="Vídeos Ativos"
        loading={vidLoad}
        value={vid.active}
        subtitle={
          vidLoad ? "—" : `${vid.deactive} expirados · ${vid.paused} pausados`
        }
        resume={
          vid.total && !vidLoad
            ? `${Math.round((vid.active / vid.total) * 100)}% do total`
            : null
        }
        color={Colors.orange}
        icon={<Film size={16} />}
      />
    </div>
  );
}
