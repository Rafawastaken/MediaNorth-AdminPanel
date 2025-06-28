// src/components/forms/DeviceForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Tv2, Clock, Save } from "lucide-react";
import { toast } from "react-hot-toast";

import { FormInputCol, FormInputRow } from "./ui/Input";
import FormSection from "./ui/FormSection";
import FormActions from "./ui/FormActions";
import SchedulePicker from "./ui/SchedulePicker";
import Loading from "../ui/Loading";

export default function DeviceForm({
  initialValues = {},
  onSubmit,
  cancelPath = "#",
  submitLabel = "Guardar",
}) {
  /* ─────────── state controlado ─────────── */
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [resolution, setResolution] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* preencher quando mudam os initialValues (ex.: edição) */
  useEffect(() => {
    setLogin(initialValues.login ?? "");
    setName(initialValues.name ?? "");
    setResolution(initialValues.resolution ?? "");
    setLocation(initialValues.location ?? "");
    setSchedule(
      initialValues.schedule
        ? typeof initialValues.schedule === "string"
          ? JSON.parse(initialValues.schedule)
          : initialValues.schedule
        : {}
    );
    setPassword("");
  }, [initialValues?.id]);

  /* ─────────── submit ─────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || (!initialValues.id && !password) || !name || !location) {
      toast.error("Preenche todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        login,
        password: password || undefined, // só envia se mudou / criou
        name,
        resolution,
        location,
        schedule: JSON.stringify(schedule),
      });
      toast.success("Device atualizado com sucesso");
      navigate(cancelPath);
    } catch (err) {
      toast.error(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="A guardar dispositivo…" full />;

  /* ─────────── UI ─────────── */
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-5">
      {/* Dados de acesso */}
      <FormSection icon={Lock} title={"Dados de Acesso"}>
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
            required={!initialValues.id} /* obrigatória só em criação */
          />
        </div>
      </FormSection>

      {/* Dados dispositivo */}
      <FormSection
        icon={Tv2}
        title={"Dados do Dispositivo"}
        className="flex flex-col gap-3"
      >
        <FormInputRow
          value={name}
          onChange={setName}
          label="Nome do Dispositivo *"
          placeholder="Painel de Controlo - Câmara Subterrânea 3"
          required
        />

        <FormInputRow
          value={location}
          onChange={setLocation}
          label="Localização do Artigo *"
          placeholder="Instalação Umbrella – Complexo Subterrâneo, Zona Oeste"
          required
        />

        <FormInputRow
          value={resolution}
          onChange={setResolution}
          label="Resolução de TV"
          placeholder="3840x2160 (4K UHD)"
        />
      </FormSection>

      {/* Horário */}
      <FormSection icon={Clock} title={"Horário de Reprodução"}>
        <SchedulePicker value={schedule} onChange={setSchedule} />
      </FormSection>

      <FormActions
        cancelPath={cancelPath}
        submitLabel={submitLabel}
        cancelLabel={"Cancelar"}
      />
    </form>
  );
}
