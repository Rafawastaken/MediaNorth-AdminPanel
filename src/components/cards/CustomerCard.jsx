// src/components/cards/CustomerCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  User2,
  Mail,
  Pencil,
  Trash2,
  MapPinHouse,
  Phone,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { contractType } from "../../enums/values";
import { computeValue } from "../../helpers/computeValue";
import { isContractActive } from "../../helpers/computeContractActive";
import { useCustomerVideos } from "../../hooks/useCustomerVideos";
import { supabase } from "../../libs/supabase";
import { logEvent } from "../../services/logEvent";
import Loading from "../ui/Loading";

/**
 * Cartão de um cliente na listagem
 *
 * @param {object}   props.customer   – registo do cliente
 * @param {function} [props.onRemove] – callback quando o cliente é apagado
 */
const CustomerCard = ({ customer, onRemove }) => {
  const { stats, loading } = useCustomerVideos(customer.id, "all");
  const [deleting, setDeleting] = useState(false);

  const normalizedContractType =
    contractType[customer.contract_type] ?? contractType.other;
  const normalizedContractValue = computeValue(
    customer.contract_value,
    customer.contract_type
  );
  const contractActive = isContractActive(customer.contract_end_date);

  console.log(customer);

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Apagar cliente “${customer.company_name}”? Esta ação não pode ser revertida.`
      )
    )
      return;

    try {
      setDeleting(true);
      const { error } = await supabase
        .from("customer")
        .delete()
        .eq("id", customer.id);
      if (error) throw error;

      await logEvent({
        type: "customer_delete",
        summary: `Apagado cliente “${customer.company_name}”`,
        details: {
          companyName: customer.company_name,
          companyVat: customer.company_vat,
        },
        context: { customer_id: customer.id },
      });

      toast.success("Cliente removido com sucesso.");
      onRemove?.(); // dispara o refetch no pai
    } catch (err) {
      toast.error(`Erro ao apagar: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  if (loading || deleting) {
    return (
      <Loading message={deleting ? "A apagar…" : "Carregando cliente…"} full />
    );
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
      {/* ---- Cabeçalho ---- */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
            <User2 size={22} className="text-blue-600" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">{customer.company_name}</h3>
            <span className="text-sm capitalize text-slate-500">
              {customer.company_activity || "—"}
            </span>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-0.5 text-xs font-medium ${
            contractActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {contractActive ? "Ativo" : "Inativo"}
        </span>
      </div>

      {/* ---- Morada + contacto ---- */}
      <ul className="mt-4 space-y-1 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <MapPinHouse size={16} /> {customer.company_address || "—"}
        </li>
        <li className="flex items-center gap-2">
          <User2 size={16} /> {customer.contact_name || "—"}
        </li>
        <li className="flex items-center gap-2">
          <Phone size={16} /> {customer.contact_phone || "—"}
        </li>
        <li className="flex items-center gap-2">
          <Mail size={16} /> {customer.contact_email || "—"}
        </li>
      </ul>

      <p className="my-3 text-center italic text-red-700">
        {customer.observations || "—"}
      </p>

      {/* ---- Contrato ---- */}
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

      {/* ---- Estatísticas ---- */}
      <div className="my-5 grid grid-cols-2 text-center text-sm">
        <div>
          <p className="text-lg font-bold text-blue-700">{stats.devices}</p>
          <span className="text-slate-500">Pontos</span>
        </div>
        <div>
          <p className="text-lg font-bold text-green-700">{stats.total}</p>
          <span className="text-slate-500">Anúncios</span>
        </div>
      </div>

      {/* ---- Ações ---- */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          to={`/customers/${customer.id}`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-slate-50"
        >
          <Eye size={16} /> Ver
        </Link>

        <Link
          to={`/customers/${customer.id}/edit`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-slate-50"
        >
          <Pencil size={16} /> Editar
        </Link>

        <button
          onClick={handleDelete}
          className="rounded-lg border border-gray-200 p-2 hover:bg-slate-50"
          aria-label="Apagar cliente"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
