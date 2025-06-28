import CustomerForm from "../../components/forms/CustomerForm.jsx";
import { HeadingStandardBack } from "../../components/ui/Headings.jsx";

const AddCustomerPage = () => {
  return (
    <div className={"max-w-6xl mx-auto"}>
      <HeadingStandardBack
        title={"Adicionar Novo Cliente"}
        subtitle={"Preencha as informações do novo cliente"}
        path="/customers"
      />
      <CustomerForm cancelPath="/customers" />
    </div>
  );
};

export default AddCustomerPage;
