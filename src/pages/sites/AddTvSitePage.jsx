import { useParams } from "react-router-dom";
import { useSiteWithDevices } from "../../hooks/useSiteWithDevices";
import { toast } from "react-hot-toast";

import { HeadingStandardBack } from "../../components/ui/Headings.jsx";
import AddTvSiteForm from "../../components/forms/AddTvSiteForm.jsx";
import Loading from "../../components/ui/Loading";

const AddTvSitePage = () => {
  const { idSite } = useParams();
  const { site, devices, loading, error } = useSiteWithDevices(idSite);

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
      <AddTvSiteForm idSite={idSite} />
    </div>
  );
};

export default AddTvSitePage;
