// src/components/ui/LogsTableBlock.jsx
// -------------------------------------------------------------------
// Bloco "Atividade Recente" – dot colorido flush left, texto indentado
// Espaçamento baseado no mockup #1
// -------------------------------------------------------------------
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { Link } from "react-router-dom";
import { typeColor } from "../../enums/colors.js";

// cores por tipo de log

const LogsTable = () => {
  const logs = [
    {
      id: 0,
      type: "add",
      title: "Nova TV adicionada",
      text: "Centro Comercial Norte - TV-001",
      timestamp: Date.now() - 2 * 60_000,
    },
    {
      id: 1,
      type: "update",
      title: "Cliente atualizado",
      text: "Empresa ABC Ltda - Dados de contato",
      timestamp: Date.now() - 15 * 60_000,
    },
    {
      id: 2,
      type: "problem",
      title: "Anúncio agendado",
      text: "Campanha de Verão - 15 pontos selecionados",
      timestamp: Date.now() - 60 * 60_000,
    },
  ];

  return (
    <div className="mt-6 rounded-lg bg-white shadow-sm">
      <div
        className="flex  justify-between items-center px-4"
        style={{ paddingTop: "16px" }}
      >
        <h2 className="font-normal text-slate-900" style={{ fontSize: "26px" }}>
          Atividade Recente
        </h2>
        <Link
          to={"#"}
          className={"text-sm border-b border-gray-400"}
          style={{}}
        >
          Ver todos
        </Link>
      </div>
      <ul className="space-y-2 px-4 py-4 rounded-lg">
        {logs.map((log) => {
          const color = typeColor[log.type] || typeColor.default;
          return (
            <li
              key={log.id}
              className="relative flex items-start justify-between bg-slate-50 rounded-lg py-4 pr-4"
            >
              {/* dot flush left */}
              <span
                className="rounded-full"
                style={{
                  background: color,
                  height: 6,
                  width: 6,
                  position: "absolute",
                  left: 20,
                  top: 36,
                  transform: "translateY(-50%)",
                }}
              ></span>

              {/* textos indentados */}
              <div className="flex flex-col min-w-0 pl-12 pr-4">
                <p className="truncate font-semibold text-slate-900">
                  {log.title}
                </p>
                <p className="truncate text-sm text-slate-600">{log.text}</p>
              </div>

              {/* timestamp com padding direita */}
              <span
                className="shrink-0 pr-6  flex h-full items-center justify-center self-center font-normal"
                style={{
                  color: "rgba(0,0,0,0.70)",
                  fontSize: "12px",
                  letterSpacing: "0.03em",
                }}
              >
                {formatDistanceToNow(new Date(log.timestamp), {
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
};

export default LogsTable;
