// src/components/forms/CustomerForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import FormSection from "./ui/FormSection";
import FormActions from "./ui/FormActions";
import Loading from "../ui/Loading";
import ContractTypeInput from "./ui/ContractTypeInput";
import { Building2, UserPlus, ReceiptEuro } from "lucide-react";
import { FormInputCol, FormInputRow } from "./ui/Input";

import { logEvent } from "../../services/logEvent";

/**
 * Formulário de criação / edição de clientes
 */
export default function CustomerForm({
  initialValues = {}, // {} = criar · {…} = editar
  onSubmit, // (payload) => Promise → devolve id
  cancelPath = "#",
  submitLabel = "Guardar",
}) {
  /* --------------- estado controlado --------------- */
  const [companyName, setCompanyName] = useState("");
  const [companyVat, setCompanyVat] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyActivity, setCompanyActivity] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [contractStartDate, setContractStartDate] = useState("");
  const [contractEndDate, setContractEndDate] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [contractPoints, setContractPoints] = useState("");
  const [contractType, setContractType] = useState("");

  const [observations, setObservations] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* --------------- preencher em edição -------------- */
  useEffect(() => {
    setCompanyName(initialValues.company_name ?? "");
    setCompanyVat(initialValues.company_vat ?? "");
    setCompanyAddress(initialValues.company_address ?? "");
    setCompanyActivity(initialValues.company_activity ?? "");
    setCompanyWebsite(initialValues.company_website ?? "");

    setContactName(initialValues.contact_name ?? "");
    setContactPhone(initialValues.contact_phone ?? "");
    setContactEmail(initialValues.contact_email ?? "");

    setContractStartDate(initialValues.contract_start_date ?? "");
    setContractEndDate(initialValues.contract_end_date ?? "");
    setContractValue(initialValues.contract_value ?? "");
    setContractPoints(initialValues.contract_points ?? "");
    setContractType(initialValues.contract_type ?? "");

    setObservations(initialValues.observations ?? "");
  }, [initialValues?.id]);

  /* --------------- SUBMIT --------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !companyVat || !contactName || !contactPhone) {
      toast.error("Preenche todos os campos obrigatórios.");
      return;
    }

    const creating = !initialValues.id;

    try {
      setLoading(true);

      /* gravação ---------------------------------------------------- */
      const customerId = await onSubmit({
        companyName,
        companyVat,
        companyAddress,
        companyActivity,
        companyWebsite,
        contactName,
        contactPhone,
        contactEmail,
        contractStartDate,
        contractEndDate,
        contractValue,
        contractPoints,
        contractType,
        observations,
      });

      /* log --------------------------------------------------------- */
      await logEvent({
        type: creating ? "customer_created" : "customer_updated",
        summary: `${
          creating ? "Criado" : "Atualizado"
        } cliente “${companyName}”`,
        details: {
          companyName,
          companyVat,
          contactName,
          contactEmail,
          contractType,
          contractStartDate,
          contractEndDate,
          contractValue,
        },
        context: { customer_id: customerId },
      });

      toast.success(
        creating
          ? "Cliente criado com sucesso!"
          : "Cliente actualizado com sucesso!"
      );
      navigate(cancelPath);
    } catch (err) {
      // 23505 = unique_violation (PostgreSQL)
      const duplicate =
        (err?.code === "23505" || err?.code === "23514") && // unique_violation
        /email/i.test(err?.constraint ?? err?.message ?? "");

      toast.error(
        duplicate
          ? "Já existe um cliente com esse e-mail."
          : `Erro: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="A guardar cliente…" full />;

  /* --------------- UI ------------------------------ */
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-5">
      {/* ——— Empresa ——— */}
      <FormSection icon={Building2} title="Dados da Empresa">
        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={companyName}
            onChange={setCompanyName}
            label="Nome da Empresa *"
            placeholder="Umbrella Corporation"
            required
          />
          <FormInputCol
            value={companyVat}
            onChange={setCompanyVat}
            label="NIF da Empresa *"
            placeholder="999999990"
            required
          />
        </div>

        <FormInputRow
          className="mt-3"
          value={companyAddress}
          onChange={setCompanyAddress}
          label="Morada da Empresa"
          placeholder="Raccoon City Industrial Park, Bloco 3-217"
        />

        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={companyActivity}
            onChange={setCompanyActivity}
            label="Atividade da Empresa"
            placeholder="Investigação Biomédica"
          />
          <FormInputCol
            value={companyWebsite}
            onChange={setCompanyWebsite}
            label="Website da Empresa"
            placeholder="https://umbrella.pt"
          />
        </div>
      </FormSection>

      {/* ——— Contacto ——— */}
      <FormSection icon={UserPlus} title="Informação de Cliente">
        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={contactName}
            onChange={setContactName}
            label="Nome do Cliente *"
            placeholder="Dr. Albert Wesker"
            required
          />
          <FormInputCol
            value={contactPhone}
            onChange={setContactPhone}
            label="Contacto do Cliente *"
            placeholder="912 345 678"
            required
          />
        </div>

        <FormInputRow
          className="mt-3"
          value={contactEmail}
          onChange={setContactEmail}
          label="Email do Cliente"
          placeholder="awesker@umbrella.pt"
          type="email"
        />
      </FormSection>

      {/* ——— Contrato ——— */}
      <FormSection icon={ReceiptEuro} title="Informação de Contrato">
        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={contractStartDate}
            onChange={setContractStartDate}
            label="Data Início *"
            type="date"
            required
          />
          <FormInputCol
            value={contractEndDate}
            onChange={setContractEndDate}
            label="Data Fim *"
            type="date"
            required
          />
        </div>

        <div className="mt-3 flex gap-3">
          <ContractTypeInput value={contractType} onChange={setContractType} />
          <FormInputCol
            value={contractValue}
            onChange={setContractValue}
            label="Valor Mensal *"
            placeholder="500 € ou 20 % vendas"
            required
          />
          <FormInputCol
            value={contractPoints}
            onChange={setContractPoints}
            label="Qtd. de Pontos"
            type="number"
            placeholder="500"
          />
        </div>

        <FormInputRow
          className="mt-3"
          value={observations}
          onChange={setObservations}
          label="Observações"
          placeholder="Acesso prioritário ao laboratório nível 4…"
        />
      </FormSection>

      {/* ——— Botões ——— */}
      <FormActions cancelPath={cancelPath} submitLabel={submitLabel} />
    </form>
  );
}
