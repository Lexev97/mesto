class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    Array.isArray(this._itemsArray) 
    ? this._itemsArray.forEach((item) => {
      this._renderer(item);
    })
    : this._renderer(this._itemsArray)
  }
}

export default Section;
