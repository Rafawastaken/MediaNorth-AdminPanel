// src/components/forms/DeviceForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Tv2, Clock } from "lucide-react";
import { toast } from "react-hot-toast";

import { FormInputCol, FormInputRow } from "./ui/Input";
import FormSection from "./ui/FormSection";
import FormActions from "./ui/FormActions";
import SchedulePicker from "./ui/SchedulePicker";
import Loading from "../ui/Loading";
import { logEvent } from "../../services/logEvent"; // ★ NEW

export default function DeviceForm({
  initialValues = {}, // {} → criar · {…} → editar
  onSubmit, // (payload) => Promise<deviceId>
  cancelPath = "#",
  submitLabel = "Guardar",
}) {
  /* ────────── estado ────────── */
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [resolution, setResolution] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(false);
  const [deviceActive, setDeviceActive] = useState("active"); // estado do dispositivo

  const navigate = useNavigate();

  /* preencher ao entrar em edição */
  useEffect(() => {
    setLogin(initialValues.login ?? "");
    setName(initialValues.name ?? "");
    setResolution(initialValues.resolution ?? "");
    setLocation(initialValues.location ?? "");
    setDeviceActive(
      initialValues.hasOwnProperty("active")
        ? initialValues.active
          ? "active"
          : "deactive"
        : "active"
    );
    setSchedule(
      initialValues.schedule
        ? typeof initialValues.schedule === "string"
          ? JSON.parse(initialValues.schedule)
          : initialValues.schedule
        : {}
    );
    setPassword(""); // nunca preenchemos hashes
  }, [initialValues?.id]);

  /* ────────── SUBMIT ────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || (!initialValues.id && !password) || !name || !location) {
      toast.error("Preenche todos os campos obrigatórios.");
      return;
    }

    const creating = !initialValues.id;

    try {
      setLoading(true);

      /* envia dados → espera o id (novo ou o mesmo) */
      const deviceId = await onSubmit({
        login,
        password: password || undefined, // só envia se mudou
        name,
        resolution,
        location,
        deviceActive: deviceActive == "active", // converte de string para boolean
        schedule: JSON.stringify(schedule),
      });

      /* -------------- LOG -------------- */
      await logEvent({
        type: creating ? "device_created" : "device_updated",
        summary: `${creating ? "Criado" : "Actualizado"} dispositivo “${name}”`,
        details: { login, name, resolution, location, schedule },
        context: { device_id: deviceId },
      });

      toast.success(
        creating
          ? "Dispositivo criado com sucesso"
          : "Dispositivo atualizado com sucesso"
      );
      navigate(cancelPath);
    } catch (err) {
      toast.error(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="A guardar dispositivo…" full />;

  /* ────────── UI ────────── */
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-5">
      {/* Dados de acesso */}
      <FormSection icon={Lock} title="Dados de Acesso">
        <div className="mt-2 flex gap-3">
          <FormInputCol
            value={login}
            onChange={setLogin}
            label="Login do Dispositivo *"
            placeholder="umbra-device-007"
            required
          />

          <FormInputCol
            value={password}
            onChange={setPassword}
            label={
              initialValues.id ? "Nova Password" : "Password do Dispositivo *"
            }
            placeholder="T-Virus@2025!"
            type="password"
            required={!initialValues.id}
          />
        </div>
      </FormSection>

      {/* Dados do dispositivo */}
      <FormSection icon={Tv2} title="Dados do Dispositivo">
        <FormInputRow
          value={name}
          onChange={setName}
          label="Nome do Dispositivo *"
          placeholder="Painel Hall Entrada"
          className={"mt-3"}
          required
        />

        <FormInputRow
          value={location}
          onChange={setLocation}
          label="Localização *"
          placeholder="Entrada principal"
          className={"mt-3"}
          required
        />

        <FormInputRow
          value={resolution}
          onChange={setResolution}
          label="Resolução"
          placeholder="3840x2160 (4K UHD)"
          className={"mt-3"}
        />

        <div className="mt-3 flex flex-col gap-1">
          <label className="text-sm font-medium">Dispositivo Ativo *</label>
          <select
            value={deviceActive}
            onChange={(e) => setDeviceActive(e.target.value)}
            className="rounded-md border border-gray-200 px-2 py-2 text-sm"
            required
          >
            <option value="active" selected>
              Ativo
            </option>
            <option value="deactive">Desativo</option>
          </select>
        </div>
      </FormSection>

      {/* Horário */}
      <FormSection icon={Clock} title="Horário de Reprodução">
        <SchedulePicker value={schedule} onChange={setSchedule} />
      </FormSection>

      <FormActions
        cancelPath={cancelPath}
        submitLabel={submitLabel}
        cancelLabel="Cancelar"
      />
    </form>
  );
}
