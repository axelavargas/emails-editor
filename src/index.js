console.log('entro');
module.exports = class EmailsEditor {
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    const child = document.createElement('h3');
    child.innerText = 'Hola Mundo';
    this.container.appendChild(child);
  }
};
