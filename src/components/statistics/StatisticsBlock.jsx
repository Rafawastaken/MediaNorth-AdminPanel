import StatisticCard from '../statistics/StatisticCard.jsx';
import {Tv, Users, MapPin, ChartArea} from 'lucide-react';

const StatisticsBlock = () => {
  return (
      <div
          className="grid grid-cols-4 mt-6 items-center justify-center gap-6 w-full">
        <StatisticCard title={'TVs Ativas'} value={156}
                       subtitle={'12 TVs inativas'}
                       resume={'+8% vs mês anterior'}
                       color={'#2dc82d'}
                       icon={<Tv size={16}/>}
        />
        <StatisticCard title={'TVs Ativas'} value={156}
                       subtitle={'12 TVs inativas'}
                       resume={'+8% vs mês anterior'}
                       color={'#4182f1'}
                       icon={<Users size={16}/>}
        />
        <StatisticCard title={'TVs Ativas'} value={156}
                       subtitle={'12 TVs inativas'}
                       resume={'+8% vs mês anterior'}
                       color={'#a654f6'}
                       icon={<MapPin size={16}/>}
        />
        <StatisticCard title={'TVs Ativas'} value={156}
                       subtitle={'12 TVs inativas'}
                       resume={'+8% vs mês anterior'}
                       color={'#fb864a'}
                       icon={<ChartArea size={16}/>}
        />
      </div>
  );
};

export default StatisticsBlock;