// src/components/cards/SiteCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Tv2,
  Pencil,
  Trash2,
  Mail,
  MapPinHouse,
  Phone,
  User2,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { iconBySiteType } from "../../enums/icons";
import { contractType } from "../../enums/values";
import { computeValue } from "../../helpers/computeValue";
import { supabase } from "../../libs/supabase";
import { logEvent } from "../../services/logEvent";

export default function SiteCard({ site, onRemove }) {
  const [deleting, setDeleting] = useState(false);

  const Icon = iconBySiteType[site.site_type] ?? iconBySiteType.other;
  const normalizedContractType =
    contractType[site.contract_type] ?? contractType.other;
  const normalizedContractValue = computeValue(
    site.contract_value,
    site.contract_type
  );
  const isActive = site.active ?? true;

  /* ---------- remover site ---------- */
  const handleDelete = async () => {
    const ok = window.confirm(
      `Tem a certeza que quer apagar o local “${site.name}”? Todos os dispositivos associados também serão removidos.`
    );
    if (!ok) return;

    try {
      setDeleting(true);

      /* 1) apaga na BD */
      const { error } = await supabase.from("site").delete().eq("id", site.id);
      if (error) throw error;

      /* 2) grava log */
      await logEvent({
        type: "site_deleted",
        summary: `Apagado local “${site.name}”`,
        details: {
          name: site.name,
          address: site.address,
          contact: site.contact_name,
          type: site.site_type,
        },
        context: { site_id: site.id },
      });

      toast.success("Local removido com sucesso.");
      onRemove?.(); // avisa o componente pai (se existir)
    } catch (err) {
      toast.error(`Erro ao apagar: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
      {/* --- Cabeçalho --- */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
            <Icon size={22} className="text-blue-600" title={site.site_type} />
          </span>

          <div>
            <h3 className="text-lg font-semibold">{site.name}</h3>
            <span className="text-sm capitalize text-slate-500">
              {site.site_type?.replace(/([A-Z])/g, " $1") || "—"}
            </span>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-0.5 text-xs font-medium ${
            isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isActive ? "Ativo" : "Inativo"}
        </span>
      </div>

      {/* --- Morada + contacto --- */}
      <ul className="mt-4 space-y-1 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <MapPinHouse size={16} /> {site.address || "—"}
        </li>
        <li className="flex items-center gap-2">
          <User2 size={16} /> {site.contact_name || "—"}
        </li>
        <li className="flex items-center gap-2">
          <Phone size={16} /> {site.contact_phone || "—"}
        </li>
        <li className="flex items-center gap-2">
          <Mail size={16} /> {site.contact_email || "—"}
        </li>
      </ul>

      {/* --- Contrato --- */}
      <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-500">Tipo:</span>
          <span className="font-semibold">{normalizedContractType}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-500">Valor:</span>
          <span className="font-semibold text-emerald-600">
            {normalizedContractValue}
          </span>
        </div>
      </div>

      <div className="my-5 border-b border-gray-200" />

      {/* --- Estatísticas --- */}
      <div className="grid grid-cols-3 text-center text-sm">
        <div>
          <p className="text-lg font-bold text-blue-700">{site.totalDevices}</p>
          <span className="text-slate-500">Total TVs</span>
        </div>
        <div>
          <p className="text-lg font-bold text-green-700">
            {site.activeDevices}
          </p>
          <span className="text-slate-500">Ativas</span>
        </div>
        <div>
          <p className="text-lg font-bold text-red-600">{site.offDevices}</p>
          <span className="text-slate-500">Inativas</span>
        </div>
      </div>

      {/* --- Ações --- */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          to={`/sites/${site.id}/devices`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-slate-50"
        >
          <Eye size={16} /> Ver
        </Link>

        <Link
          to={`/sites/${site.id}/devices`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-slate-50"
        >
          <Tv2 size={16} /> TVs
        </Link>

        <Link
          to={`/sites/${site.id}/edit`}
          className="rounded-lg border border-gray-200 p-2 hover:bg-slate-50"
          aria-label="Editar"
        >
          <Pencil size={16} />
        </Link>

        <button
          onClick={handleDelete}
          className="rounded-lg border border-gray-200 p-2 hover:bg-slate-50"
          aria-label="Apagar local"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
