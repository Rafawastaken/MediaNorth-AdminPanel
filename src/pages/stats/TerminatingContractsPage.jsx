// src/pages/contracts/TerminatingContracts.jsx
import React, { useEffect } from "react";
import { HeadingStandard } from "../../components/ui/Headings";
import Loading from "../../components/ui/Loading";
import { toast } from "react-hot-toast";
import { Clock, XCircle } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { pt } from "date-fns/locale";
import { useContractsExpiring } from "../../hooks/useContractsExpiring";

export default function TerminatingContracts() {
  const { ended, endingSoon, loading, error, refetch } = useContractsExpiring();

  useEffect(() => {
    if (error) toast.error(`Erro ao carregar contratos: ${error.message}`);
  }, [error]);

  if (loading) return <Loading message="A carregar contratos…" full />;
  if (error) return null;

  const renderItem = (c, isExpired) => {
    const Icon = isExpired ? XCircle : Clock;
    const label = isExpired
      ? `Expirou há ${formatDistanceToNowStrict(new Date(c.contract_end_date), {
          locale: pt,
        })}`
      : `Vence em ${formatDistanceToNowStrict(new Date(c.contract_end_date), {
          locale: pt,
        })}`;

    return (
      <li key={c.id} className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <Icon
            size={18}
            className={isExpired ? "text-red-500" : "text-yellow-600"}
          />
          <span className="font-medium">{c.company_name}</span>
        </div>
        <span className={isExpired ? "text-red-500" : "text-yellow-600"}>
          {label}
        </span>
      </li>
    );
  };

  return (
    <div className="">
      <HeadingStandard
        title="Gestão de Contratos"
        subtitle="Veja contratos expirados e a expirar"
      />

      <div className="grid gap-6 md:grid-cols-2 mt-3">
        {/* Contratos expirados */}
        <div className="rounded-lg bg-white shadow p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-600">
            <XCircle size={20} /> Contratos Expirados
          </h2>
          {ended.length ? (
            <ul className="divide-y">
              {ended.map((c) => renderItem(c, true))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">Nenhum contrato expirado.</p>
          )}
        </div>

        {/* Contratos a expirar */}
        <div className="rounded-lg bg-white shadow p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-yellow-600">
            <Clock size={20} /> A Expirar em Até 30 dias
          </h2>
          {endingSoon.length ? (
            <ul className="divide-y">
              {endingSoon.map((c) => renderItem(c, false))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              Nenhum contrato a expirar nos próximos 30 dias.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
