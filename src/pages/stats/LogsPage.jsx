// src/pages/logs/LogsPage.jsx
import React, { useEffect } from "react";
import { HeadingStandard } from "../../components/ui/Headings";
import Loading from "../../components/ui/Loading";
import { toast } from "react-hot-toast";
import { useLogs } from "../../hooks/useLogs";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useAuth } from "../../contexts/AuthContext";

export default function LogsPage() {
  const { logs, loading, error, refetch } = useLogs();
  const { user } = useAuth();

  const eventColor = {
    login: "#0ea5e9",
    login_success: "#0ea5e9",
    logout: "#0ea5e9",
    site_created: "#10b981",
    site_updated: "#3b82f6",
    site_deleted: "#ef4444",
    device_updated: "#3b82f6",
    device_created: "#10b981",
    device_deleted: "#d78f72",
    customer_updated: "#3b82f6",
    customer_created: "#10b981",
    customer_deleted: "#ef4444",
    video_update: "#3b82f6",
    video_created: "#10b981",
    video_deleted: "#ef4444",
    device_offline: "#ef4444",
    default: "#64748b",
  };

  const EVENT_LABELS = {
    login: "Sessão iniciada",
    login_success: "Sessão iniciada",
    logout: "Sessão terminada",
    site_created: "Local criado",
    site_updated: "Local atualizado",
    site_deleted: "Local removido",
    device_created: "Dispositivo criado",
    device_updated: "Dispositivo atualizado",
    video_created: "Vídeo adicionado",
    video_update: "Vídeo atualizado",
    video_deleted: "Vídeo removido",
    customer_created: "Cliente criado",
    customer_updated: "Cliente atualizado",
    customer_deleted: "Cliente removido",
    device_offline: "TV offline",
    default: "Outro evento",
  };

  useEffect(() => {
    if (error) toast.error(`Erro ao carregar logs: ${error.message}`);
  }, [error]);

  if (loading) return <Loading message="A carregar logs…" full />;
  if (error) return null;

  return (
    <div className="flex flex-col gap-6">
      <HeadingStandard
        title="Registo de Atividade"
        subtitle="Últimos eventos do sistema"
      />

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="sticky top-0 z-10 px-4 py-3 text-left font-semibold text-gray-700">
                Data / Hora
              </th>
              <th className="sticky top-0 z-10 px-4 py-3 text-left font-semibold text-gray-700">
                Evento
              </th>
              <th className="sticky top-0 z-10 px-4 py-3 text-left font-semibold text-gray-700">
                Resumo
              </th>
              <th className="sticky top-0 z-10 px-4 py-3 text-left font-semibold text-gray-700">
                Usuário
              </th>
              <th className="sticky top-0 z-10 px-4 py-3 text-left font-semibold text-gray-700">
                Device ID
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log, idx) => {
              const label =
                EVENT_LABELS[log.event_type] || EVENT_LABELS.default;
              const color = eventColor[log.event_type] ?? eventColor.default;
              const actor = user?.fullName ?? "—";

              return (
                <tr
                  key={log.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                    {format(new Date(log.created_at), "dd/MM/yyyy HH:mm:ss", {
                      locale: pt,
                    })}
                  </td>
                  <td className="px-4 py-3 flex items-center">
                    <span
                      className="inline-block h-2 w-2 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-gray-800">{label}</span>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-gray-600">
                    {log.summary}
                  </td>
                  <td className="px-4 py-3 text-gray-800">{actor}</td>
                  <td className="px-4 py-3 text-gray-800">
                    {log.device_id ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={refetch}
        className="self-end inline-flex items-center rounded-md bg-[var(--light-blue)] px-4 py-2 text-white hover:bg-[var(--light-blue)]/90 transition"
      >
        Recarregar
      </button>
    </div>
  );
}
