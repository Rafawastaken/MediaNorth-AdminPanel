// src/components/forms/SiteForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookPlus, ReceiptEuro, UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";

import FormSection from "./ui/FormSection";
import FormActions from "./ui/FormActions";
import { FormInputCol, FormInputRow } from "./ui/Input";
import Loading from "../ui/Loading";

export default function SiteForm({
  initialValues = {}, // {} = criar · {…} = editar
  onSubmit, // (payload) => Promise
  cancelPath = "#",
  submitLabel = "Guardar",
  cancelLabel = "Cancelar",
}) {
  /* ---------------- estado ---------------- */
  const [siteName, setSiteName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [siteType, setSiteType] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contractType, setContractType] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [observations, setObservations] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* -------- preencher ao entrar em edição -------- */
  useEffect(() => {
    setSiteName(initialValues.name ?? "");
    setVatNumber(initialValues.vat ?? "");
    setSiteAddress(initialValues.address ?? "");
    setSiteType(initialValues.site_type ?? "");
    setContactName(initialValues.contact_name ?? "");
    setContactPhone(initialValues.contact_phone ?? "");
    setContactEmail(initialValues.contact_email ?? "");
    setContractType(initialValues.contract_type ?? "");
    setContractValue(initialValues.contract_value ?? "");
    setObservations(initialValues.observations ?? "");
  }, [initialValues?.id]);

  /* ---------------- submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !siteName ||
      !siteAddress ||
      !siteType ||
      !contactName ||
      !contactPhone ||
      !contactEmail ||
      !contractType
    ) {
      toast.error("Preenche todos os campos obrigatórios.");
      return;
    }

    const payload = {
      name: siteName.trim(),
      vat: vatNumber.trim() || null,
      address: siteAddress.trim(),
      site_type: siteType,
      contact_name: contactName.trim(),
      contact_phone: contactPhone.trim(),
      contact_email: contactEmail.trim(),
      contract_type: contractType,
      contract_value: contractValue.trim() || null,
      observations: observations.trim() || null,
    };

    try {
      setLoading(true);
      await onSubmit(payload);
      navigate(cancelPath);
    } catch (err) {
      toast.error(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="A guardar local…" full />;

  /* ---------------- UI ---------------- */
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-5">
      {/* ——— Informação do local ——— */}
      <FormSection icon={BookPlus} title="Informações do Local">
        <div className="mt-2 flex gap-3">
          <FormInputCol
            value={siteName}
            onChange={setSiteName}
            label="Nome do Local *"
            placeholder="Centro Comercial X"
            required
          />
          <FormInputCol
            value={vatNumber}
            onChange={setVatNumber}
            label="NIF"
            placeholder="512345678"
            type="number"
          />
        </div>

        <FormInputRow
          className="mt-2"
          value={siteAddress}
          onChange={setSiteAddress}
          label="Morada *"
          placeholder="Rua Exemplo 1, Lisboa"
          required
        />

        <div className="mt-2 flex flex-col gap-1">
          <label className="text-sm font-medium">Tipo de Local *</label>
          <select
            value={siteType}
            onChange={(e) => setSiteType(e.target.value)}
            className="rounded-md border px-2 py-2 text-sm"
            required
          >
            <option value="">Selecionar tipo</option>
            <option value="shoppingCenter">Centro Comercial</option>
            <option value="publicSpace">Espaço Público</option>
            <option value="restaurante">Restaurante</option>
            <option value="hotel">Hotel</option>
            <option value="office">Escritório</option>
            <option value="other">Outro</option>
          </select>
        </div>
      </FormSection>

      {/* ——— Contacto ——— */}
      <FormSection icon={UserPlus} title="Informações do Contacto">
        <div className="mt-2 flex gap-3">
          <FormInputCol
            value={contactName}
            onChange={setContactName}
            label="Responsável *"
            placeholder="João Silva"
            required
          />
          <FormInputCol
            value={contactPhone}
            onChange={setContactPhone}
            label="Contacto *"
            placeholder="912345678"
            required
          />
        </div>

        <FormInputRow
          className="mt-2"
          value={contactEmail}
          onChange={setContactEmail}
          label="Email *"
          placeholder="joao@mail.com"
          type="email"
          required
        />
      </FormSection>

      {/* ——— Contrato ——— */}
      <FormSection icon={ReceiptEuro} title="Informações de Contrato">
        <div className="mt-2 flex gap-3">
          <div className="flex flex-1 flex-col gap-1">
            <label className="text-sm font-medium">Tipo de Contrato *</label>
            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              className="rounded-md border px-2 py-2 text-sm"
              required
            >
              <option value="">Selecionar tipo</option>
              <option value="fixedValue">Valor Fixo</option>
              <option value="sellingPercentage">Percentagem</option>
              <option value="free">Gratuito</option>
            </select>
          </div>

          <FormInputCol
            value={contractValue}
            onChange={setContractValue}
            label="Valor Mensal"
            placeholder="1200€ ou 15%"
          />
        </div>

        <FormInputRow
          className="mt-2"
          value={observations}
          onChange={setObservations}
          label="Observações"
          placeholder="Infraestrutura isolada, contrato confidencial, …"
        />
      </FormSection>

      {/* ——— Botões ——— */}
      <FormActions
        cancelPath={cancelPath}
        cancelLabel={cancelLabel}
        submitLabel={submitLabel}
      />
    </form>
  );
}
