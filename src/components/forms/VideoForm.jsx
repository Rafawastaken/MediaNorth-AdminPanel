// src/components/forms/VideoForm.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Tv2 } from "lucide-react";
import { toast } from "react-hot-toast";

import Loading from "../ui/Loading";
import { FormInputCol, FormInputRow } from "./ui/Input";
import FormSection from "./ui/FormSection";
import FormActions from "./ui/FormActions";

const VideoForm = ({
  initialValues = {},
  onSubmit,
  cancelPath = "#",
  submitLabel = "Guardar",
  customerId,
  devices = [], // TVs ativas vindas do pai
}) => {
  /* ---------- Vídeo ---------- */
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoStatus, setVideoStatus] = useState("");

  /* ---------- TVs ------------ */
  const [deviceSearch, setDeviceSearch] = useState("");
  const [deviceIds, setDeviceIds] = useState([]); // MÚLTIPLOS IDs

  /* ---------- meta ----------- */
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* preencher em modo de edição */
  useEffect(() => {
    setVideoUrl(initialValues.videoUrl ?? "");
    setVideoTitle(initialValues.videoTitle ?? "");
    setVideoDescription(initialValues.videoDescription ?? "");
    setVideoDuration(initialValues.videoDuration ?? "");
    setDeviceIds(
      initialValues.device_ids // espera array
        ? Array.isArray(initialValues.device_ids)
          ? initialValues.device_ids.map(String)
          : [String(initialValues.device_ids)]
        : []
    );
  }, [initialValues?.id]);

  /* TVs filtradas pelo termo de pesquisa */
  const filteredDevices = useMemo(() => {
    const t = deviceSearch.trim().toLowerCase();
    return t
      ? devices.filter((d) =>
          [d.name, d.location].some((v) => v?.toLowerCase().includes(t))
        )
      : devices;
  }, [devices, deviceSearch]);

  /* select ⇢ estado */
  const handleSelect = (e) => {
    const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
    setDeviceIds(opts);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !videoUrl ||
      !videoTitle ||
      !videoDescription ||
      !videoDuration ||
      deviceIds.length === 0
    ) {
      toast.error("Preenche todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        videoUrl,
        videoTitle,
        videoDescription,
        videoDuration,
        videoStatus,
        deviceIds, // envia array de TVs
      });
      navigate(`/customers/${customerId}`);
    } catch (error) {
      toast.error(`Erro ao guardar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="A guardar vídeo…" full />;

  /* ---------------- UI ---------------- */
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-5">
      {/* Dados do vídeo */}
      <FormSection icon={Video} title="Dados do Vídeo">
        <div className="mt-3 flex gap-3">
          <FormInputCol
            value={videoUrl}
            onChange={setVideoUrl}
            label="URL do Vídeo *"
            placeholder="https://youtube.com/watch?v=123"
            required
          />
          <FormInputCol
            value={videoTitle}
            onChange={setVideoTitle}
            label="Título do Vídeo *"
            placeholder="Título"
            required
          />
        </div>

        <FormInputRow
          value={videoDescription}
          onChange={setVideoDescription}
          label="Descrição do Vídeo *"
          placeholder="Descrição detalhada"
          className="mt-2"
          required
        />

        <FormInputRow
          value={videoDuration}
          onChange={setVideoDuration}
          label="Duração *"
          placeholder="30"
          className="mt-2"
          required
        />

        <div className={"flex flex-col mt-3 items-start gap-1 flex-1"}>
          <label htmlFor="siteType" className="text-sm font-medium">
            Estado do Video *
          </label>
          <select
            id="videoStatus"
            onChange={(e) => setVideoStatus(e.target.value)}
            className="text-sm font-normal border-1 border-gray-200 w-full px-2 py-2 rounded-md"
            value={videoStatus}
            required
          >
            <option value="active" selected>
              Ativo
            </option>
            <option value="paused">Pausado</option>
            <option value="deactive">Desativo</option>
          </select>
        </div>
      </FormSection>

      {/* TVs */}
      <FormSection icon={Tv2} title="Escolher Televisões">
        <div className="mt-3">
          <FormInputCol
            value={deviceSearch}
            onChange={setDeviceSearch}
            label="Procurar TV"
            placeholder="Filtrar por nome ou localização…"
          />
        </div>

        <label className="mt-3 flex flex-col text-sm flex-1">
          <span className="mb-1 font-medium">
            Televisões * (Ctrl/Cmd-click para várias)
          </span>

          <select
            multiple
            size={5}
            value={deviceIds}
            onChange={handleSelect}
            className="h-full rounded-md border-1 border-gray-200 px-3 py-2"
          >
            {filteredDevices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.location}
              </option>
            ))}

            {!filteredDevices.length && (
              <option disabled>(sem resultados)</option>
            )}
          </select>
        </label>
      </FormSection>

      <FormActions
        cancelPath={cancelPath}
        submitLabel={submitLabel}
        cancelLabel="Cancelar"
      />
    </form>
  );
};

export default VideoForm;
