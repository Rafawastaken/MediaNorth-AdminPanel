import { useParams } from "react-router-dom";
import { useSiteDetailsWithId } from "../../hooks/useSiteDetailsWithId.js";
import { toast } from "react-hot-toast";

import { HeadingStandardBack } from "../../components/ui/Headings.jsx";
import AddDeviceSiteForm from "../../components/forms/AddDeviceSiteForm.jsx";
import Loading from "../../components/ui/Loading.jsx";

const AddDeviceSitePage = () => {
  const { idSite } = useParams();
  const { site, devices, loading, error } = useSiteDetailsWithId(idSite);

  if (loading) {
    return <Loading message="Carregar TVs..." />;
  }

  if (error) {
    toast.error(`Erro ao carregar TVs: ${error.message}`);
    return <div>{error}</div>;
  }

  return (
    <div className={"max-w-6xl mx-auto"}>
      <HeadingStandardBack
        title={"Adicionar Novo Dispositivo"}
        subtitle={`Adicionar dispositivo de reprodução para ${site.name}`}
        path="/sites"
      />
      <AddDeviceSiteForm idSite={idSite} />
    </div>
  );
};

export default AddDeviceSitePage;
