import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";
import { computeCustomerActive } from "../helpers/computeCustomerActive";

/** devolve contagem de clientes ativos/inativos + indicador de loading */
export function useCustomerStats() {
    const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("customer")
                .select("id, contract_end_date");

            if (error) { setError(error); setLoading(false); return; }

            setStats(computeCustomerActive(data));
            setLoading(false);
        })();
    }, []);

    return { stats, loading, error };
}
