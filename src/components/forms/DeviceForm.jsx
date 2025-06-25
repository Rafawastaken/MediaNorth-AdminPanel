// src/components/forms/DeviceForm.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, UserRoundPen, Save, Clock } from "lucide-react";
import { toast } from "react-hot-toast";

import { FormInputCol, FormInputRow } from "./ui/Input";
import SchedulePicker from "./ui/SchedulePicker";
import Loading from "../ui/Loading";

export default function DeviceForm({
  initialValues = {}, // {} = criar · {…} = editar
  onSubmit, // (fields) => Promise
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
    setPassword(""); // nunca carregamos hashes no input
  }, [initialValues]);

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
      <section className="rounded-lg bg-gray-50 p-4 shadow-sm ring-1 ring-slate-200">
        <header className="flex items-center gap-2">
          <Lock />
          <h2 className="text-xl font-semibold">Dados de Acesso</h2>
        </header>

        <div className="mt-2 flex gap-3">
          <FormInputCol
            value={login}
            onChange={setLogin}
            label="Login do Dispositivo *"
            placeholder="Login do dispositivo"
            required
          />

          <FormInputCol
            value={password}
            onChange={setPassword}
            label={
              initialValues.id ? "Nova Password" : "Password do Dispositivo *"
            }
            placeholder="Password do dispositivo"
            type="password"
            required={!initialValues.id} /* obrigatória só em criação */
          />
        </div>
      </section>

      {/* Dados básicos */}
      <section className="rounded-lg bg-gray-50 p-4 shadow-sm ring-1 ring-slate-200">
        <header className="flex items-center gap-2">
          <UserRoundPen />
          <h2 className="text-xl font-semibold">Dados Básicos</h2>
        </header>

        <FormInputRow
          value={name}
          onChange={setName}
          label="Nome do Dispositivo *"
          placeholder="Nome do dispositivo"
          required
        />

        <FormInputRow
          value={location}
          onChange={setLocation}
          label="Localização do Artigo *"
          placeholder="Localização do artigo"
          required
        />

        <FormInputRow
          value={resolution}
          onChange={setResolution}
          label="Resolução de TV"
          placeholder="Resolução de TV"
        />
      </section>

      {/* Horário */}
      <section className="rounded-lg bg-gray-50 p-4 shadow-sm ring-1 ring-slate-200">
        <header className="flex items-center gap-2">
          <Clock />
          <h2 className="text-xl font-semibold">Horário de Reprodução</h2>
        </header>

        <SchedulePicker value={schedule} onChange={setSchedule} />
      </section>

      {/* Botões */}
      <div className="flex justify-end gap-2">
        <Link
          to={cancelPath}
          className="rounded-md bg-gray-200 px-4 py-3 font-semibold text-slate-600 hover:bg-gray-300"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Save size={16} /> {submitLabel}
        </button>
      </div>
    </form>
  );
}
