// src/hooks/useLogs.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../libs/supabase";

export function useLogs(limit = 50) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("log_event")
            .select(`
        id,
        event_type,
        summary,
        details,
        user_id,
        device_id,
        ip_address,
        user_agent,
        created_at
      `)
            .order("created_at", { ascending: false })
            .limit(limit);

        if (error) {
            setError(error);
        } else {
            setLogs(data);
        }
        setLoading(false);
    }, [limit]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return { logs, loading, error, refetch: fetchLogs };
}
