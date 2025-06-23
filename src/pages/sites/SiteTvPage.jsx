import { useParams } from "react-router-dom";
import { HeadingButtonAndBack } from "../../components/ui/Headings";
import { useSiteWithDevices } from "../../hooks/useSiteWithDevices";
import Loading from "../../components/ui/Loading";

const SiteTvPage = () => {
  const { idSite } = useParams();
  const { site, devices, loading, error } = useSiteWithDevices(idSite);

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
        buttonPath="/adicionar"
        buttonText="Adicionar TV"
        buttonBackPath="/locais"
      />
    </>
  );
};

export default SiteTvPage;
