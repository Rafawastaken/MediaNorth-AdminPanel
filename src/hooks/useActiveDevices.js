// src/hooks/useActiveDevices.js
import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

export function useActiveDevices() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("device")
                .select("*")            // ou "id, name, last_seen" se quiseres só algumas
                .eq("active", true);    // ← se for VARCHAR usa "true"

            if (error) {
                setError(error);
                setDevices([]);
            } else {
                setDevices(data);
            }
            setLoading(false);
        })();
    }, []);

    return { devices, loading, error };
}
