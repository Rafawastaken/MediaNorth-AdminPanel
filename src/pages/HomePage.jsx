import { HeadingStandard } from "../components/ui/Headings.jsx";
import StatisticsBlock from "../components/blocks/StatisticsBlock.jsx";
import WarningsBlock from "../components/blocks/WarningsBlock.jsx";
import LogsTableBlock from "../components/logs/LogsTableBlock.jsx";
import Loading from "../components/ui/Loading.jsx";
import { useSites } from "../hooks/useSites";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const { sites, loading, error } = useSites();

  if (loading) return <Loading message="A carregar homepage…" full />;

  if (error) {
    toast.error(`Erro ao carregar locais: ${error.message}`);
  }

  return (
    <div>
      <HeadingStandard
        title={"Dashboard"}
        subtitle={"Visão geral do sistema de gestão de anúncios"}
      />
      <StatisticsBlock sites={sites} />
      <WarningsBlock />
      <LogsTableBlock />
    </div>
  );
};

export default HomePage;
