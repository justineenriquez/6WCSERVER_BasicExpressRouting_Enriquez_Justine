// Author: Enriquez, Justine Paul A.
// Activity: Basic Express Routing Using GET

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Data for menu
const menu = [
  { id: 1, name: 'Espresso',   category: 'hot',  price: 90,  favorite: false, image: '/images/espresso.jpg',   description: 'A rich and bold coffee shot, perfect for a quick caffeine boost.' },
  { id: 2, name: 'Cappuccino', category: 'hot',  price: 120, favorite: true,  image: '/images/cappuccino.jpg', description: 'A classic Italian coffee drink with equal parts espresso, steamed milk, and froth.' },
  { id: 3, name: 'Latte',      category: 'hot',  price: 130, favorite: true,  image: '/images/latte.jpg',      description: 'A smooth and creamy coffee made with espresso and steamed milk, topped with a light layer of foam.' },
  { id: 4, name: 'Americano', category: 'iced', price: 180, favorite: true,  image: '/images/americano.jpg',  description: 'A refreshing coffee drink made by pouring a fresh shot of espresso over cold water and ice' }
];

// Middleware to log page visits
const pageNames = { '/': 'index.html', '/menu': 'menu.html', '/about': 'about.html', '/contact': 'contact.html' };
app.use((req, res, next) => {
  if (req.method === 'GET' && pageNames[req.path]) {
    console.log(`Rendering ${pageNames[req.path]}`);
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Page routes
const sendPage = (file) => (req, res) =>
  res.sendFile(path.join(__dirname, 'public', file));

app.get('/', sendPage('index.html'));
app.get('/menu', sendPage('menu.html'));
app.get('/about', sendPage('about.html'));
app.get('/contact', sendPage('contact.html'));

// GET
app.get('/api/menu', (req, res) => {
  const { category, favorite } = req.query;
  let items = menu;
  if (category) items = items.filter(i => i.category === category);
  if (favorite === 'true') items = items.filter(i => i.favorite);
  res.json(items);
});

// parameter
app.get('/api/menu/:id', (req, res) => {
  const item = menu.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Menu item not found' });
  res.json(item);
});

// 404 handler (404.html)
app.use((req, res) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));