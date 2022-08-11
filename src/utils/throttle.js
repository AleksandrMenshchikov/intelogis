export default function throttle(callee, timeout) {
  let timer;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
