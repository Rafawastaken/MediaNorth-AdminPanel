import { useMemo, useState } from "react";
import { useSites } from "../../hooks/useSites";
import { toast } from "react-hot-toast";
import { HeadingButton } from "../../components/ui/Headings.jsx";
import Loading from "../../components/ui/Loading.jsx";
import SearchSite from "../../components/forms/ui/SearchSite.jsx";
import SiteListBlock from "../../components/blocks/SiteListBlock.jsx";
import NoResults from "../../components/ui/NoResults.jsx";

export default function SitePage() {
  /* 1) hooks SEMPRE no topo */
  const { sites, loading, error } = useSites();
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("all");

  const filteredSites = useMemo(() => {
    const t = term.trim().toLowerCase();

    return sites
      .filter((s) => {
        if (status === "active") return s.active;
        if (status === "inactive") return !s.active;
        return true;
      })
      .filter((s) => {
        if (!t) return true;
        return [s.name, s.contract_type, s.contact_name].some((field) =>
          field?.toLowerCase().includes(t)
        );
      });
  }, [sites, term, status]);

  if (loading) return <Loading message="A carregar locais…" full />;

  if (error) {
    toast.error(`Erro ao carregar locais: ${error.message}`);
  }

  /* 3) render normal */
  return (
    <div className="flex flex-col gap-3">
      <HeadingButton
        title="Locais/Pontos"
        subtitle="Gerir locais e pontos de exibição"
        path="/locais/novo"
        buttonText="Adicionar"
      />
      <SearchSite
        term={term}
        onTermChange={setTerm}
        status={status}
        onStatusChange={setStatus}
      />
      {filteredSites.length > 0 && sites.length !== 0 ? (
        <SiteListBlock sites={filteredSites} />
      ) : (
        <NoResults
          title={"Sem locais a mostrar"}
          message={"Ajuste o termo de pesquisa ou filtros"}
        />
      )}
    </div>
  );
}
