var chatMsgCount = 1;

function growChat() {
  chatMsgCount++;
  var win = document.querySelector('.chatbot-window');
  if (!win) return;
  var h = Math.min(360 + chatMsgCount * 32, window.innerHeight * 0.7);
  win.style.setProperty('--chat-h', h + 'px');
}

function toggleChat() {
  document.querySelector('.chatbot-window')?.classList.toggle('open');
}

function closeChat() {
  document.querySelector('.chatbot-window')?.classList.remove('open');
}

function sendChat() {
  var input = document.querySelector('.chatbot-input input');
  var msg = input.value.trim();
  if (!msg) return;

  appendMsg(msg, 'user');
  input.value = '';
  showTyping();

  var delay = 800 + Math.random() * 1200;
  setTimeout(function () {
    hideTyping();
    appendMsg(getBotReply(msg), 'bot');
  }, delay);
}

function appendMsg(text, type) {
  var container = document.querySelector('.chatbot-messages');
  var div = document.createElement('div');
  div.className = 'chat-msg ' + type;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  growChat();
}

function showTyping() {
  document.querySelector('.chatbot-typing')?.classList.add('show');
  var container = document.querySelector('.chatbot-messages');
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  document.querySelector('.chatbot-typing')?.classList.remove('show');
}

function getBotReply(msg) {
  var m = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  var isFr = currentLang === 'fr';

  if (/reserv|book|table/.test(m)) {
    return isFr
      ? "Avec plaisir ! Remplissez le formulaire dans la section Réserver sur notre page d'accueil, ou appelez-nous au +229 21 30 00 00. Vous recevrez la confirmation par WhatsApp."
      : "Of course! Fill out the form in the Reserve section on our home page, or call us at +229 21 30 00 00. You'll receive confirmation via WhatsApp.";
  }

  if (/meilleur|best|top|recommend|conseil|populaire|popular|prefer|favori|favorite/.test(m)) {
    return isFr
      ? "Nos plats les plus appréciés sont l'Amiwo Royal, le Gboma Dessi et le Wagassi Doré. Le Djidja d'Agneau est aussi un coup de cœur de nos clients !"
      : "Our most popular dishes are the Royal Amiwo, Gboma Dessi, and Golden Wagassi. The Djidja Lamb is also a customer favorite!";
  }

  if (/menu|carte|plat|dish|manger|eat|food/.test(m)) {
    return isFr
      ? "Notre carte propose des entrées, plats principaux, grillades, desserts et boissons artisanales. Vous pouvez consulter la carte complète sur notre page Menu. Souhaitez-vous une recommandation ?"
      : "Our menu features starters, main courses, grills, desserts, and artisanal beverages. You can browse the full menu on our Menu page. Would you like a recommendation?";
  }

  if (/heure|hour|horaire|schedule|ouvert|open|ferm|close|quand|when/.test(m)) {
    return isFr
      ? "Nous sommes ouverts du mardi au samedi de 12h à 15h pour le déjeuner, du mercredi au samedi de 19h à 23h pour le dîner, et le dimanche de 12h à 16h pour le brunch. Nous sommes fermés le lundi."
      : "We're open Tuesday to Saturday from 12 PM to 3 PM for lunch, Wednesday to Saturday from 7 PM to 11 PM for dinner, and Sunday from 12 PM to 4 PM for brunch. Closed on Mondays.";
  }

  if (/adresse|address|ou |where|lieu|location|trouver|find|direction/.test(m)) {
    return isFr
      ? "Nous sommes situés au 42 Boulevard de la Marina, Cotonou, Bénin. Nous avons hâte de vous accueillir !"
      : "We're located at 42 Boulevard de la Marina, Cotonou, Benin. We look forward to welcoming you!";
  }

  if (/prix|price|cout|cost|cher|expensive|budget|combien|how much/.test(m)) {
    return isFr
      ? "Nos entrées démarrent à 8 000 FCFA et nos plats principaux entre 14 000 et 24 000 FCFA. N'hésitez pas à consulter notre carte complète pour tous les détails !"
      : "Our starters begin at 8,000 FCFA and main courses range from 14,000 to 24,000 FCFA. Feel free to check our full menu for all the details!";
  }

  if (/bonjour|bonsoir|salut|hello|hi |hey|good morning|good evening/.test(m)) {
    return isFr
      ? "Bonjour et bienvenue ! Comment puis-je vous aider aujourd'hui ?"
      : "Hello and welcome! How can I help you today?";
  }

  if (/merci|thank|thanks/.test(m)) {
    return isFr
      ? "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. À bientôt chez Goût du Pays !"
      : "My pleasure! Don't hesitate if you have any other questions. See you soon at Goût du Pays!";
  }

  if (/vegeta|vegan|regime|diet|allergi|gluten|sans/.test(m)) {
    return isFr
      ? "Nous proposons plusieurs options végétariennes comme le Wagassi Doré et l'Alloco. Pour les allergies ou régimes spéciaux, notre équipe se fera un plaisir de vous accompagner. Contactez-nous au +229 21 30 00 00."
      : "We offer several vegetarian options including the Golden Wagassi and Alloco. For allergies or special diets, our team will be happy to assist. Contact us at +229 21 30 00 00.";
  }

  return isFr
    ? "C'est une très bonne question ! Pour vous apporter la meilleure réponse possible, je vous invite à contacter notre service client au +229 21 30 00 00 ou par email à contact@goutdupays.bj. Notre équipe se fera un plaisir de vous aider !"
    : "That's a great question! To give you the best possible answer, I'd recommend reaching out to our customer service team at +229 21 30 00 00 or via email at contact@goutdupays.bj. They'll be happy to help!";
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && document.activeElement?.closest('.chatbot-input')) {
    sendChat();
  }
});
