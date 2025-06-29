// src/pages/customers/CustomerPage.jsx
import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import NoResults from "../../components/ui/NoResults";
import { HeadingButton } from "../../components/ui/Headings";
import { useCustomersList } from "../../hooks/useCustomersList";

export default function CustomerPage() {
  const { customers, loading, error } = useCustomersList();

  const [term, setTerm] = useState("");

  /* pesquisa simples */
  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return customers;

    return customers.filter((c) =>
      [c.company_name, c.contact_name, c.company_vat].some((v) =>
        v?.toLowerCase().includes(t)
      )
    );
  }, [customers, term]);

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
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Pesquisar clientes…"
        className="w-64 rounded border px-3 py-2"
      />

      {filtered.length ? (
        <p>Lista de Clientes</p>
      ) : (
        <NoResults
          title="Sem clientes a mostrar"
          message="Ajuste o termo de pesquisa ou filtros"
        />
      )}
    </div>
  );
}
