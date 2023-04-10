import Popup from "./Popup.js";
import { fullSizeImage, fullSizeImageCaption } from "../utils/constants";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    const image = this._popupSelector.querySelector(fullSizeImage);
    const caption = this._popupSelector.querySelector(fullSizeImageCaption);
    image.src = data.link;
    image.alt = data.name;
    caption.textContent = data.name;

    super.open();
  }
}

export default PopupWithImage;
