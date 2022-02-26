import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PostService from "src/api/services/post-services";
import UploadForm from "../Upload/UploadForm";

export default function Edit() {
  const { id } = useParams();
  const { data, isLoading } = useQuery("Post", () => {
    if (id) {
      return PostService.getPost(+id);
    }
  });

  if (data) return <UploadForm isEditMode={true} imageData={data} />;

  return <div>loading</div>;
}
