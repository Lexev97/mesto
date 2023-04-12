import Popup from "./Popup.js";
import { fullSizeImage, fullSizeImageCaption } from "../utils/constants";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector(fullSizeImage);
    this._caption = this._popupSelector.querySelector(fullSizeImageCaption);
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;

    super.open();
  }
}

export default PopupWithImage;
