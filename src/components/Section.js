class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards) {
    cards.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
