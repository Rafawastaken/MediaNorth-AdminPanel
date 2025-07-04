// src/hooks/useCustomer.js
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

/**
 * Se `idCustomer` for undefined ⇒ só devolve addCustomer (criar).
 * Se `idCustomer` tiver valor   ⇒ devolve também customer + update.
 */
export function useCustomer(idCustomer) {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoad] = useState(!!idCustomer);
    const [error, setError] = useState(null);

    /* ---------- fetch único ---------- */
    const fetchCustomer = useCallback(async () => {
        if (!idCustomer) return;

        setLoad(true);
        const { data, error } = await supabase
            .from("customer")
            .select("*")
            .eq("id", idCustomer)
            .single();

        setCustomer(data);
        setError(error);
        setLoad(false);
        console.log(data)
    }, [idCustomer]);

    useEffect(() => { fetchCustomer(); }, [fetchCustomer]);

    /* ---------- ADD ---------- */
    const addCustomer = useCallback(async (fields) => {
        const payload = mapFieldsToSql(fields);
        const { error } = await supabase.from("customer").insert(payload);
        if (error) throw error;
    }, []);

    /* ---------- UPDATE ---------- */
    const updateCustomer = useCallback(async (fields) => {
        if (!idCustomer) throw new Error("idCustomer é obrigatório");

        const payload = mapFieldsToSql(fields);
        const { error } = await supabase
            .from("customer")
            .update(payload)
            .eq("id", idCustomer);

        if (error) throw error;
        await fetchCustomer();               // refresca cache local
    }, [idCustomer, fetchCustomer]);

    return {
        customer,
        loading,
        error,
        addCustomer,
        updateCustomer,
    };
}

/* ---- helper interno: JS → SQL ---- */
function mapFieldsToSql(f) {
    return {
        company_name: f.companyName.trim(),
        company_vat: f.companyVat.trim(),
        company_address: f.companyAddress.trim() || null,
        company_activity: f.companyActivity.trim() || null,
        company_website: f.companyWebsite.trim() || null,
        contact_name: f.contactName.trim(),
        contact_phone: f.contactPhone.trim(),
        contact_email: f.contactEmail.trim() || null,
        contract_start_date: f.contractStartDate,
        contract_end_date: f.contractEndDate,
        contract_points: f.contractPoints || null,
        contract_value: f.contractValue,
        contract_type: f.contractType,
        observations: f.observations?.trim() || null,
    };
}
