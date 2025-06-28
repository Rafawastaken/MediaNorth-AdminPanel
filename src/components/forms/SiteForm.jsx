import { useState } from "react";
import { BookPlus, ReceiptEuro, UserPlus, Save } from "lucide-react";
import { FormInputCol, FormInputRow } from "./ui/Input";
import FormActions from "./ui/FormActions";
import Loading from "../ui/Loading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSites } from "../../hooks/useSites";

const AddSiteForm = ({ cancelPath, cancelLabel, submitLabel }) => {
  // Form values
  const [siteName, setSiteName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [siteType, setSiteType] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contractType, setContractType] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [contractObservations, setContractObservations] = useState("");
  const [loading, setLoading] = useState(false);

  const { addSite } = useSites();

  const navigate = useNavigate();

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: siteName.trim(),
      vat: vatNumber.trim() || null,
      address: siteAddress.trim(),
      site_type: siteType,
      contact_name: contactName.trim(),
      contact_phone: contactPhone.trim(),
      contact_email: contactEmail.trim(),
      contract_type: contractType,
      contract_value: contractValue || null,
      observations: contractObservations || null,
    };

    try {
      await addSite(payload);
      toast.success(`Localização “${siteName}” criada com sucesso`);
      navigate("/sites");
    } catch (err) {
      toast.error(`Erro ao criar localização: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="A Guardar Sitio..." full />;
  }

  return (
    <form className={"flex flex-col gap-5 mt-5 w-full"} onSubmit={handleSubmit}>
      {/*--Site Information ---------------------------------- */}
      <div
        className={
          "px-3 py-4 shadow-sm rounded-lg flex flex-col gap-4 bg-gray-50 w-full ring-1 ring-slate-200"
        }
      >
        <div className="flex items-center gap-2 ">
          <BookPlus />
          <h1 className={"text-xl font-semibold"}>Informações Local</h1>
        </div>

        <div className="flex w-full gap-3 mt-2">
          {/*--Nome do Local ---------------------------------- */}
          <FormInputCol
            value={siteName}
            onChange={setSiteName}
            label={"Nome do Local *"}
            placeholder={"Estação de Pesquisa Dulvey"}
            required={true}
          />
          {/*--Nif ---------------------------------- */}
          <FormInputCol
            value={vatNumber}
            onChange={setVatNumber}
            label={"NIF"}
            placeholder={"999888777"}
            type="number"
          />
        </div>
        {/*--Morada do Local ---------------------------------- */}
        <FormInputRow
          value={siteAddress}
          onChange={setSiteAddress}
          label={"Morada *"}
          placeholder={
            "Quinta Baker, Estrada Rural 4, Dulvey Parish, Louisiana"
          }
          required={true}
        />

        {/*--Tipo do Local ---------------------------------- */}
        <div className={"flex flex-col items-start gap-1 flex-1"}>
          <label htmlFor="siteType" className="text-sm font-medium">
            Tipo de Local*
          </label>
          <select
            id="siteType"
            onChange={(e) => setSiteType(e.target.value)}
            className="text-sm font-normal border-1 border-gray-200 w-full px-2 py-2 rounded-md"
            value={siteType}
          >
            <option value={""} selected>
              Selecionar tipo
            </option>
            <option value="shoppingCenter">Centro Comercial</option>
            <option value="publicSpace">Espaço Público</option>
            <option value="restaurante">Restaurante</option>
            <option value="hotel">Hotel</option>
            <option value="office">Escritorio</option>
            <option value="other">Outro</option>
          </select>
        </div>
      </div>

      {/*--Contact Information ---------------------------------- */}
      <div
        className={
          "px-3 py-4 shadow-sm rounded-lg flex flex-col gap-4 bg-gray-50 w-full ring-1 ring-slate-200"
        }
      >
        <div className="flex items-center gap-2 ">
          <UserPlus />
          <h1 className={"text-xl font-semibold"}>Informações Contacto</h1>
        </div>
        {/*--Contact Name Contact Email ---------------------------------- */}
        <div className="flex w-full gap-3 mt-2">
          {/*--Contact Name ---------------------------------- */}
          <FormInputCol
            value={contactName}
            onChange={setContactName}
            placeholder={"Dr. Alexia Ashford"}
            label={"Responsável *"}
            required={true}
          />
          {/*--Contact Phone number  ---------------------------------- */}
          <FormInputCol
            value={contactPhone}
            onChange={setContactPhone}
            placeholder={"934112776"}
            label={"Contacto *"}
            required={true}
          />
        </div>

        <FormInputRow
          value={contactEmail}
          onChange={setContactEmail}
          label={"Email *"}
          placeholder={"aashford@umbrella-corp.pt"}
          required={true}
          type="email"
        />
      </div>

      {/*--Contract Information ---------------------------------- */}
      <div
        className={
          "px-3 py-4 shadow-sm rounded-lg flex flex-col gap-4 bg-gray-50 w-full ring-1 ring-slate-200"
        }
      >
        <div className="flex items-center gap-2 ">
          <ReceiptEuro />
          <h1 className={"text-xl font-semibold"}>Informações Contracto</h1>
        </div>
        {/*--Contact Type and Value ---------------------------------- */}
        <div className="flex w-full gap-3 mt-2">
          <div className={"flex flex-col items-start gap-1 flex-1"}>
            <label htmlFor="siteType" className="text-sm font-medium">
              Tipo de Contracto *
            </label>
            <select
              id="contractType"
              onChange={(e) => setContractType(e.target.value)}
              className="text-sm font-normal border-1 border-gray-200 w-full px-2 py-2 rounded-md"
              value={contractType}
              required
            >
              <option value={""} selected>
                Selecionar tipo de contracto
              </option>
              <option value="fixedValue">Valor Fixo</option>
              <option value="sellingPercentage">Percentagem</option>
              <option value="free">Gratuito</option>
            </select>
          </div>

          {/*--Contact Value ---------------------------------- */}
          <FormInputCol
            label={"Valor Mensal"}
            onChange={setContractValue}
            value={contractValue}
            placeholder={"120000€ ou 50%"}
          />
        </div>
        {/*--Contact Obs ---------------------------------- */}
        <FormInputRow
          value={contractObservations}
          onChange={setContractObservations}
          label={"Observações"}
          placeholder={
            "Infraestrutura isolada. Inclui monitorização B.O.W. e segurança nível 5. Contrato confidencial."
          }
          type="text"
        />
      </div>

      <FormActions
        cancelPath={cancelPath}
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
      />
    </form>
  );
};

export default AddSiteForm;
