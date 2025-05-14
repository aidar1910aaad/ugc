document.addEventListener('DOMContentLoaded', async () => {
  const includes = document.querySelectorAll('[data-include]');
  const tasks = [];

  for (const el of includes) {
    const file = el.getAttribute('data-include');
    const task = fetch(`/components/${file}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка загрузки ${file}`);
        return res.text();
      })
      .then((html) => {
        el.innerHTML = html;

        if (file.includes('hero')) initHeroSlider?.(); // если hero.html — запустить слайдер
      })
      .catch(() => {
        el.innerHTML = `<p>Не удалось загрузить ${file}</p>`;
      });

    tasks.push(task);
  }

  // 👇 Дождались всех вставок, теперь загружаем JSON
  await Promise.all(tasks);

  // Подгружаем категории в меню "Каталог"
  const catalogMenu = document.getElementById('catalog-menu');
  const catalogLink = document.querySelector('.catalog-link');
  const catalogDropdown = document.querySelector('.catalog-dropdown');

  if (catalogMenu) {
    const categories = [
      'Торкрет-установки',
      'Пистолеты и сопла',
      'Диски для торкрет',
      'Раствороподающие рукава и соединения',
      'Плиты и пластины',
      'Барабаны для торкрет',
      'Комплектующие и расходные материалы',
    ];

    categories.forEach((category) => {
      const link = document.createElement('a');
      link.href = `/catalog.html?category=${encodeURIComponent(category)}`;
      link.textContent = category;
      catalogMenu.appendChild(link);
    });

    // Открытие на мобильных
    catalogLink?.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        catalogDropdown.classList.toggle('active');
      }
    });
  }

  // Запускаем логику загрузки материала
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (slug) {
    fetch(`/materials/${slug}.json`)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('title').textContent = data.title;
        document.getElementById('category').textContent = data.category;
        document.getElementById('body').innerHTML = data.body;
        document.getElementById('pdfLink').href = data.pdf;
      })
      .catch(() => {
        document.getElementById('content').innerHTML = '<p>❌ Материал не найден</p>';
      });
  } else {
    document.getElementById('content').innerHTML = '<p>❌ Слаг не указан</p>';
  }
});
