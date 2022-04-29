export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  render() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}