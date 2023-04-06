import torch
from lavis.models import load_model_and_preprocess
from PIL import Image

def get_image_caption(path: str) -> str:
  raw_image = Image.open(path).convert("RGB")
  device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
  model, vis_processors, _ = load_model_and_preprocess(name="blip2_t5", model_type="caption_coco_flant5xl", is_eval=True, device=device)
  image = vis_processors["eval"](raw_image).unsqueeze(0).to(device)
  return model.generate({"image": image})[0]