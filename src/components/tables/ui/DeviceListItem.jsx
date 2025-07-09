// src/components/devices/ui/DeviceListItem.jsx
import { Tv2, Power, Cog, Trash2 } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { getDeviceMeta } from "../../../helpers/deviceMeta";
import { supabase } from "../../../libs/supabase";
import { logEvent } from "../../../services/logEvent";
import { toast } from "react-hot-toast";

export default function DeviceListItem({ device, onDelete }) {
  /* meta derivada */
  const { online, tempLabel, tempColor, sched, lastSeenStr } =
    getDeviceMeta(device);

  /* campos do registo */
  const {
    id: idDevice,
    name,
    location,
    resolution,
    playlist_name,
    active,
  } = device;

  /* id do site vindo da URL para compor a rota */
  const { idSite } = useParams();

  /* handler de delete */
  const handleDelete = async () => {
    if (
      !window.confirm(
        `Apagar dispositivo “${name}”? Esta ação não pode ser revertida.`
      )
    )
      return;

    try {
      // 1) delete na base
      const { error } = await supabase
        .from("device")
        .delete()
        .eq("id", idDevice);
      if (error) throw error;

      // 2) log
      await logEvent({
        type: "device_deleted",
        summary: `Apagado dispositivo “${name}”`,
        details: {
          deviceId: idDevice,
          name,
          location,
        },
        context: { device_id: idDevice },
      });

      toast.success("Dispositivo removido com sucesso.");
      onDelete?.(); // dispara refetch no componente pai
    } catch (err) {
      toast.error(`Erro ao apagar: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
      <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />

      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-100">
        <Tv2 size={22} className="text-slate-600" />
      </span>

      <div className="flex flex-1 flex-col">
        {/* linha 1 */}
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{name}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {active ? "Ativa" : "Desativa"}
          </span>
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              online
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-slate-200 bg-slate-100 text-slate-500"
            }`}
          >
            <Power size={10} className="shrink-0" />
            {online ? "Online" : "Offline"}
          </span>
        </div>

        {/* linha 2 */}
        <div className="my-1.5 flex flex-wrap items-center gap-10 text-sm text-slate-600">
          <span>
            <span className="font-medium">Local:</span> {location}
          </span>
          {resolution && (
            <span>
              <span className="font-medium">Resolução:</span> {resolution}
            </span>
          )}
          {playlist_name && (
            <span>
              <span className="font-medium">Playlist:</span> {playlist_name}
            </span>
          )}
          {tempLabel && (
            <span className={tempColor}>
              <span className="font-medium text-slate-600">Temperatura:</span>{" "}
              {tempLabel}
            </span>
          )}
        </div>

        {/* linha 3 */}
        <div className="mt-1 flex gap-3 text-xs text-slate-500">
          <span>Horário: {sched}</span>
          <span>Última atividade: {lastSeenStr}</span>
        </div>
      </div>

      {/* ações */}
      <Link
        to={`/sites/${idSite}/devices/${idDevice}/edit`}
        className="rounded-md border border-slate-200 p-2 hover:bg-slate-50"
        title="Configurar"
      >
        <Cog size={16} />
      </Link>
      <button
        onClick={handleDelete}
        className="rounded-md border border-slate-200 p-2 hover:bg-slate-50"
        title="Apagar"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
