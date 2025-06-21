import SiteCard from "../components/cards/SiteCards.jsx";
import { HeadingButton } from "../components/ui/Headings.jsx";
import Loading from "../components/ui/Loading.jsx";
import { useSites } from "../hooks/useSites.js";
import { toast } from "react-hot-toast";

const SitePage = () => {
  const { sites, loading, error } = useSites();

  if (loading) return <Loading message="A carregar locais…" full />;
  if (error) toast.error(`Erro ao carregar localização: ${error?.message}`);

  return (
    <div className="flex flex-col gap-3">
      <HeadingButton
        title="Locais/Pontos"
        subtitle="Gerir locais e pontos de exibição"
        path="/locais/novo"
        buttonText="Adicionar"
      />

      {/* lista simples — substitua pelo seu componente/card */}
      <ul className="grid grid-cols-3 gap-4">
        {sites.map((site) => (
          <SiteCard site={site} />
        ))}
      </ul>
    </div>
  );
};

export default SitePage;
