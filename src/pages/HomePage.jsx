import { HeadingStandard } from "../components/ui/Headings.jsx";
import StatisticsBlock from "../components/blocks/StatisticsBlock.jsx";
import WarningsBlock from "../components/blocks/WarningsBlock.jsx";
import LogsTable from "../components/tables/LogsTable.jsx";

const HomePage = () => (
  <div>
    <HeadingStandard
      title="Dashboard"
      subtitle="Visão geral do sistema de gestão de anúncios"
    />
    <StatisticsBlock /> {/* já faz os seus fetches de contagem */}
    <WarningsBlock />
    <LogsTable />
  </div>
);

export default HomePage;
