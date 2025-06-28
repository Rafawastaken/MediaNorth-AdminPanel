// src/hooks/useSiteWithDevices.js
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../libs/supabase";
import bcrypt from "bcryptjs";

export function useSiteDetailsWithId(idSite) {
  const [site, setSite] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ────────── fetch (já existente) ────────── */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("site")
      .select(`
        *,
        device:device (
          *,
          playlist:device_video (
            play_order,
            customer_video (
              id,
              video_url,
              customer!inner ( id, company_name )
            )
          )
        )
      `)
      .eq("id", idSite)
      .single();

    if (error) { setError(error); setLoading(false); return; }

    const devicesWithPlaylist = (data.device ?? []).map((d) => ({
      ...d,
      playlist: (d.playlist ?? [])
        .sort((a, b) => a.play_order - b.play_order)
        .map((dv) => ({
          order: dv.play_order,
          video: dv.customer_video.video_url,
          customer: dv.customer_video.customer,
        })),
    }));

    setSite({ ...data, device: undefined });
    setDevices(devicesWithPlaylist);
    setLoading(false);
    console.log(data)
  }, [idSite]);

  useEffect(() => { if (idSite) fetchData(); }, [idSite, fetchData]);

  /* ────────── NEW: addDevice ────────── */
  const addDevice = useCallback(
    async ({
      login,
      password,
      name,
      resolution,
      location,
      scheduleObj,      // já em objecto JS
    }) => {
      // hash da password no client
      const password_hash = await bcrypt.hash(password, 10);

      const payload = {
        login,
        password_hash,
        name,
        resolution: resolution || null,
        location,
        site_id: idSite,
        schedule: JSON.stringify(scheduleObj),
      };

      const { error } = await supabase.from("device").insert(payload);
      if (error) throw error;

      // refresca cache local para incluir a nova TV
      await fetchData();
    },
    [idSite, fetchData]
  );

  return { site, devices, loading, error, addDevice, refetch: fetchData };
}
