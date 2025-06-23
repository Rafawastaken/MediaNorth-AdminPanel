import { HeadingStandardBack } from "../../components/ui/Headings.jsx";
import AddSiteForm from "../../components/forms/AddSiteForm.jsx";

const AddSitePage = () => {
  return (
    <div className={"max-w-6xl mx-auto"}>
      <HeadingStandardBack
        title={"Adicionar Novo Local"}
        subtitle={"Preencha as informações do novo local/ponto de exibição"}
      />
      <AddSiteForm />
    </div>
  );
};

export default AddSitePage;
