import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useActiveDevices } from "../../hooks/useActiveDevices";
import { saveVideo } from "../../services/video";

import { HeadingStandardBack } from "../../components/ui/Headings";
import VideoForm from "../../components/forms/VideoForm";
import Loading from "../../components/ui/Loading";

export default function AddVideoPage() {
  const { idCustomer } = useParams();
  const { devices, loading, error } = useActiveDevices();

  if (loading) return <Loading message="A carregar dados…" full />;

  const addVideo = async (fields) => {
    try {
      await saveVideo(Number(idCustomer), fields);
      toast.success("Vídeo guardado e atribuído às TVs!");
    } catch (err) {
      toast.error(`Erro: ${err.message}`);
      throw err; // caso queiras deixar o formulário em loading
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <HeadingStandardBack
        title="Adicionar Novo Vídeo"
        subtitle="Preencha as informações do novo vídeo"
        path={`/customers/${idCustomer}`}
      />
      <VideoForm
        customerId={idCustomer}
        onSubmit={addVideo}
        cancelPath={`/customers/${idCustomer}`}
        devices={devices}
      />
    </div>
  );
}
