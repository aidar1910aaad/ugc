document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-include]').forEach(async (el) => {
    const file = el.getAttribute('data-include');
    const res = await fetch(`/components/${file}`);
    if (res.ok) {
      el.innerHTML = await res.text();

      // 👇 если вставлен hero.html — запускаем initHeroSlider()
      if (file.includes('hero')) initHeroSlider();
    } else {
      el.innerHTML = `<p>Не удалось загрузить ${file}</p>`;
    }
  });
});
