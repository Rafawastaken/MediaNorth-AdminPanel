import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, UserRoundPen, Save, Clock } from "lucide-react";

import { FormInputCol, FormInputRow } from "./ui/Input";
import Loading from "../ui/Loading";
import SchedulePicker from "./ui/SchedulePicker";

import { useSiteDetailsWithId } from "../../hooks/useSiteDetailsWithId";

const AddDeviceSiteForm = ({ idSite }) => {
  const { addDevice } = useSiteDetailsWithId(idSite);
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [resolution, setResolution] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !password || !name || !location) {
      toast.error("Preenche todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      await addDevice({
        login,
        password,
        name,
        resolution,
        location,
        scheduleObj: schedule,
      });

      toast.success("Dispositivo adicionado com sucesso!");
      navigate(`/sites/${idSite}/devices`);
    } catch (err) {
      toast.error(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="A guardar dispositivo…" full />;

  return (
    <form className={"flex flex-col gap-5 mt-5 w-full"} onSubmit={handleSubmit}>
      {/* Dados de acesso */}
      <div
        className={
          "px-3 py-4 shadow-sm rounded-lg flex flex-col gap-4 bg-gray-50 w-full ring-1 ring-slate-200"
        }
      >
        <div className="flex items-center gap-2 ">
          <Lock />
          <h1 className={"text-xl font-semibold"}>Dados de Acesso</h1>
        </div>
        <div className="flex w-full gap-3 mt-2">
          <FormInputCol
            value={login}
            onChange={setLogin}
            label={"Login do Dispositivo *"}
            placeholder={"Login do dispositivo"}
            required={true}
          />
          <FormInputCol
            value={password}
            onChange={setPassword}
            label={"Password do Dispositivo *"}
            placeholder={"Password do dispositivo"}
            required={true}
            type={"password"}
          />
        </div>
      </div>
      {/* Dados básicos */}
      <div
        className={
          "px-3 py-4 shadow-sm rounded-lg flex flex-col gap-4 bg-gray-50 w-full ring-1 ring-slate-200"
        }
      >
        <div className="flex items-center gap-2 ">
          <UserRoundPen />
          <h1 className={"text-xl font-semibold"}>Dados Básicos</h1>
        </div>
        <FormInputRow
          value={name}
          onChange={setName}
          label={"Nome do Dispositivo *"}
          placeholder={"Nome do dispositivo"}
          required={true}
        />
        <FormInputRow
          value={location}
          onChange={setLocation}
          label={"Localização do Artigo *"}
          placeholder={"Localização do artigo"}
          required={true}
        />
        <FormInputRow
          value={resolution}
          onChange={setResolution}
          label={"Resolução de TV"}
          placeholder={"Resolução de TV"}
          required={false}
        />
      </div>

      <div
        className={
          "px-3 py-4 shadow-sm rounded-lg flex flex-col gap-4 bg-gray-50 w-full ring-1 ring-slate-200"
        }
      >
        <div className="flex items-center gap-2 ">
          <Clock />
          <h1 className={"text-xl font-semibold"}>Horário de Reprodução</h1>
        </div>
        <SchedulePicker value={schedule} onChange={setSchedule} />
      </div>
      {/* BTNS */}
      <div className="flex flex-row items-end justify-end gap-2">
        <Link
          to={"#"}
          className="flex px-4 py-3 bg-gray-200 text-slate-600 items-center gap-2 rounded-md font-semibold hover:bg-gray-300 transition-all duration-300 cursor-pointer"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="flex px-4 py-3 bg-blue-600 text-white items-center gap-2 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer "
        >
          <Save size={16} />
          Adicionar Local
        </button>
      </div>
    </form>
  );
};

export default AddDeviceSiteForm;
