import { join } from "path";
import { python } from "pythonia";
import type {
  CreateCaptionForImageArguments,
  CreateCaptionForImageOutput,
} from "./createCaptionForImage.types";

const filePath = join(
  process.cwd(),
  "source",
  "native-addon-python",
  "source",
  "utils",
  "get_image_caption",
  "get_image_caption.py",
);
const { get_image_caption: getImageCaption } = await python(filePath);

const createCaptionForImage = async ({
  path,
}: CreateCaptionForImageArguments): Promise<CreateCaptionForImageOutput> => {
  return { caption: getImageCaption(path) };
};

export default createCaptionForImage;
