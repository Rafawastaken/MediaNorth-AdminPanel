import CustomerVideoStatsCard from "../cards/CustomerVideoStatsCard";

const CustomerVideoStatsBlock = ({ stats, videos }) => {
  return (
    <div className="grid grid-cols-5 gap-4 mt-3">
      <CustomerVideoStatsCard
        value={stats.active}
        description={"Videos ativos"}
        className={"text-blue-600"}
        borderColor={"border-blue-600"}
      />
      <CustomerVideoStatsCard
        value={stats.paused}
        description={"Videos pausados"}
        className={"text-yellow-600"}
        borderColor={"border-yellow-600"}
      />
      <CustomerVideoStatsCard
        value={stats.deactive}
        description={"Videos desativos"}
        className={"text-red-600"}
        borderColor={"border-red-600"}
      />
      <CustomerVideoStatsCard
        value={stats.devices}
        description={"Sitios contratados"}
        className={"text-green-600"}
        borderColor={"border-green-600"}
      />
      <CustomerVideoStatsCard
        value={stats.devices}
        description={"Total de dispositivos"}
        className={"text-purple-600"}
        borderColor={"border-purple-600"}
      />
    </div>
  );
};

export default CustomerVideoStatsBlock;
