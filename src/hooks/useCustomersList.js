// src/hooks/useCustomersList.js
import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

export function useCustomersList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("customer")
                // pede só as colunas que vais mostrar na tabela
                .select(`
          id,
          company_name,
          company_activity,
          company_address,
          company_vat,
          contact_name,
          contact_phone,
          contact_email,
          contract_type,
          contract_value
        `)
                .order("created_at", { ascending: false });

            if (error) setError(error);
            else setCustomers(data);
            setLoading(false);
        })();
    }, []);

    return { customers, loading, error };
}
