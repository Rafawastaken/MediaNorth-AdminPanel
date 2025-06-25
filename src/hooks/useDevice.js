// src/hooks/useDevice.js
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../libs/supabase";
import bcrypt from "bcryptjs";

export function useDevice(idDevice) {
    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDevice = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("device")
            .select("*")
            .eq("id", idDevice)
            .single();
        setDevice(data);
        setError(error);
        setLoading(false);
    }, [idDevice]);

    useEffect(() => { fetchDevice(); }, [fetchDevice]);

    /* update */
    const updateDevice = useCallback(
        async (payload) => {
            // Se mudar password, hash no cliente
            if (payload.password) {
                payload.password_hash = await bcrypt.hash(payload.password, 10);
                delete payload.password;
            }
            const { error } = await supabase
                .from("device")
                .update(payload)
                .eq("id", idDevice);
            if (error) throw error;
            await fetchDevice();           // refresca cache local
        },
        [idDevice, fetchDevice]
    );

    return { device, loading, error, updateDevice };
}
