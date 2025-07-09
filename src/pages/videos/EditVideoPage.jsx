// src/pages/videos/EditVideoPage.jsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { HeadingStandardBack } from "../../components/ui/Headings";
import Loading from "../../components/ui/Loading";
import VideoForm from "../../components/forms/VideoForm";

import { useActiveDevices } from "../../hooks/useActiveDevices";
import { useVideo } from "../../hooks/useVideo";

export default function EditVideoPage() {
  /* -------- params / navigation -------- */
  const { idCustomer, idVideo } = useParams();
  const navigate = useNavigate();

  /* -------- hooks (MUST stay at top!) -- */
  const { devices, loading: devLoad, error: devErr } = useActiveDevices();
  const {
    video,
    loading: vidLoad,
    error: vidErr,
    updateVideo,
  } = useVideo(idVideo);

  /* -------- side-effects for errors ----- */
  useEffect(() => {
    if (devErr) toast.error(`Erro: ${devErr.message}`);
    if (vidErr) toast.error(`Erro: ${vidErr.message}`);
  }, [devErr, vidErr]);

  /* -------- loading / fatal error gates - */
  if (devLoad || vidLoad) return <Loading message="A carregar dados…" full />;
  if (devErr || vidErr) return null; // já mostrámos toast no useEffect

  /* -------- submit handler -------------- */
  const handleSave = async (fields) => {
    try {
      await updateVideo(fields);
      toast.success("Vídeo actualizado com sucesso");
      navigate(`/customers/${idCustomer}`);
    } catch (err) {
      toast.error(`Erro ao actualizar: ${err.message}`);
      throw err; // permite feedback no VideoForm
    }
  };

  /* -------- UI -------------------------- */
  return (
    <div className="mx-auto max-w-6xl">
      <HeadingStandardBack
        title="Editar Vídeo"
        subtitle="Actualizar informações do vídeo"
        cancelPath={`/customers/${idCustomer}`}
      />

      <VideoForm
        initialValues={{
          id: video.id,
          videoUrl: video.video_url,
          videoTitle: video.video_title,
          videoDescription: video.video_description,
          videoDuration: video.video_duration,
          videoStatus: video.video_status,
          deviceIds: video.device_video.map((l) => l.device_id),
        }}
        customerId={idCustomer}
        devices={devices}
        onSubmit={handleSave}
        cancelPath={`/customers/${idCustomer}`}
        submitLabel="Guardar"
      />
    </div>
  );
}
