const grid = document.getElementById('menu-grid');
const category = document.getElementById('category');
const favorite = document.getElementById('favorite');
const form = document.getElementById('filter');

function render(items) {
  if (items.length === 0) {
    grid.innerHTML = '<p class="center">No items found.</p>';
    return;
  }

  grid.innerHTML = items.map(item => `
    <article class="card">
      ${item.favorite ? '<span class="badge">Favorite</span>' : ''}
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>PHP ${item.price}</strong></p>
      </div>
    </article>
  `).join('');
}

async function loadMenu() {
  const params = new URLSearchParams();
  if (category.value) params.set('category', category.value);
  if (favorite.value) params.set('favorite', 'true');

  try {
    const res = await fetch('/api/menu?' + params.toString());
    if (!res.ok) throw new Error('Request failed: ' + res.status);
    render(await res.json());
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p class="center">Could not load the menu.</p>';
  }
}

form.addEventListener('submit', e => e.preventDefault());
category.addEventListener('change', loadMenu);
favorite.addEventListener('change', loadMenu);

loadMenu();