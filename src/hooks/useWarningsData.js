import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";
import { isDeviceOnline } from "../helpers/deviceStatus";
import { computeTvAdLoad } from "../helpers/computeTvAdLoad";
import { computeContractActive } from "../helpers/computeContractActive";
import { differenceInCalendarDays, parseISO } from "date-fns";

export function useWarningsData() {
    const [data, setData] = useState({
        tvsOffline: [],
        adLoad: { many: 0, balanced: 0, few: 0 },
        contractsEnding: [],                       // ➊ NEW
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);

            /* ---------- 1) TVs offline --------------------------------- */
            const { data: dev, error: errDev } = await supabase
                .from("device")
                .select("id, name, location, last_seen");

            if (errDev) { setError(errDev); setLoading(false); return; }

            const tvsOffline = dev.filter(d => !isDeviceOnline(d.last_seen));

            /* ---------- 2) Carga de anúncios por TV --------------------- */
            const { data: dv, error: errDv } = await supabase
                .from("device_video")
                .select("device_id");

            if (errDv) { setError(errDv); setLoading(false); return; }

            const { manyAds, balancedAds, fewAds } = computeTvAdLoad(dv);

            /* ---------- 3) Contratos a terminar ------------------------- */
            const { data: cust, error: errCust } = await supabase
                .from("customer")
                .select("id, company_name, contract_end_date");

            if (errCust) { setError(errCust); setLoading(false); return; }

            const today = new Date();
            const contractsEnding = cust                                   // ➊
                .filter(c => !!c.contract_end_date)                          // só quem tem data
                .map(c => ({
                    ...c,
                    daysLeft: differenceInCalendarDays(
                        parseISO(c.contract_end_date),
                        today,
                    ),
                    active: computeContractActive(c.contract_end_date),
                }))
                .filter(c => c.daysLeft <= 30)                               // ⩽ 30 dias
                .sort((a, b) => a.daysLeft - b.daysLeft)                     // mais urgente 1.º
                .slice(0, 3);                                                // máximo 3 linhas

            setData({
                tvsOffline,
                adLoad: {
                    many: manyAds.length,
                    balanced: balancedAds.length,
                    few: fewAds.length,
                },
                contractsEnding,                                             // ➊
            });
            setLoading(false);
        })();
    }, []);

    return { ...data, loading, error };
}
