import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loading from "../ui/Loading";
import FormActions from "./ui/FormActions";
import FormSection from "./ui/FormSection";

import ContractTypeInput from "./ui/ContractTypeInput";
import { Building2, ReceiptEuro, UserPlus, Save } from "lucide-react";
import { FormInputCol, FormInputRow } from "./ui/Input";

const CustomerForm = ({
  initialValues = {},
  onSubmit,
  cancelPath = "#",
  submitLabel = "Guardar",
}) => {
  const loading = false;

  /* ─────────── state controlado ─────────── */
  // Company
  const [companyName, setCompanyName] = useState("");
  const [companyVat, setCompanyVat] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyActivity, setCompanyActivity] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  // Contact
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  // Contract
  const [contractStartDate, setContractStartDate] = useState("");
  const [contractEndDate, setContractEndDate] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [contractPoints, setContractPoints] = useState("");
  const [contractType, setContractType] = useState("");
  const [observations, setObservations] = useState("");

  /* ─────────── Navigation ─────────── */
  const navigate = useNavigate();

  // Preencher campos quando mudam os initialValues - edicao
  useEffect(() => {
    setCompanyName(initialValues.companyName ?? "");
    setCompanyVat(initialValues.companyVat ?? "");
    setCompanyAddress(initialValues.companyAddress ?? "");
    setCompanyActivity(initialValues.companyActivity ?? "");
    setCompanyWebsite(initialValues.companyWebsite ?? "");
    setContactName(initialValues.contactName ?? "");
    setContactPhone(initialValues.contactPhone ?? "");
    setContactEmail(initialValues.contactEmail ?? "");
    setContractStartDate(initialValues.contractStartDate ?? "");
    setContractEndDate(initialValues.contractEndDate ?? "");
    setContractValue(initialValues.contractValue ?? "");
    setContractPoints(initialValues.contractPoints ?? "");
    setContractType(initialValues.contractType ?? "");
    setObservations(initialValues.observations ?? "");
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (loading) return <Loading message="A guardar cliente" full />;

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-5">
      {/* Company section -------------------- */}
      <FormSection icon={Building2} title={"Dados da Empresa"}>
        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={companyName}
            onChange={setCompanyName}
            label="Nome da Empresa *"
            placeholder="Empresa Exemplo XYZ"
            required
          />
          <FormInputCol
            value={companyVat}
            onChange={setCompanyVat}
            label="NIF da Empresa *"
            placeholder="512345678"
            required
          />
        </div>
        <div className="mt-3">
          <FormInputRow
            value={companyAddress}
            onChange={setCompanyAddress}
            label="Morada da Empresa"
            placeholder="Rua de exemplo nº 12"
          />
        </div>
        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={companyActivity}
            onChange={setCompanyActivity}
            label="Atividade da Empresa"
            placeholder="Atividade da empresa (Retalho, Tecnologia,...)"
          />
          <FormInputCol
            value={companyWebsite}
            onChange={setCompanyWebsite}
            label="Website da Empresa"
            placeholder="https://www.example.com"
          />
        </div>
      </FormSection>
      {/* Contact section -------------------- */}
      <FormSection icon={UserPlus} title={"Informação de Cliente"}>
        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={contactName}
            onChange={setContactName}
            label="Nome do Cliente *"
            placeholder="João Silva"
            required
          />
          <FormInputCol
            value={contactPhone}
            onChange={setContactPhone}
            label="Contacto do Cliente *"
            placeholder="912345678"
            required
          />
        </div>
        <div className="mt-3">
          <FormInputRow
            value={contactEmail}
            onChange={setContactEmail}
            label="Email do Cliente"
            placeholder="example@email.com"
            type="email"
          />
        </div>
      </FormSection>
      {/* Contract section -------------------- */}
      <FormSection icon={ReceiptEuro} title={"Informação de Contracto"}>
        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={contractStartDate}
            onChange={setContractStartDate}
            label="Data de Inicio de Contracto *"
            placeholder="example@email.com"
            type="date"
            required
          />
          <FormInputCol
            value={contractEndDate}
            onChange={setContractEndDate}
            label="Data de Fim de Contracto *"
            placeholder="example@email.com"
            type="date"
            required
          />
        </div>
        <div className="mt-3 flex gap-3">
          <ContractTypeInput value={contractType} onChange={setContractType} />
          <FormInputCol
            value={contractValue}
            onChange={setContractValue}
            label="Valor do Contrato *"
            placeholder="example@email.com"
            required
          />
          <FormInputCol
            value={contractPoints}
            onChange={setContractPoints}
            label="Quantidade de Pontos"
            placeholder="10"
            type="number"
          />
        </div>
        <div className="mt-3">
          <FormInputRow
            value={observations}
            onChange={setObservations}
            label="Observações Adicionais"
            placeholder="Observações adicionais"
          />
        </div>
      </FormSection>

      {/* Botões */}
      <FormActions cancelPath={cancelPath} submitLabel={submitLabel} />
    </form>
  );
};

export default CustomerForm;
