// src/pages/site/AddDeviceSitePage.jsx
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useSiteDetailsWithId } from "../../hooks/useSiteDetailsWithId";
import DeviceForm from "../../components/forms/DeviceForm";
import Loading from "../../components/ui/Loading";
import { HeadingStandardBack } from "../../components/ui/Headings";

const AddDevicePage = () => {
  const { idSite } = useParams();
  const { site, addDevice, loading, error } = useSiteDetailsWithId(idSite);

  if (loading) return <Loading message="A carregar dados…" full />;
  if (error) {
    toast.error(`Erro: ${error.message}`);
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <HeadingStandardBack
        title="Adicionar Novo Dispositivo"
        subtitle={`Adicionar dispositivo de reprodução para ${site.name}`}
        path={`/sites/${idSite}/devices`}
      />

      {/* Formulário genérico ⇒ passa apenas props necessárias */}
      <DeviceForm
        onSubmit={addDevice}
        cancelPath={`/sites/${idSite}/devices`}
        submitLabel="Adicionar TV"
      />
    </div>
  );
};

export default AddDevicePage;
