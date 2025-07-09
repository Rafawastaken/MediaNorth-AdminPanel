// src/hooks/useContractsExpiring.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../libs/supabase";
import { parseISO, differenceInCalendarDays } from "date-fns";

export function useContractsExpiring() {
    const [ended, setEnded] = useState([]);
    const [endingSoon, setEndingSoon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContracts = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("customer")
            .select("id, company_name, contract_end_date")
            .order("contract_end_date", { ascending: true });

        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        const today = new Date();
        const all = data
            .filter((c) => c.contract_end_date) // só quem tem data
            .map((c) => {
                const endDate = parseISO(c.contract_end_date);
                const daysLeft = differenceInCalendarDays(endDate, today);
                return { ...c, daysLeft };
            });

        setEnded(all.filter((c) => c.daysLeft < 0));
        setEndingSoon(all.filter((c) => c.daysLeft >= 0 && c.daysLeft <= 30));
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchContracts();
    }, [fetchContracts]);

    return { ended, endingSoon, loading, error, refetch: fetchContracts };
}
