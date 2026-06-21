(function () {
  const SITE_START_AT = '2023-07-17T00:00:00+08:00';
  let runtimeTimer = null;

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function getElapsedParts() {
    const startTime = new Date(SITE_START_AT).getTime();
    const now = Date.now();
    let totalSeconds = Math.max(0, Math.floor((now - startTime) / 1000));

    const years = Math.floor(totalSeconds / (365 * 24 * 3600));
    totalSeconds %= 365 * 24 * 3600;

    const days = Math.floor(totalSeconds / (24 * 3600));
    totalSeconds %= 24 * 3600;

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { years, days, hours, minutes, seconds };
  }

  function ensureRuntimeNode() {
    const workboard = document.getElementById('workboard');
    if (!workboard) return null;

    let runtime = document.getElementById('runtime');
    if (runtime) return runtime;

    workboard.innerHTML = [
      '<div id="runtime" class="footer-runtime" aria-live="polite">',
      '  <span class="runtime-orb" aria-hidden="true"></span>',
      '  <span class="boardsign-text"></span>',
      '  <span class="runtime-divider" aria-hidden="true"></span>',
      '  <span class="runtime-label">本站已运行</span>',
      '  <span class="runtime-clock"></span>',
      '</div>'
    ].join('');

    return document.getElementById('runtime');
  }

  function updateRuntime() {
    const runtime = ensureRuntimeNode();
    if (!runtime) return;

    const now = new Date();
    const currentHour = now.getHours();
    const isOpen = currentHour >= 8 && currentHour < 22;
    const elapsed = getElapsedParts();

    runtime.classList.toggle('is-open', isOpen);
    runtime.classList.toggle('is-resting', !isOpen);

    const status = runtime.querySelector('.boardsign-text');
    const clock = runtime.querySelector('.runtime-clock');

    if (status) {
      status.textContent = isOpen ? '小窝营业中' : '小窝休息中';
    }

    if (clock) {
      clock.textContent = `${elapsed.years} 年 ${elapsed.days} 天 ${pad(elapsed.hours)}:${pad(elapsed.minutes)}:${pad(elapsed.seconds)}`;
    }
  }

  function mountRuntime() {
    updateRuntime();

    if (runtimeTimer) {
      clearInterval(runtimeTimer);
    }

    runtimeTimer = setInterval(updateRuntime, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountRuntime);
  } else {
    mountRuntime();
  }

  document.addEventListener('pjax:complete', mountRuntime);
})();
