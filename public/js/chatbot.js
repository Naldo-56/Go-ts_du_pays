var chatMsgCount = 1;

var EN_WORDS = /\b(hello|hi|hey|good\s?(morning|evening|afternoon)|how|what|where|when|who|which|why|please|thank|thanks|the|is|are|do|does|can|could|would|should|have|has|about|your|menu|book|reserve|price|open|close|address|recommend|best|vegan|vegetarian|allergy|gluten|dish|eat|food|drink|dessert|starter|main|grill|side|located|find|much|expensive|cost)\b/i;
var FR_WORDS = /\b(bonjour|bonsoir|salut|comment|quoi|quel|quelle|quand|qui|pourquoi|s'il vous|merci|le|la|les|est|sont|vous|votre|carte|plat|reserver|prix|ouvert|ferm|adresse|meilleur|vegetar|allergi|manger|boire|dessert|entree|accompagnement|grillade|braise|situe|trouver|combien|cher)\b/i;

function detectLang(msg) {
  var m = msg.toLowerCase();
  var enScore = 0;
  var frScore = 0;
  var enMatches = m.match(EN_WORDS);
  var frMatches = m.match(FR_WORDS);
  if (enMatches) enScore = enMatches.length;
  if (frMatches) frScore = frMatches.length;
  if (enScore > frScore) return 'en';
  if (frScore > enScore) return 'fr';
  return currentLang;
}

function isQuestion(msg) {
  var m = msg.trim();
  if (m.endsWith('?')) return true;
  var lower = m.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (/^(est-ce|qu[ei]|comment|pourquoi|combien|ou |quand|qui |quel|peut-on|avez|y a)/.test(lower)) return true;
  if (/^(is|are|do|does|can|could|would|how|what|where|when|who|which|why|may|shall|will)/.test(lower)) return true;
  return false;
}

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
  var lang = detectLang(msg);
  var fr = lang === 'fr';
  var question = isQuestion(msg);

  if (/reserv|book|table/.test(m)) {
    if (question) {
      return fr
        ? "Bien sûr ! Vous pouvez réserver directement via le formulaire sur cette page. Choisissez votre date, votre créneau et le nombre de couverts — vous recevrez une confirmation par WhatsApp."
        : "Absolutely! You can book directly using the form on this page. Pick your date, time slot and party size — you'll receive a WhatsApp confirmation.";
    }
    return fr
      ? "Parfait, vous trouverez le formulaire de réservation juste en dessous. N'hésitez pas si vous avez besoin d'aide pour choisir un créneau !"
      : "Great, you'll find the reservation form just below. Let me know if you need help picking a time slot!";
  }

  if (/meilleur|best|top|recommend|conseil|populaire|popular|prefer|favori|favorite|suggest/.test(m)) {
    if (question) {
      return fr
        ? "Je vous recommande vivement l'Amiwo Royal — c'est notre plat phare. Le Gboma Dessi et le Wagassi Doré sont aussi des incontournables. Pour une expérience complète, le Djidja d'Agneau est exceptionnel !"
        : "I'd highly recommend the Royal Amiwo — it's our signature dish. The Gboma Dessi and Golden Wagassi are also must-tries. For a full experience, the Djidja Lamb is exceptional!";
    }
    return fr
      ? "Excellent choix de s'intéresser à nos coups de cœur ! L'Amiwo Royal, le Gboma Dessi et le Wagassi Doré font partie des favoris de nos clients."
      : "Great taste! The Royal Amiwo, Gboma Dessi and Golden Wagassi are among our customers' absolute favorites.";
  }

  if (/menu|carte|plat|dish|manger|eat|food|cuisine/.test(m)) {
    if (question) {
      return fr
        ? "Notre carte propose des entrées, plats principaux, grillades, desserts et boissons artisanales. Vous pouvez la consulter sur la page Menu. Un plat vous intrigue en particulier ?"
        : "Our menu features starters, main courses, grills, desserts and artisanal drinks. You can browse it on the Menu page. Any dish catch your eye?";
    }
    return fr
      ? "Vous avez bon goût ! Notre carte est variée — des entrées légères aux grillades généreuses en passant par nos desserts maison. Jetez un œil à la page Menu !"
      : "You have great taste! Our menu is diverse — from light starters to hearty grills and homemade desserts. Check out the Menu page!";
  }

  if (/heure|hour|horaire|schedule|ouvert|open|ferm|close|quand|when|disponib/.test(m)) {
    if (question) {
      return fr
        ? "Nous sommes ouverts du mardi au samedi de 12h à 15h pour le déjeuner, du mercredi au samedi de 19h à 23h pour le dîner, et le dimanche de 12h à 16h pour le brunch. Nous sommes fermés le lundi."
        : "We're open Tuesday to Saturday from 12 PM to 3 PM for lunch, Wednesday to Saturday from 7 PM to 11 PM for dinner, and Sunday from 12 PM to 4 PM for brunch. Closed on Mondays.";
    }
    return fr
      ? "Bonne nouvelle, nous sommes ouverts presque toute la semaine ! Déjeuner du mardi au samedi, dîner du mercredi au samedi, et brunch le dimanche. Seul le lundi, nous nous reposons."
      : "Good news, we're open almost every day! Lunch Tuesday to Saturday, dinner Wednesday to Saturday, and brunch on Sunday. We only rest on Mondays.";
  }

  if (/adresse|address|ou\s|where|lieu|location|trouver|find|direction|situe|gps|itineraire|route/.test(m)) {
    if (question) {
      return fr
        ? "Nous sommes au 42 Boulevard de la Marina, Cotonou, Bénin. C'est facilement accessible en voiture ou en taxi. Nous avons hâte de vous accueillir !"
        : "We're at 42 Boulevard de la Marina, Cotonou, Benin. Easy to reach by car or taxi. We look forward to welcoming you!";
    }
    return fr
      ? "Notre adresse : 42 Boulevard de la Marina, Cotonou. Un emplacement idéal au bord de la marina !"
      : "Our address: 42 Boulevard de la Marina, Cotonou. A perfect waterfront location!";
  }

  if (/prix|price|cout|cost|cher|expensive|budget|combien|how much|tarif|afford/.test(m)) {
    if (question) {
      return fr
        ? "Nos entrées vont de 8 000 à 12 000 FCFA, les plats principaux de 14 000 à 24 000 FCFA, et les desserts de 7 000 à 9 000 FCFA. Vous trouverez tous les détails sur notre page Menu."
        : "Starters range from 8,000 to 12,000 FCFA, mains from 14,000 to 24,000 FCFA, and desserts from 7,000 to 9,000 FCFA. Full details on our Menu page.";
    }
    return fr
      ? "Nos prix reflètent la qualité de nos ingrédients locaux et le savoir-faire de nos chefs. Les entrées démarrent à 8 000 FCFA et les plats entre 14 000 et 24 000 FCFA."
      : "Our prices reflect the quality of our local ingredients and our chefs' expertise. Starters from 8,000 FCFA, mains from 14,000 to 24,000 FCFA.";
  }

  if (/bonjour|bonsoir|salut|hello|hi |hey|good\s?(morning|evening|afternoon)|yo\b|coucou/.test(m)) {
    return fr
      ? "Bonjour et bienvenue chez Goût du Pays ! Je suis votre concierge virtuel. Comment puis-je rendre votre expérience encore meilleure ?"
      : "Hello and welcome to Goût du Pays! I'm your virtual concierge. How can I make your experience even better?";
  }

  if (/merci|thank|thanks|grateful|appreciate/.test(m)) {
    return fr
      ? "Avec grand plaisir ! N'hésitez pas si vous avez d'autres questions. À très bientôt chez Goût du Pays !"
      : "My pleasure! Feel free to ask if you need anything else. See you soon at Goût du Pays!";
  }

  if (/au revoir|bye|goodbye|a bientot|see you|a plus|bonne (soiree|journee|nuit)/.test(m)) {
    return fr
      ? "Au revoir et à très bientôt ! Ce sera un plaisir de vous accueillir chez Goût du Pays."
      : "Goodbye and see you soon! It will be a pleasure to welcome you at Goût du Pays.";
  }

  if (/vegetar|vegan|regime|diet|allergi|gluten|sans|intoleran|halal|casher|lactose/.test(m)) {
    if (question) {
      return fr
        ? "Oui, nous proposons plusieurs options : le Wagassi Doré et l'Alloco sont végétariens. Pour les allergies ou régimes spécifiques, notre équipe peut adapter les plats. Appelez-nous au +229 21 30 00 00 pour en discuter."
        : "Yes, we offer several options: the Golden Wagassi and Alloco are vegetarian. For allergies or specific diets, our team can adapt dishes. Call us at +229 21 30 00 00 to discuss.";
    }
    return fr
      ? "Nous prenons les régimes alimentaires très au sérieux. Plusieurs plats sont végétariens, et notre chef peut adapter les recettes selon vos besoins. N'hésitez pas à nous prévenir lors de la réservation."
      : "We take dietary needs very seriously. Several dishes are vegetarian, and our chef can adapt recipes to your needs. Feel free to let us know when booking.";
  }

  if (/event|evenement|anniversaire|birthday|mariage|wedding|groupe|group|prive|private|fete|party|celebration/.test(m)) {
    return fr
      ? "Nous accueillons les événements privés avec plaisir — anniversaires, dîners d'affaires, célébrations. Contactez-nous au +229 21 30 00 00 ou à contact@goutdupays.bj pour un devis personnalisé."
      : "We'd love to host your private event — birthdays, business dinners, celebrations. Contact us at +229 21 30 00 00 or contact@goutdupays.bj for a personalized quote.";
  }

  if (/brunch/.test(m)) {
    return fr
      ? "Notre brunch du dimanche est servi de 12h à 16h. C'est le moment idéal pour découvrir nos spécialités dans une ambiance détendue. Réservez votre table pour ne pas le manquer !"
      : "Our Sunday brunch is served from 12 PM to 4 PM. It's the perfect time to enjoy our specialties in a relaxed setting. Book your table so you don't miss it!";
  }

  if (/boisson|drink|cocktail|vin|wine|biere|beer|sodabi|bissap|jus|juice/.test(m)) {
    return fr
      ? "Notre carte des boissons met à l'honneur le terroir béninois : cocktail au Sodabi, Bissap Prestige, Tchoukoutou revisité et jus de Baobab. Des saveurs uniques à découvrir !"
      : "Our drinks menu showcases Beninese flavors: Sodabi cocktail, Prestige Bissap, reimagined Tchoukoutou and Baobab juice. Unique flavors to discover!";
  }

  if (/chef|cuisine|cuisinier|cook/.test(m)) {
    return fr
      ? "Nos chefs allient tradition béninoise et techniques gastronomiques contemporaines. Chaque plat est préparé avec des ingrédients locaux soigneusement sélectionnés pour vous offrir une expérience inoubliable."
      : "Our chefs blend Beninese tradition with contemporary culinary techniques. Every dish is crafted with carefully selected local ingredients for an unforgettable experience.";
  }

  if (question) {
    return fr
      ? "Excellente question ! Pour vous donner la meilleure réponse, je vous invite à contacter notre équipe au +229 21 30 00 00 ou à contact@goutdupays.bj. Ils seront ravis de vous aider."
      : "Great question! For the best answer, I'd recommend reaching out to our team at +229 21 30 00 00 or contact@goutdupays.bj. They'll be happy to help.";
  }

  return fr
    ? "Merci pour votre message ! Si vous souhaitez réserver, le formulaire est juste en dessous. Pour toute autre demande, notre équipe est joignable au +229 21 30 00 00. Comment puis-je vous aider davantage ?"
    : "Thanks for your message! If you'd like to book, the form is just below. For anything else, our team is available at +229 21 30 00 00. How else can I help?";
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && document.activeElement?.closest('.chatbot-input')) {
    sendChat();
  }
});
