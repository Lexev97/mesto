class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards, userId) {
    cards.forEach((item) => {
      this._renderer(item, userId);
    });
  }
}

export default Section;
