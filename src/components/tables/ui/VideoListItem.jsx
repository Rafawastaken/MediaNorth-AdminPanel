import { Video, BarChart2, Edit2, Trash2 } from "lucide-react";
import clsx from "clsx";

export default function VideoListItem({ video }) {
  const {
    id,
    video_title,
    video_duration,
    video_status,
    video_description,
    created_at,
    device_video = [], // [{ device_id, device:{ id, site_id,… } }]
  } = video;

  /* -------- badge -------- */
  const statusCfg = {
    active: { txt: "ativo", cls: "bg-emerald-100 text-emerald-700" },
    paused: { txt: "pausado", cls: "bg-yellow-100 text-yellow-700" },
    deactive: { txt: "desativo", cls: "bg-red-100 text-red-700" },
  }[video_status] ?? { txt: video_status, cls: "bg-slate-200 text-slate-600" };

  /* -------- nº TVs / sites -------- */
  const tvCount = new Set(device_video.map((l) => l.device_id)).size;
  const siteCount = new Set(
    device_video.map((l) => l.device?.site_id).filter(Boolean)
  ).size;

  /* -------- duração mm:ss -------- */
  const d = Number(video_duration) || 0;
  const durationStr = `${String(Math.floor(d / 60)).padStart(2, "0")}:${String(
    d % 60
  ).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-4 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
      {/* ícone */}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-slate-100">
        <Video size={22} className="text-slate-600" />
      </span>

      {/* conteúdo principal */}
      <div className="flex flex-1 flex-col">
        {/* título + badge */}
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{video_title}</h3>
          <span
            className={clsx("rounded-full px-2 py-0.5 text-xs", statusCfg.cls)}
          >
            {statusCfg.txt}
          </span>
        </div>

        {/* linha info 1 */}
        <div className="mt-1 flex flex-wrap gap-6 text-sm text-slate-600">
          <span>
            <span className="font-medium">Duração:</span> {durationStr}
          </span>
          <span>
            <span className="font-medium">TVs:</span> {tvCount}
          </span>
          <span>
            <span className="font-medium">Locais:</span> {siteCount}
          </span>
        </div>

        {/* linha info 2 (descrição e data) */}
        <div className="mt-1 flex flex-wrap gap-6 text-sm text-slate-600">
          {video_description && (
            <span className="max-w-[24ch] truncate">
              <span className="font-medium">Descrição:</span>{" "}
              {video_description}
            </span>
          )}
          {created_at && (
            <span>
              <span className="font-medium">Adicionado:</span>{" "}
              {new Date(created_at).toLocaleDateString("pt-PT")}
            </span>
          )}
        </div>
      </div>

      {/* ações */}
      <div className="ml-auto flex shrink-0 gap-2">
        <IconBtn title="Editar">
          <Edit2 size={16} />
        </IconBtn>
        <IconBtn title="Apagar">
          <Trash2 size={16} />
        </IconBtn>
      </div>
    </div>
  );
}

/* helper p/ não repetir classes */
function IconBtn({ title, children }) {
  return (
    <button
      className="rounded-md border border-slate-200 p-2 hover:bg-slate-50"
      title={title}
    >
      {children}
    </button>
  );
}
