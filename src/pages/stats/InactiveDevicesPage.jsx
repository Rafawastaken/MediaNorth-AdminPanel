// src/pages/devices/InactiveDevicesPage.jsx
import { useEffect } from "react";
import { useActiveDevices } from "../../hooks/useActiveDevices";
import { HeadingStandard } from "../../components/ui/Headings";
import Loading from "../../components/ui/Loading";
import { toast } from "react-hot-toast";
import DeviceListItem from "../../components/tables/ui/DeviceListItem";
import { isDeviceOnline } from "../../helpers/deviceStatus";

export default function InactiveDevicesPage() {
  const { devices, loading, error, refetch } = useActiveDevices();
  console.log(devices);

  // filtra só os inativos *e* offline
  const offlineInactive = devices.filter(
    (d) => d.active === false || !isDeviceOnline(d.last_seen)
  );

  useEffect(() => {
    if (error) {
      toast.error(`Erro ao carregar dispositivos: ${error.message}`);
    }
  }, [error]);

  if (loading) {
    return <Loading message="A carregar dispositivos inativos…" full />;
  }
  if (error) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-4">
      <HeadingStandard
        title="Dispositivos Inativos & Offline"
        subtitle="Apenas os dispositivos marcados como inativos que não reportam atividade"
      />

      {offlineInactive.length > 0 ? (
        <div className="flex flex-col gap-3">
          {offlineInactive.map((device) => (
            <DeviceListItem
              key={device.id}
              device={device}
              onDelete={refetch}
            />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-slate-500">
          Não há dispositivos inativos e offline no momento.
        </p>
      )}
    </div>
  );
}
