import torch
from lavis.models import load_model_and_preprocess
from PIL import Image
raw_image = Image.open("example.png").convert("RGB")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model, vis_processors, _ = load_model_and_preprocess(name="blip_caption", model_type="base_coco", is_eval=True, device=device)
image = vis_processors["eval"](raw_image).unsqueeze(0).to(device)
model.generate({"image": image})

def example():
  print("hello world")