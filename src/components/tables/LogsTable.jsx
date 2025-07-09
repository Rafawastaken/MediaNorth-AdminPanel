// src/components/blocks/LogsTableBlock.jsx
// -------------------------------------------------------------------
// “Atividade Recente” – mostra os 6 eventos mais recentes de log_event
// -------------------------------------------------------------------
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useLogs } from "../../hooks/useLogs";
import { EVENT_LABELS, EVENT_COLORS } from "../../enums/logs";

/* helper */
const labelFor = (t) => EVENT_LABELS[t] ?? t.replaceAll("_", " ");

export default function LogsTableBlock() {
  const { logs, loading, error, refetch } = useLogs(6);

  /* ---------- UI ---------- */
  return (
    <div className="mt-6 rounded-lg bg-white shadow-sm">
      <header className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-2xl font-normal text-slate-900">
          Atividade Recente
        </h2>
        <Link
          to="/logs"
          className="text-sm text-gray-500 hover:text-gray-700 border-b border-transparent hover:border-gray-400"
        >
          Ver todos
        </Link>
      </header>

      <ul className="space-y-2 px-4 py-4">
        {loading && (
          <li className="py-10 text-center text-sm text-slate-500">
            A carregar…
          </li>
        )}

        {!loading && error && (
          <li className="py-10 text-center text-sm text-red-600">
            Erro a carregar logs
          </li>
        )}

        {!loading && !error && logs.length === 0 && (
          <li className="py-10 text-center text-sm text-slate-500">
            Sem eventos recentes
          </li>
        )}

        {logs.map((log) => {
          const color = EVENT_COLORS[log.event_type] ?? EVENT_COLORS.default;

          return (
            <li
              key={log.id}
              className="relative flex items-start justify-between rounded-lg bg-slate-50 py-4 pr-4"
            >
              {/* dot flush-left */}
              <span
                className="absolute left-5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />

              {/* texto */}
              <div className="flex min-w-0 flex-col pl-10 pr-4">
                {/* usa summary se existir, senão label normalizado */}
                <p className="truncate font-semibold text-slate-900">
                  {log.summary || labelFor(log.event_type)}
                </p>
                <p className="truncate text-sm text-slate-600">
                  {labelFor(log.event_type)}
                </p>
              </div>

              {/* “há X minutos” */}
              <span className="shrink-0 self-center pr-6 text-xs text-slate-500">
                {formatDistanceToNow(new Date(log.created_at), {
                  addSuffix: true,
                  locale: pt,
                })}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
