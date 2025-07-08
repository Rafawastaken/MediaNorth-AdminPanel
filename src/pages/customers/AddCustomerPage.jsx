import { HeadingStandardBack } from "../../components/ui/Headings";
import CustomerForm from "../../components/forms/CustomerForm";
import { useCustomer } from "../../hooks/useCustomer";

export default function AddCustomerPage() {
  const { addCustomer } = useCustomer(); // só o “ADD” do hook

  return (
    <div className="mx-auto max-w-6xl">
      <HeadingStandardBack
        title="Adicionar Novo Cliente"
        subtitle="Preencha as informações do novo cliente"
        path="/customers"
      />

      <CustomerForm
        onSubmit={addCustomer} /* devolve id → logs */
        cancelPath="/customers"
        submitLabel="Guardar"
      />
    </div>
  );
}
