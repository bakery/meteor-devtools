var assign = require('object-assign');

class MultiOverlay {
  constructor(window) {
    this.win = window;
    var doc = window.document;
    this.container = doc.createElement('div');
    doc.body.appendChild(this.container);
  }

  highlightMany(nodes) {
    this.container.innerHTML = '';
    nodes.forEach(node => {
      var div = this.win.document.createElement('div');
      var box = node.getBoundingClientRect();
      assign(div.style, {
        top: box.top + 'px',
        left: box.left + 'px',
        width: box.width + 'px',
        height: box.height + 'px',
        border: '2px dotted rgba(200, 100, 100, .8)',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(200, 100, 100, .2)',
        position: 'fixed',
        zIndex: 10000000,
        pointerEvents: 'none',
      });
      this.container.appendChild(div);
    });
  }

  remove() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

module.exports = MultiOverlay;