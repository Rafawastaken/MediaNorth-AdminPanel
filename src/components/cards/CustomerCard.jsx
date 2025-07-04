import { Link } from "react-router-dom";
import {
  Eye,
  User2,
  Mail,
  Pencil,
  Trash2,
  MapPinHouse,
  Phone,
  Tv2,
} from "lucide-react";
import { contractType } from "../../enums/values";
import { computeValue } from "../../helpers/computeValue";
import { isContractActive } from "../../helpers/computeContractActive";
import { useCustomerVideos } from "../../hooks/useCustomerVideos";
import Loading from "../ui/Loading";

const CustomerCard = ({ customer }) => {
  const { videos, stats, loading, error } = useCustomerVideos(
    customer.id,
    "all"
  );
  const normalizedContractType =
    contractType[customer.contract_type] ?? contractType.other;
  const normalizedContractValue = computeValue(
    customer.contract_value,
    customer.contract_type
  );
  const contractActive = isContractActive(customer.contract_end_date);

  if (loading) {
    return <Loading message="Carregando cliente..." full />;
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
            <User2 size={22} className="text-blue-600" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">{customer.company_name}</h3>
            <span className="text-sm text-slate-500 capitalize">
              {customer.company_activity}
            </span>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-0.5 text-xs font-medium 
            ${
              contractActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {contractActive ? "Ativo" : "Inativo"}
        </span>
      </div>
      {/* Morada + contacto */}
      <ul className="mt-4 space-y-1 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <MapPinHouse size={16} />
          {customer.company_address}
        </li>
        <li className="flex items-center gap-2">
          <User2 size={16} />
          {customer.contact_name}
        </li>
        <li className="flex items-center gap-2">
          <Phone size={16} />
          {customer.contact_phone}
        </li>
        <li className="flex items-center gap-2">
          <Mail size={16} />
          {customer.contact_email}
        </li>
      </ul>
      {/* Contrato */}
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
      <div className="border-b border-gray-200 my-5" />
      {/* Estatisticas  */}
      <div className="grid grid-cols-2 text-center text-sm">
        <div>
          <p className="text-blue-700 font-bold text-lg">{stats.devices}</p>
          <span className="text-slate-500">Pontos</span>
        </div>
        <div>
          <p className="text-green-700 font-bold text-lg">{stats.total}</p>
          <span className="text-slate-500">Anúncios</span>
        </div>
      </div>
      {/* Ações */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          to={`/customers/${customer.id}`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border-1 border-gray-200 px-4 py-2 text-sm hover:bg-slate-50"
        >
          <Eye size={16} /> Ver
        </Link>
        <Link
          to={`/customers/${customer.id}/edit`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border-1 border-gray-200 px-4 py-2 text-sm hover:bg-slate-50"
        >
          <Pencil size={16} /> Editar
        </Link>

        <button
          className="rounded-lg border-1 border-gray-200 p-2 hover:bg-slate-50"
          aria-label="Apagar"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
