import { useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { useCustomer } from "../../hooks/useCustomer";
import { HeadingButtonAndBack } from "../../components/ui/Headings";

export default function CustomersPage() {
  const { idCustomer } = useParams();
  const { customer, loading, error } = useCustomer(idCustomer);

  if (loading) {
    return <Loading message="Carregando cliente..." full />;
  }

  if (error) {
    toast.error(`Erro ao carregar cliente: ${error.message}`);
    return;
  }

  return (
    <div>
      <HeadingButtonAndBack
        title={`${customer.company_name}`}
        subtitle="Informações detalhadas e campanhas ativas"
        buttonPath={`/customers/${idCustomer}/videos/add`}
        buttonText="Adicionar Vídeo"
        buttonBackPath="/customers"
      />
      {/* VideoStatisticBlock */}
      {/* VideosTable */}
    </div>
  );
}
