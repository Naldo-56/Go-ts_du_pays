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

function notifyRestaurant(reservation) {
  var msg = 'Nouvelle réservation chez Goût du Pays :\n'
    + '- Nom : ' + reservation.name + '\n'
    + '- Tél : +' + reservation.phone + '\n'
    + '- Date : ' + reservation.dateStr + '\n'
    + '- Créneau : ' + reservation.slotLabel + '\n'
    + '- Couverts : ' + reservation.guests;

  return sendMessage(config.whatsapp.restaurantNumber, msg);
}

function confirmToClient(reservation) {
  var isFr = reservation.lang === 'fr';

  var msg = isFr
    ? 'Bonjour ' + reservation.name + ' !\n\n'
      + 'Votre réservation chez Goût du Pays est confirmée :\n'
      + '- Date : ' + reservation.dateStr + '\n'
      + '- Créneau : ' + reservation.slotLabel + '\n'
      + '- Couverts : ' + reservation.guests + '\n\n'
      + 'Adresse : 42 Boulevard de la Marina, Cotonou\n'
      + 'À bientôt !'
    : 'Hello ' + reservation.name + '!\n\n'
      + 'Your reservation at Goût du Pays is confirmed:\n'
      + '- Date: ' + reservation.dateStr + '\n'
      + '- Slot: ' + reservation.slotLabel + '\n'
      + '- Guests: ' + reservation.guests + '\n\n'
      + 'Address: 42 Boulevard de la Marina, Cotonou\n'
      + 'See you soon!';

  return sendMessage(reservation.phone, msg);
}

module.exports = { sendMessage, notifyRestaurant, confirmToClient };
