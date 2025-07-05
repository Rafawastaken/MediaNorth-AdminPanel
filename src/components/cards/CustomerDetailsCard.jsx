import { Mail, Phone, User2, MapPin } from "lucide-react";
import { isContractActive } from "../../helpers/computeContractActive";

const InformationColumn = ({ title, data }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-md font-semibold text-start mb-2 border-b-1 border-zinc-300">
        {title}
      </h2>
      {data.map((item, index) => (
        <div key={index} className="flex gap-2 items-center mb-1">
          <span className="text-sm font-semibold">{item.label}</span>
          <span className="text-sm">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomerDetailsCard = ({ customer }) => {
  const contactInformation = [
    {
      label: <User2 size={16} />,
      value: customer.contact_name || "Não informado",
    },
    {
      label: <Mail size={16} />,
      value: customer.contact_email || "Não informado",
    },
    {
      label: <Phone size={16} />,
      value: customer.contact_phone || "Não informado",
    },
    {
      label: <MapPin size={16} />,
      value: customer.company_address || "Não informado",
    },
  ];

  const companyInformation = [
    {
      label: "NIF:",
      value: customer.company_vat || "Não informado",
    },
    {
      label: "Setor:",
      value: customer.company_activity || "Não informado",
    },
    {
      label: "Website:",
      value: customer.company_website || "Não informado",
    },
  ];

  const contractInformation = [
    {
      label: "Período:",
      value:
        `${customer.contract_start_date} até ${customer.contract_end_date}` ||
        "Não informado",
    },
    {
      label: "Valor:",
      value: customer.contract_value
        ? `€ ${Number(customer.contract_value).toFixed(2)}`
        : "Não informado",
    },
    {
      label: "Pontos:",
      value: customer.contract_points || "Não informado",
    },
  ];

  const contractActive = isContractActive(customer.contract_end_date);

  return (
    <div className="flex flex-col gap-2 px-4 py-3 mt-4 bg-white rounded-md shadow-sm border-l-3 border-l-blue-500 ">
      <div className="flex gap-2 items-center">
        <User2 size={20} />{" "}
        <h1 className="capitalize text-xl font-bold">
          {customer.company_name}
        </h1>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium 
            ${
              contractActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {contractActive ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div className="flex w-full items-start justify-between text-center mt-2 pe-12">
        <InformationColumn
          data={contactInformation}
          title={"Informações de Contacto"}
        />
        <InformationColumn
          data={companyInformation}
          title={"Informações de Empresa"}
        />

        <InformationColumn
          data={contractInformation}
          title={"Informações de Contrato"}
        />
      </div>
    </div>
  );
};

export default CustomerDetailsCard;
