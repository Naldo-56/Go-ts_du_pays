const config = require('../config');

function sendMessage(to, text) {
  var url = config.whatsapp.apiUrl + '/' + config.whatsapp.phoneNumberId + '/messages';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + config.whatsapp.accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: text },
    }),
  }).then(function (res) {
    return res.json();
  });
}

function formatItemsList(items) {
  return items.map(function (it) {
    return '  • ' + it.name + ' x' + it.qty + ' — ' + it.subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  }).join('\n');
}

function notifyRestaurant(reservation) {
  var msg = 'Nouvelle réservation chez Goût du Pays :\n'
    + '- Nom : ' + reservation.name + '\n'
    + '- Tél : +' + reservation.phone + '\n'
    + '- Date : ' + reservation.dateStr + '\n'
    + '- Créneau : ' + reservation.slotLabel + '\n'
    + '- Couverts : ' + reservation.guests;

  if (reservation.preorders && reservation.preorders.length > 0) {
    msg += '\n- Pré-commande : ' + reservation.preorders.join(', ');
  }

  return sendMessage(config.whatsapp.restaurantNumber, msg);
}

function confirmToClient(reservation) {
  var isFr = reservation.lang === 'fr';

  var msg = isFr
    ? 'Bonjour ' + reservation.name + ' !\n\n'
      + 'Votre réservation chez Goût du Pays est confirmée :\n'
      + '- Date : ' + reservation.dateStr + '\n'
      + '- Créneau : ' + reservation.slotLabel + '\n'
      + '- Couverts : ' + reservation.guests + '\n'
    : 'Hello ' + reservation.name + '!\n\n'
      + 'Your reservation at Goût du Pays is confirmed:\n'
      + '- Date: ' + reservation.dateStr + '\n'
      + '- Slot: ' + reservation.slotLabel + '\n'
      + '- Guests: ' + reservation.guests + '\n';

  if (reservation.preorders && reservation.preorders.length > 0) {
    msg += isFr
      ? '- Pré-commande : ' + reservation.preorders.join(', ') + '\n'
      : '- Pre-order: ' + reservation.preorders.join(', ') + '\n';
  }

  msg += isFr
    ? '\nAdresse : 42 Boulevard de la Marina, Cotonou\nÀ bientôt !'
    : '\nAddress: 42 Boulevard de la Marina, Cotonou\nSee you soon!';

  return sendMessage(reservation.phone, msg);
}

function notifyRestaurantOrder(order) {
  var modeLabel = order.mode === 'delivery' ? 'Livraison' : 'À emporter';
  var totalStr = order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';

  var msg = 'Nouvelle commande (' + modeLabel + ') :\n'
    + '- Client : ' + order.name + '\n'
    + '- Tél : +' + order.phone + '\n'
    + '- Articles :\n' + formatItemsList(order.items) + '\n'
    + '- Total : ' + totalStr;

  if (order.mode === 'delivery' && order.address) {
    msg += '\n- Adresse : ' + order.address;
  }

  return sendMessage(config.whatsapp.restaurantNumber, msg);
}

function confirmOrderToClient(order) {
  var isFr = order.lang === 'fr';
  var totalStr = order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';

  var msg = isFr
    ? 'Bonjour ' + order.name + ' !\n\n'
      + 'Votre commande chez Goût du Pays est confirmée :\n'
      + formatItemsList(order.items) + '\n'
      + '- Total : ' + totalStr + '\n'
      + '- Mode : ' + (order.mode === 'delivery' ? 'Livraison' : 'À emporter') + '\n'
    : 'Hello ' + order.name + '!\n\n'
      + 'Your order at Goût du Pays is confirmed:\n'
      + formatItemsList(order.items) + '\n'
      + '- Total: ' + totalStr + '\n'
      + '- Mode: ' + (order.mode === 'delivery' ? 'Delivery' : 'Takeaway') + '\n';

  if (order.mode === 'delivery' && order.address) {
    msg += isFr
      ? '- Adresse : ' + order.address + '\n'
      : '- Address: ' + order.address + '\n';
  }

  msg += isFr
    ? '\nMerci et à bientôt !'
    : '\nThank you and see you soon!';

  return sendMessage(order.phone, msg);
}

module.exports = {
  sendMessage,
  notifyRestaurant,
  confirmToClient,
  notifyRestaurantOrder,
  confirmOrderToClient,
};
