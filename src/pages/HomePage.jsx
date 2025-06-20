import {HeadingStandard} from '../components/ui/Headings.jsx';
import StatisticsBlock from '../components/statistics/StatisticsBlock.jsx';
import WarningsBlock from '../components/warnings/WarningsBlock.jsx';
import LogsTableBlock from '../components/logs/LogsTableBlock.jsx';

const HomePage = () => {
  return (
      <div>
        <HeadingStandard
            title={'Dashboard'}
            subtitle={'Visão geral do sistema de gestão de anúncios'}
        />
        <StatisticsBlock/>
        <WarningsBlock/>
        <LogsTableBlock/>
      </div>
  );
};

export default HomePage;