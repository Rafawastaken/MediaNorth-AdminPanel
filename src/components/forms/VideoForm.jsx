import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Tv2 } from "lucide-react";
import { toast } from "react-hot-toast";

import Loading from "../ui/Loading";
import { FormInputCol, FormInputRow } from "./ui/Input";
import FormSection from "./ui/FormSection";
import FormActions from "./ui/FormActions";

export default function VideoForm({
  initialValues = {},
  onSubmit,
  cancelPath = "#",
  submitLabel = "Guardar",
  customerId,
  devices = [],
}) {
  /* ---------- vídeo ---------- */
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoStatus, setVideoStatus] = useState("active");

  /* ---------- TVs ------------ */
  const [deviceSearch, setDeviceSearch] = useState("");
  const [deviceIds, setDeviceIds] = useState([]); // vários IDs

  /* ---------- meta ----------- */
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* preencher se for edição */
  useEffect(() => {
    setVideoUrl(initialValues.videoUrl ?? "");
    setVideoTitle(initialValues.videoTitle ?? "");
    setVideoDescription(initialValues.videoDescription ?? "");
    setVideoDuration(initialValues.videoDuration ?? "");
    setVideoStatus(initialValues.videoStatus ?? "active");
    setDeviceIds(
      Array.isArray(initialValues.deviceIds)
        ? initialValues.deviceIds.map(String)
        : initialValues.deviceIds
        ? [String(initialValues.deviceIds)]
        : []
    );
  }, [initialValues]);

  /* filtra TVs */
  const filteredDevices = useMemo(() => {
    const t = deviceSearch.trim().toLowerCase();
    return t
      ? devices.filter((d) =>
          [d.name, d.location].some((v) => v?.toLowerCase().includes(t))
        )
      : devices;
  }, [devices, deviceSearch]);

  /* select → estado */
  const handleSelect = (e) => {
    const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
    setDeviceIds(opts);
  };

  /* submit */
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
        deviceIds,
      });
      navigate(cancelPath);
    } catch (err) {
      toast.error(`Erro ao guardar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="A guardar vídeo…" full />;

  /* ------------- UI ------------- */
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
      {/* ------ dados do vídeo ------ */}
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
          label="Duração * (seg)"
          placeholder="30"
          className="mt-2"
          required
        />

        <div className="mt-3 flex flex-col gap-1">
          <label className="text-sm font-medium">Estado do Vídeo *</label>
          <select
            value={videoStatus}
            onChange={(e) => setVideoStatus(e.target.value)}
            className="rounded-md border border-gray-200 px-2 py-2 text-sm"
            required
          >
            <option value="" disabled hidden>
              -- selecione --
            </option>
            <option value="active">Ativo</option>
            <option value="paused">Pausado</option>
            <option value="deactive">Desativo</option>
          </select>
        </div>
      </FormSection>

      {/* ------ TVs ------ */}
      <FormSection icon={Tv2} title="Escolher Televisões">
        <FormInputRow
          className="mt-3"
          value={deviceSearch}
          onChange={setDeviceSearch}
          label="Procurar TV"
          placeholder="Filtrar por nome ou localização…"
        />

        <label className="mt-3 flex flex-col text-sm">
          <span className="mb-1 font-medium">
            Televisões * (Ctrl/Cmd-click para várias)
          </span>

          <select
            multiple
            size={5}
            value={deviceIds}
            onChange={handleSelect}
            className="h-full rounded-md border border-gray-200 px-3 py-2"
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
}
