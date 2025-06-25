// src/components/blocks/DeviceStatisticBlock.jsx
import DeviceStatisticCard from "../cards/DeviceStatisticCard";
import Colors from "../../constants/Colors";

const DeviceStatisticBlock = ({ devices = [] }) => {
  /* ─── contagens ─────────────────────────────── */
  const totalTvs = devices.length;
  const onTvs = devices.filter((d) => d.active).length;
  const offTvs = totalTvs - onTvs;
  const alertsMock = 3;

  return (
    <div className="grid grid-cols-4 gap-4">
      <DeviceStatisticCard
        title="Total de TVs"
        value={totalTvs}
        color={Colors.blue}
      />
      <DeviceStatisticCard
        title="TVs Ligadas"
        value={onTvs}
        color={Colors.green}
      />
      <DeviceStatisticCard
        title="TVs Desligadas"
        value={offTvs}
        color={Colors.orange}
      />
      <DeviceStatisticCard
        title="Alertas"
        value={alertsMock}
        color={Colors.red}
      />
    </div>
  );
};

export default DeviceStatisticBlock;
