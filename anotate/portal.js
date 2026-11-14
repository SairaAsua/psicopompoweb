/* Optional control for the original brand animation. Registration remains
   a normal direct link to the maintained invitation application. */
(() => {
  const video = document.querySelector('.qr-entry-header video');
  if (!video || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'qr-motion-control';
  const update = () => {
    const en = document.documentElement.lang === 'en';
    button.textContent = video.paused ? (en ? 'Play animation' : 'Reproducir animación') : (en ? 'Pause animation' : 'Pausar animación');
  };
  button.addEventListener('click', () => { if (video.paused) video.play().catch(update); else video.pause(); });
  video.addEventListener('play', update); video.addEventListener('pause', update);
  video.parentElement.after(button); update();
  new MutationObserver(update).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
})();
