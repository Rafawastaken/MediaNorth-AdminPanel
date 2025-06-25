import DeviceListItem from "./ui/DeviceListItem";

const DevicesTable = ({ devices }) => {
  return (
    <div className="shadow-md rounded-md p-4 bg-white">
      <h1 className="text-2xl font-semibold">Lista de Dispositivos</h1>
      <div className="flex flex-col gap-3 mt-3">
        {devices.map((device, index) => (
          <DeviceListItem device={device} key={index} />
        ))}
      </div>
    </div>
  );
};

export default DevicesTable;
