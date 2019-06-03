function thorttle(fn, gap = 500) {
  let last_run = null;
  return (...arg) => {
    let now = new Date();
    if (!last_run || now - last_run > gap * 1) {
      fn(...arg);
      last_run = new Date();
    }
  };
}
function debounce(fn, delay = 500) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
export default {
  install(Vue, options) {
    Vue.directive('thorttle', {
      bind(el, { arg, value, modifiers }, vnode) {
        let gap =
          modifiers && Object.keys(modifiers).length != 0
            ? Object.keys(modifiers)[0]
            : 500;
        let t_fn = thorttle(value.bind(vnode), gap);
        el.addEventListener(arg, ev => {
          t_fn(ev);
        });
      }
    });
    Vue.directive('debounce', {
      bind(el, { arg, value, modifiers }, vnode) {
        let delay =
          modifiers && Object.keys(modifiers).length != 0
            ? Object.keys(modifiers)[0]
            : 500;
        let d_fn = debounce(value.bind(vnode), delay);
        el.addEventListener(arg, ev => {
          d_fn(ev);
        });
      }
    });
  }
};
