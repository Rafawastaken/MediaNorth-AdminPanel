import VideoListItem from "./ui/VideoListItem";

const VideosTable = ({ videos = [] }) => {
  return (
    <div className="mt-3 rounded-md bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold">Vídeos Publicitários</h2>

      <div className="mt-4 flex flex-col gap-4">
        {videos.allVideos.length ? (
          videos.allVideos.map((v) => <VideoListItem key={v.id} video={v} />)
        ) : (
          <p className="py-10 text-center text-sm text-slate-500">
            (Nenhum vídeo para mostrar)
          </p>
        )}
      </div>
    </div>
  );
};

export default VideosTable;
