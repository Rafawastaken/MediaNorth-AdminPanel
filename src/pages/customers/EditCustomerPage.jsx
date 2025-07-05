import { useParams } from "react-router-dom";
import { useCustomer } from "../../hooks/useCustomer";
import Loading from "../../components/ui/Loading";
import { HeadingStandardBack } from "../../components/ui/Headings";
import CustomerForm from "../../components/forms/CustomerForm";

const EditCustomerPage = () => {
  const { idCustomer } = useParams();
  const { customer, loading, error, updateCustomer } = useCustomer(idCustomer);

  if (loading) return <Loading message="Carregar dados do cliente..." full />;
  if (error) return <p className="p-4 text-red-600">Erro: {error.message}</p>;

  return (
    <div className="mx-auto max-w-6xl">
      <HeadingStandardBack
        title="Editar Dispositivo"
        subtitle={`${customer.company_name}`}
        backPath={`/customers/${idCustomer}`}
      />
      <CustomerForm
        initialValues={customer}
        onSubmit={updateCustomer}
        cancelPath={`/customers/${idCustomer}`}
        submitLabel="Guardar alterações"
      />
    </div>
  );
};

export default EditCustomerPage;
