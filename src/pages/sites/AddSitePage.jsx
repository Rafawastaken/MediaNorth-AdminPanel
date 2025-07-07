// src/pages/sites/AddSitePage.jsx
import { HeadingStandardBack } from "../../components/ui/Headings";
import SiteForm from "../../components/forms/SiteForm";
import { useSites } from "../../hooks/useSites";

export default function AddSitePage() {
  const { addSite } = useSites(); // <-- pega o addSite

  return (
    <div className="mx-auto max-w-6xl">
      <HeadingStandardBack
        title="Adicionar Novo Local"
        subtitle="Preencha as informações do novo local/ponto de exibição"
        path="/sites"
      />

      <SiteForm
        onSubmit={addSite}
        cancelPath="/sites"
        cancelLabel="Cancelar"
        submitLabel="Guardar"
      />
    </div>
  );
}
