import { imagga } from "..";
import { TagDTO } from "../dto/tag";

const generateTags = async (imageUrl: string) => {
  if (imageUrl.length === 0) return [];
  const params = {
    image_url: imageUrl
  };

  return imagga
    .get("", {
      params
    })
    .then((res: any) => {
      const tags: TagDTO[] = res.data.result.tags
        .filter((tag: any) => tag.confidence > 40)
        .map((tag: any) => ({ value: tag.tag.en, label: tag.tag.en }));

      return tags;
    });
};
const ImaggaService = {
  generateTags
};

export default ImaggaService;
