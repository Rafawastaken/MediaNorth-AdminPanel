import { HeadingStandardBack } from "../../components/ui/Headings.jsx";
import SiteForm from "../../components/forms/SiteForm.jsx";

const AddSitePage = () => {
  return (
    <div className={"max-w-6xl mx-auto"}>
      <HeadingStandardBack
        title={"Adicionar Novo Local"}
        subtitle={"Preencha as informações do novo local/ponto de exibição"}
        path="/sites"
      />
      <SiteForm
        cancelPath={"/sites"}
        cancelLabel={"Cancelar"}
        submitLabel={"Guardar"}
      />
    </div>
  );
};

export default AddSitePage;
