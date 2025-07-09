import { useParams } from "react-router-dom";
import { HeadingButtonAndBack } from "../../components/ui/Headings";
import { useSiteDetailsWithId } from "../../hooks/useSiteDetailsWithId";
import Loading from "../../components/ui/Loading";
import { toast } from "react-hot-toast";
import DeviceStatisticBlock from "../../components/blocks/DeviceStatisticBlock";
import DevicesTable from "../../components/tables/DevicesTable";

export default function DevicePage() {
  const { idSite } = useParams();
  const { site, devices, loading, error, refetch } =
    useSiteDetailsWithId(idSite);

  if (loading) {
    return <Loading message="Carregar TVs..." />;
  }

  if (error) {
    toast.error(`Erro ao carregar TVs: ${error.message}`);
    return;
  }

  return (
    <div className="flex flex-col gap-3">
      <HeadingButtonAndBack
        title={`TVs do ${site.name}`}
        subtitle={site.address}
        buttonPath={`/sites/${idSite}/devices/add`}
        buttonText="Adicionar TV"
        buttonBackPath="/sites"
      />
      <DeviceStatisticBlock devices={devices} />
      <DevicesTable devices={devices} onDelete={refetch} />
    </div>
  );
}
