import CustomerForm from "../../components/forms/CustomerForm.jsx";
import { HeadingStandardBack } from "../../components/ui/Headings.jsx";
import { useCustomer } from "../../hooks/useCustomer.js";

const AddCustomerPage = () => {
  const { addCustomer } = useCustomer();

  return (
    <div className={"max-w-6xl mx-auto"}>
      <HeadingStandardBack
        title={"Adicionar Novo Cliente"}
        subtitle={"Preencha as informações do novo cliente"}
        path="/customers"
      />
      <CustomerForm cancelPath="/customers" onSubmit={addCustomer} />
    </div>
  );
};

export default AddCustomerPage;
