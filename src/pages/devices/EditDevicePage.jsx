import { useParams } from "react-router-dom";
import { useSiteDetailsWithId } from "../../hooks/useSiteDetailsWithId";

import DeviceForm from "../../components/forms/DeviceForm";
import Loading from "../../components/ui/Loading";
import { HeadingStandardBack } from "../../components/ui/Headings";
import { pickDevice } from "../../helpers/pickDevice"; // se quiseres num ficheiro
import { useDevice } from "../../hooks/useDevice";

const EditDevicePage = () => {
  const { idSite, idDevice } = useParams();
  const { site, devices, loading, error } = useSiteDetailsWithId(idSite);
  const { updateDevice } = useDevice(idDevice);

  if (loading) return <Loading full />;
  if (error) return <p className="p-4 text-red-600">Erro: {error.message}</p>;

  /* procura o device no array já carregado */
  const device = pickDevice(devices, idDevice);
  if (!device) return <p className="p-4">Dispositivo não encontrado.</p>;

  return (
    <div className="mx-auto max-w-6xl">
      <HeadingStandardBack
        title="Editar Dispositivo"
        subtitle={`Dispositivo em ${site.name}`}
        backPath={`/sites/${idSite}/devices`}
      />

      <DeviceForm
        initialValues={device}
        onSubmit={(fields) => updateDevice({ id: idDevice, ...fields })}
        cancelPath={`/sites/${idSite}/devices`}
        submitLabel="Guardar alterações"
      />
    </div>
  );
};

export default EditDevicePage;
