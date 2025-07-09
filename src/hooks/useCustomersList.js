// src/hooks/useCustomersList.js
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

export function useCustomersList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("customer")
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
        contract_value,
        contract_end_date,
        contract_start_date
      `)
            .order("created_at", { ascending: false });

        if (error) setError(error);
        else setCustomers(data);

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        customers,
        loading,
        error,
        refetch: fetchData,   // expos o refetch
    };
}
