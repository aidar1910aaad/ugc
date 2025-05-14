// 🔧 Вспомогательная функция — вывод секции, если есть значение
function createSection(title, value) {
  if (!value) return '';
  return `<h2>${title}</h2><p>${value}</p>`;
}

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

        // 🔁 вызываем нужные инициализации
        if (file.includes('hero')) initHeroSlider?.();

        // ✅ инициализируем бургер и глобальный поиск после вставки header
        if (file.includes('header')) {
          import('./burger.js').then((mod) => mod.initBurgerMenu());

          // 🔍 Поиск по Enter
          const searchInput = document.getElementById('globalSearch');
          if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                  window.location.href = '/catalog.html?q=' + encodeURIComponent(query);
                }
              }
            });
          }
          const catalogLink = document.querySelector('.catalog-link');
          const catalogDropdown = document.querySelector('.catalog-dropdown');

          if (catalogLink && catalogDropdown) {
            catalogLink.addEventListener('click', (e) => {
              if (window.innerWidth <= 768) {
                e.preventDefault();
                catalogDropdown.classList.toggle('active');
              }
            });
          }
        }
      })
      .catch(() => {
        el.innerHTML = `<p>Не удалось загрузить ${file}</p>`;
      });

    tasks.push(task);
  }

  // Дождались вставки всех компонентов
  await Promise.all(tasks);

  // 3️⃣ Динамически подгружаем категории в меню "Каталог"
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

    // 📱 Поведение на мобильных — по клику, не по hover
    catalogLink?.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        catalogDropdown.classList.toggle('active');
      }
    });
  }

  // 4️⃣ Подгружаем материал по slug
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (slug) {
    try {
      const res = await fetch(`/materials/${slug}.json`);
      const data = await res.json();

      document.getElementById('title').textContent = data.title || '';
      document.getElementById('category').textContent = data.category || '';
      document.getElementById('pdfLink').href = data.pdf || '#';

      const sectionsHTML = `
        ${createSection('Краткое описание', data.body)}
        ${createSection('Область применения', data.application)}
        ${createSection('Особенности и преимущества', data.features)}
        ${createSection('Технические характеристики', data.technical)}
        ${createSection('Дозировка и расход', data.dosage)}
        ${createSection('Упаковка', data.packaging)}
        ${createSection('Условия хранения', data.storage)}
        ${createSection('Меры предосторожности', data.precautions)}
        ${createSection('Контроль качества', data.control)}
        ${createSection('Производитель', data.manufacturer)}
      `;

      document.getElementById('body').innerHTML = sectionsHTML;
    } catch (e) {
      console.error(e);
      document.getElementById('content').innerHTML = '<p>❌ Материал не найден</p>';
    }
  } else {
    if (document.getElementById('content')) {
      document.getElementById('content').innerHTML = '<p>❌ Слаг не указан</p>';
    }
  }
});
