// src/hooks/useDevice.js
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../libs/supabase";
import bcrypt from "bcryptjs";

/**
 * Hook para ler e atualizar um dispositivo.
 *
 * @param {number|string} idDevice – ID do dispositivo
 */
export function useDevice(idDevice) {
    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(!!idDevice);
    const [error, setError] = useState(null);

    /** Fetch único do dispositivo */
    const fetchDevice = useCallback(async () => {
        if (!idDevice) return;

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

    useEffect(() => {
        fetchDevice();
    }, [fetchDevice]);

    /**
     * Atualiza o dispositivo mapeando:
     * - deviceActive → active
     * - password → password_hash (hash no client, se fornecida)
     *
     * @param {object} fields
     * @param {string} fields.login
     * @param {string|undefined} fields.password
     * @param {string} fields.name
     * @param {string} fields.resolution
     * @param {string} fields.location
     * @param {boolean} fields.deviceActive
     * @param {string} fields.schedule
     * @returns {number|string}  o próprio idDevice
     */
    const updateDevice = useCallback(
        async (fields) => {
            const {
                login,
                password,
                name,
                resolution,
                location,
                deviceActive,
                schedule,
            } = fields;

            // Monta payload inicial
            const payload = {
                login,
                name,
                resolution: resolution || null,
                location,
                schedule: schedule || null,
                active: deviceActive,
            };

            // Se mudou a password, faz hash e inclui no payload
            if (password) {
                payload.password_hash = await bcrypt.hash(password, 10);
            }

            const { error } = await supabase
                .from("device")
                .update(payload)
                .eq("id", idDevice);

            if (error) throw error;

            // Atualiza o cache local
            await fetchDevice();

            return idDevice;
        },
        [idDevice, fetchDevice]
    );

    return {
        device,
        loading,
        error,
        updateDevice,
    };
}
