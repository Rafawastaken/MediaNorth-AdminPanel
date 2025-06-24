import { useParams } from "react-router-dom";
import { HeadingButtonAndBack } from "../../components/ui/Headings";
import { useSiteDetailsWithId } from "../../hooks/useSiteDetailsWithId";
import Loading from "../../components/ui/Loading";
import { toast } from "react-hot-toast";

const SiteDevicePage = () => {
  const { idSite } = useParams();
  const { site, devices, loading, error } = useSiteDetailsWithId(idSite);

  if (loading) {
    return <Loading message="Carregar TVs..." />;
  }

  if (error) {
    toast.error(`Erro ao carregar TVs: ${error.message}`);
  }

  return (
    <>
      <HeadingButtonAndBack
        title={`TVs do ${site.name}`}
        subtitle={site.address}
        buttonPath={`/sites/${idSite}/devices/add`}
        buttonText="Adicionar TV"
        buttonBackPath="/sites"
      />
    </>
  );
};

export default SiteDevicePage;
