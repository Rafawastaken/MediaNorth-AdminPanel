import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import { useCustomer } from "../../hooks/useCustomer";
import { useCustomerVideos } from "../../hooks/useCustomerVideos";
import { HeadingButtonAndBack } from "../../components/ui/Headings";
import CustomerDetailsCard from "../../components/cards/CustomerDetailsCard";
import CustomerVideoStatsBlock from "../../components/blocks/CustomerVideoStatsBlock";
import VideosTable from "../../components/tables/VideosTable";

export default function CustomersPage() {
  const { idCustomer } = useParams();
  const {
    customer,
    loading: customerLoading,
    error: customerError,
  } = useCustomer(idCustomer);
  const {
    videos,
    stats,
    loading: videoStatsLoading,
    error: videoStatsError,
  } = useCustomerVideos(idCustomer, "all");

  if (customerLoading || videoStatsLoading) {
    return <Loading message="Carregando cliente..." full />;
  }

  if (customerError || videoStatsError) {
    if (customerError) {
      toast.error(`Erro ao carregar cliente: ${customerError.message}`);
    } else {
      toast.error(
        `Erro ao carregar vídeos e estatísticas: ${videoStatsError.message}`
      );
    }
    return;
  }

  return (
    <div className="flex flex-col gap-3">
      <HeadingButtonAndBack
        title={`${customer.company_name}`}
        subtitle="Informações detalhadas e campanhas ativas"
        buttonPath={`/customers/${idCustomer}/videos/add`}
        buttonText="Adicionar Vídeo"
        buttonBackPath="/customers"
      />
      <CustomerDetailsCard customer={customer} />
      <CustomerVideoStatsBlock videos={videos} stats={stats} />
      <VideosTable videos={videos} idCustomer={idCustomer} />
    </div>
  );
}
