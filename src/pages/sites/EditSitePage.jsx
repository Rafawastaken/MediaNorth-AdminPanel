// src/pages/sites/EditSitePage.jsx
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { HeadingStandardBack } from "../../components/ui/Headings";
import SiteForm from "../../components/forms/SiteForm";
import Loading from "../../components/ui/Loading";
import { useSite } from "../../hooks/useSite";

const EditSitePage = () => {
  const { idSite } = useParams();
  const { site, loading, error, updateSite } = useSite(idSite);

  /* ------ UI de carregamento / erro ------ */
  if (loading) return <Loading message="A carregar local…" full />;
  if (error) {
    toast.error(`Erro ao carregar local: ${error.message}`);
    return null;
  }

  /* ------ submit handler (actualiza) ------ */
  const handleUpdate = async (fields) => {
    try {
      await updateSite({ id: idSite, ...fields });
      toast.success("Local atualizado com sucesso");
    } catch (err) {
      toast.error(`Erro ao atualizar local: ${err.message}`);
      throw err; // para o SiteForm apanhar se precisar
    }
  };

  /* ------ render ------ */
  return (
    <div className="mx-auto max-w-6xl">
      <HeadingStandardBack
        title="Editar Local"
        subtitle={`Alterar informações de ${site.name}`}
        path="/sites"
      />

      <SiteForm
        initialValues={site} /* preenche o formulário */
        onSubmit={handleUpdate} /* guarda alterações   */
        cancelPath="/sites"
        cancelLabel="Cancelar"
        submitLabel="Guardar"
      />
    </div>
  );
};

export default EditSitePage;
