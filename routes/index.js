const express = require('express');
const path = require('path');
const whatsapp = require('../services/whatsapp');

const router = express.Router();
const pagesDir = path.join(__dirname, '..', 'public', 'pages');

router.get('/', (req, res) => {
  res.sendFile(path.join(pagesDir, 'index.html'));
});

router.get('/menu', (req, res) => {
  res.sendFile(path.join(pagesDir, 'menu.html'));
});

router.get('/commander', (req, res) => {
  res.sendFile(path.join(pagesDir, 'commander.html'));
});

router.post('/api/reservation', async (req, res) => {
  var data = req.body;

  if (!data.name || !data.phone || !data.date || !data.time || !data.guests) {
    return res.status(400).json({ error: 'missing_fields' });
  }

  var chosen = new Date(data.date + 'T00:00:00');
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  if (chosen < today) {
    return res.status(400).json({ error: 'past_date' });
  }

  var day = chosen.getDay();

  if (day === 1) {
    return res.status(400).json({ error: 'closed' });
  }

  if (data.time === 'dinner' && (day === 0 || day === 2)) {
    return res.status(400).json({ error: 'slot_unavailable' });
  }

  if (data.time === 'brunch' && day !== 0) {
    return res.status(400).json({ error: 'slot_unavailable' });
  }

  var isFr = data.lang === 'fr';
  var slotLabel = data.time === 'lunch'
    ? (isFr ? 'Déjeuner' : 'Lunch')
    : data.time === 'dinner'
      ? (isFr ? 'Dîner' : 'Dinner')
      : 'Brunch';

  var dateStr = chosen.toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  var reservation = {
    name: data.name,
    phone: data.phone,
    date: data.date,
    dateStr: dateStr,
    time: data.time,
    slotLabel: slotLabel,
    guests: data.guests,
    lang: data.lang || 'fr',
    preorders: data.preorders || [],
  };

  try {
    await Promise.all([
      whatsapp.notifyRestaurant(reservation),
      whatsapp.confirmToClient(reservation),
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error('WhatsApp API error:', err);
    res.status(502).json({ error: 'whatsapp_failed' });
  }
});

router.post('/api/order', async (req, res) => {
  var data = req.body;

  if (!data.name || !data.phone || !data.items || data.items.length === 0) {
    return res.status(400).json({ error: 'missing_fields' });
  }

  if (data.mode === 'delivery' && !data.address) {
    return res.status(400).json({ error: 'missing_address' });
  }

  var order = {
    name: data.name,
    phone: data.phone,
    mode: data.mode || 'takeaway',
    items: data.items,
    total: data.total,
    address: data.address || '',
    lang: data.lang || 'fr',
  };

  try {
    await Promise.all([
      whatsapp.notifyRestaurantOrder(order),
      whatsapp.confirmOrderToClient(order),
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error('WhatsApp API error (order):', err);
    res.status(502).json({ error: 'whatsapp_failed' });
  }
});

module.exports = router;
