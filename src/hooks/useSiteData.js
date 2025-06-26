// src/hooks/useSiteData.js
import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

export function useSiteData() {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("site")
                .select("active, created_at");
            if (error) setError(error);
            else setSites(data);
            setLoading(false);
        })();
    }, []);

    return { sites, loading, error };
}
