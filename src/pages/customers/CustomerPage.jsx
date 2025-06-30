// src/pages/customers/CustomerPage.jsx
import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { HeadingButton } from "../../components/ui/Headings";
import { useCustomersList } from "../../hooks/useCustomersList";
import { isContractActive } from "../../helpers/computeContractActive";
import Loading from "../../components/ui/Loading";
import NoResults from "../../components/ui/NoResults";
import CustomersListBlock from "../../components/blocks/CustomersListBlock";
import SearchResults from "../../components/forms/ui/SearchResults";

export default function CustomerPage() {
  const { customers, loading, error } = useCustomersList();
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("");
  /* pesquisa simples */
  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase();

    return (
      customers
        /* estado activo/inactivo baseado na data */
        .filter((c) => {
          if (status === "active") return isContractActive(c.contract_end_date);
          if (status === "inactive")
            return !isContractActive(c.contract_end_date);
          return true; // "all"
        })
        /* termo de pesquisa */
        .filter((c) => {
          if (!t) return true;
          return [c.company_name, c.company_vat, c.contact_name].some((field) =>
            field?.toLowerCase().includes(t)
          );
        })
    );
  }, [customers, term, status]);

  if (loading) return <Loading message="A carregar clientes…" full />;

  if (error) {
    toast.error(`Erro ao carregar clientes: ${error.message}`);
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <HeadingButton
        title="Lista de Clientes"
        subtitle="Clientes registados"
        path="/customers/add"
        buttonText="Adicionar"
      />

      {/* barra de pesquisa mínima – opcional */}
      <SearchResults
        term={term}
        onTermChange={setTerm}
        status={status}
        onStatusChange={setStatus}
        placeholder="Pesquisar clientes…"
      />

      {filtered.length ? (
        <CustomersListBlock customers={filtered} />
      ) : (
        <NoResults
          title="Sem clientes a mostrar"
          message="Ajuste o termo de pesquisa ou filtros"
        />
      )}
    </div>
  );
}
