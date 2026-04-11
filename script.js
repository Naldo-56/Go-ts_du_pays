/* ═══════════════════════════════════════════════════════
   Goût du Pays — Script
   ═══════════════════════════════════════════════════════ */

// ── Translations ─────────────────────────────────────────
const T = {
  fr: {
    // Nav
    navHome: "Accueil",
    navStory: "Notre Histoire",
    navMenu: "La Carte",
    navReserve: "Réserver",
    // Hero
    heroSub: "Cuisine Béninoise d'Exception",
    heroTitle: 'Goût du <em>Pays</em>',
    heroTagline: "Un voyage culinaire au cœur du Bénin, sublimé par l'art de la gastronomie française.",
    heroCta: "Découvrir la Carte",
    // Intro
    introLabel: "Notre Philosophie",
    introH2: "L'Âme du Bénin<br>dans Chaque Assiette",
    introP1: "Chez Goût du Pays, nous célébrons les saveurs ancestrales du Bénin avec une touche contemporaine. Chaque plat raconte l'histoire d'un terroir riche et vibrant.",
    introP2: "Nos chefs sélectionnent les meilleurs ingrédients locaux pour créer une expérience gustative unique, entre tradition et modernité.",
    // Dishes
    dishesLabel: "La Carte",
    dishesH2: "Nos Plats Signatures",
    dish1Name: "Amiwo Royal",
    dish1Desc: "Polenta de maïs au jus de tomate, accompagnée de poulet braisé aux épices du terroir.",
    dish1Price: "18 000 FCFA",
    dish2Name: "Gboma Dessi",
    dish2Desc: "Épinards locaux mijotés au crabe frais, huile de palme rouge et piment doux.",
    dish2Price: "15 000 FCFA",
    dish3Name: "Wagassi Doré",
    dish3Desc: "Fromage peul grillé, miel d'acacia, salade de mangue verte et vinaigrette au gingembre.",
    dish3Price: "12 000 FCFA",
    dishesCta: "Voir la Carte Complète",
    // Reservation
    resBandH2: "Une Table Vous Attend",
    resBandP: "Réservez votre expérience gastronomique et laissez-vous transporter par les saveurs du Bénin.",
    resBandCta: "Réserver une Table",
    // Footer
    footerDesc: "Restaurant gastronomique béninois. Une expérience culinaire unique au cœur de Cotonou.",
    footerNav: "Navigation",
    footerHours: "Horaires",
    footerContact: "Contact",
    footerMon: "Lun – Ven : 12h00 – 15h00",
    footerEve: "Mer – Sam : 19h00 – 23h00",
    footerSun: "Dim : 12h00 – 16h00 (Brunch)",
    footerClosed: "Mar : Fermé",
    footerAddr: "42 Boulevard de la Marina, Cotonou, Bénin",
    footerPhone: "+229 21 30 00 00",
    footerEmail: "contact@goutdupays.bj",
    footerCopy: "© 2026 Goût du Pays. Tous droits réservés.",
    // Chatbot
    chatTitle: "Concierge",
    chatPlaceholder: "Votre question…",
    chatWelcome: "Bienvenue chez Goût du Pays ! 🌿 Comment puis-je vous aider ? Réservations, carte, horaires… je suis à votre service.",
    // Menu page
    menuHeroH1: "La Carte",
    menuHeroP: "Un voyage à travers les saveurs du Bénin",
    menuBack: "← Retour à l'accueil",
    catStarters: "Entrées",
    catMains: "Plats Principaux",
    catGrills: "Grillades & Braisés",
    catSides: "Accompagnements",
    catDesserts: "Desserts",
    catDrinks: "Boissons",
    // Starters
    s1n: "Wagassi Doré", s1d: "Fromage peul grillé, miel d'acacia, salade de mangue verte, vinaigrette au gingembre",
    s2n: "Atassi du Chef", s2d: "Riz et haricots fondants, vinaigrette de tomates cerises, chips de plantain",
    s3n: "Salade Cotonou", s3d: "Avocat, crabe frais, suprêmes de pamplemousse, huile de sésame",
    s4n: "Akara Croustillant", s4d: "Beignets de haricots blancs, sauce pimentée douce, crudités fraîches",
    // Mains
    m1n: "Amiwo Royal", m1d: "Polenta de maïs au jus de tomate, poulet braisé aux épices du terroir",
    m2n: "Gboma Dessi", m2d: "Épinards locaux mijotés au crabe frais, huile de palme rouge, piment doux",
    m3n: "Djidja d'Agneau", m3d: "Carré d'agneau en croûte d'épices locales, igname pilée, jus au thym",
    m4n: "Capitaine Grillé", m4d: "Poisson capitaine entier, beurre de citronnelle, légumes du marché",
    m5n: "Yassa Béninois", m5d: "Pintade fermière marinée aux oignons caramélisés, riz parfumé",
    // Grills
    g1n: "Brochettes Mixtes", g1d: "Bœuf, poulet et crevettes, marinade au gingembre et citron vert",
    g2n: "Poulet Braisé Entier", g2d: "Poulet fermier mariné 24h, piment et ail, accompagné de alloco",
    g3n: "Côtes de Porc Fumées", g3d: "Cuisson lente au bois d'acacia, sauce moutarde-miel locale",
    // Sides
    sd1n: "Pâte Rouge (Owo)", sd1d: "Pâte de maïs fermenté traditionnelle",
    sd2n: "Igname Pilée", sd2d: "Igname pilée à la main, texture soyeuse",
    sd3n: "Alloco", sd3d: "Bananes plantain frites, pointe de piment",
    sd4n: "Riz Jollof", sd4d: "Riz parfumé aux tomates et épices ouest-africaines",
    // Desserts
    d1n: "Beignets au Miel", d1d: "Beignets soufflés, miel de la Pendjari, crème vanille",
    d2n: "Ananas Rôti", d2d: "Ananas caramélisé au poivre de Penja, sorbet coco",
    d3n: "Moelleux Cacao", d3d: "Fondant au cacao du Mono, coulis de fruits de la passion",
    // Drinks
    dr1n: "Sodabi Cocktail", dr1d: "Sodabi artisanal, citron vert, sirop de gingembre, menthe fraîche",
    dr2n: "Bissap Prestige", dr2d: "Infusion d'hibiscus, vanille, agrumes",
    dr3n: "Tchoukoutou Revisité", dr3d: "Bière de sorgho artisanale, notes épicées",
    dr4n: "Jus de Baobab", dr4d: "Pain de singe frais, sucre de canne, eau de fleur d'oranger",
    // Prices
    ps1: "12 000 F", ps2: "9 000 F", ps3: "11 000 F", ps4: "8 000 F",
    pm1: "18 000 F", pm2: "15 000 F", pm3: "24 000 F", pm4: "22 000 F", pm5: "17 000 F",
    pg1: "16 000 F", pg2: "14 000 F", pg3: "15 000 F",
    psd1: "2 000 F", psd2: "3 000 F", psd3: "2 500 F", psd4: "3 000 F",
    pd1: "7 000 F", pd2: "8 000 F", pd3: "9 000 F",
    pdr1: "6 000 F", pdr2: "3 500 F", pdr3: "4 000 F", pdr4: "3 000 F",
  },
  en: {
    navHome: "Home",
    navStory: "Our Story",
    navMenu: "Menu",
    navReserve: "Reserve",
    heroSub: "Exceptional Beninese Cuisine",
    heroTitle: 'Goût du <em>Pays</em>',
    heroTagline: "A culinary journey to the heart of Benin, elevated by the art of French gastronomy.",
    heroCta: "Discover the Menu",
    introLabel: "Our Philosophy",
    introH2: "The Soul of Benin<br>on Every Plate",
    introP1: "At Goût du Pays, we celebrate the ancestral flavors of Benin with a contemporary touch. Each dish tells the story of a rich and vibrant terroir.",
    introP2: "Our chefs select the finest local ingredients to create a unique tasting experience, bridging tradition and modernity.",
    dishesLabel: "The Menu",
    dishesH2: "Our Signature Dishes",
    dish1Name: "Royal Amiwo",
    dish1Desc: "Corn polenta in tomato jus, served with braised chicken and local spices.",
    dish1Price: "18,000 FCFA",
    dish2Name: "Gboma Dessi",
    dish2Desc: "Local spinach slow-cooked with fresh crab, red palm oil and sweet pepper.",
    dish2Price: "15,000 FCFA",
    dish3Name: "Golden Wagassi",
    dish3Desc: "Grilled Fulani cheese, acacia honey, green mango salad and ginger vinaigrette.",
    dish3Price: "12,000 FCFA",
    dishesCta: "View Full Menu",
    resBandH2: "A Table Awaits You",
    resBandP: "Book your gastronomic experience and let the flavors of Benin transport you.",
    resBandCta: "Reserve a Table",
    footerDesc: "Beninese gourmet restaurant. A unique culinary experience in the heart of Cotonou.",
    footerNav: "Navigation",
    footerHours: "Hours",
    footerContact: "Contact",
    footerMon: "Mon – Fri: 12:00 PM – 3:00 PM",
    footerEve: "Wed – Sat: 7:00 PM – 11:00 PM",
    footerSun: "Sun: 12:00 PM – 4:00 PM (Brunch)",
    footerClosed: "Tue: Closed",
    footerAddr: "42 Boulevard de la Marina, Cotonou, Benin",
    footerPhone: "+229 21 30 00 00",
    footerEmail: "contact@goutdupays.bj",
    footerCopy: "© 2026 Goût du Pays. All rights reserved.",
    chatTitle: "Concierge",
    chatPlaceholder: "Your question…",
    chatWelcome: "Welcome to Goût du Pays! 🌿 How can I help you? Reservations, menu, hours… I'm at your service.",
    menuHeroH1: "The Menu",
    menuHeroP: "A journey through the flavors of Benin",
    menuBack: "← Back to Home",
    catStarters: "Starters",
    catMains: "Main Courses",
    catGrills: "Grills & Braised",
    catSides: "Sides",
    catDesserts: "Desserts",
    catDrinks: "Beverages",
    s1n: "Golden Wagassi", s1d: "Grilled Fulani cheese, acacia honey, green mango salad, ginger vinaigrette",
    s2n: "Chef's Atassi", s2d: "Rice and tender beans, cherry tomato vinaigrette, plantain chips",
    s3n: "Cotonou Salad", s3d: "Avocado, fresh crab, grapefruit segments, sesame oil",
    s4n: "Crispy Akara", s4d: "White bean fritters, mild chili sauce, fresh crudités",
    m1n: "Royal Amiwo", m1d: "Corn polenta in tomato jus, braised chicken with local spices",
    m2n: "Gboma Dessi", m2d: "Local spinach slow-cooked with fresh crab, red palm oil, sweet pepper",
    m3n: "Djidja Lamb", m3d: "Rack of lamb in local spice crust, pounded yam, thyme jus",
    m4n: "Grilled Capitaine", m4d: "Whole capitaine fish, lemongrass butter, market vegetables",
    m5n: "Beninese Yassa", m5d: "Free-range guinea fowl marinated with caramelized onions, fragrant rice",
    g1n: "Mixed Skewers", g1d: "Beef, chicken and shrimp, ginger and lime marinade",
    g2n: "Whole Braised Chicken", g2d: "Free-range chicken marinated 24h, chili and garlic, with alloco",
    g3n: "Smoked Pork Ribs", g3d: "Slow-cooked over acacia wood, local honey-mustard sauce",
    sd1n: "Red Paste (Owo)", sd1d: "Traditional fermented corn paste",
    sd2n: "Pounded Yam", sd2d: "Hand-pounded yam, silky texture",
    sd3n: "Alloco", sd3d: "Fried plantain, hint of chili",
    sd4n: "Jollof Rice", sd4d: "Tomato and West African spice-infused rice",
    d1n: "Honey Beignets", d1d: "Puffed beignets, Pendjari honey, vanilla cream",
    d2n: "Roasted Pineapple", d2d: "Penja pepper-caramelized pineapple, coconut sorbet",
    d3n: "Cacao Fondant", d3d: "Mono region cacao fondant, passion fruit coulis",
    dr1n: "Sodabi Cocktail", dr1d: "Artisanal sodabi, lime, ginger syrup, fresh mint",
    dr2n: "Prestige Bissap", dr2d: "Hibiscus infusion, vanilla, citrus",
    dr3n: "Reimagined Tchoukoutou", dr3d: "Artisanal sorghum beer, spiced notes",
    dr4n: "Baobab Juice", dr4d: "Fresh baobab fruit, cane sugar, orange blossom water",
    ps1: "12,000 F", ps2: "9,000 F", ps3: "11,000 F", ps4: "8,000 F",
    pm1: "18,000 F", pm2: "15,000 F", pm3: "24,000 F", pm4: "22,000 F", pm5: "17,000 F",
    pg1: "16,000 F", pg2: "14,000 F", pg3: "15,000 F",
    psd1: "2,000 F", psd2: "3,000 F", psd3: "2,500 F", psd4: "3,000 F",
    pd1: "7,000 F", pd2: "8,000 F", pd3: "9,000 F",
    pdr1: "6,000 F", pdr2: "3,500 F", pdr3: "4,000 F", pdr4: "3,000 F",
  }
};

let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (T[lang][key] !== undefined) {
      el.innerHTML = T[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (T[lang][key]) el.placeholder = T[lang][key];
  });
  // Update chatbot welcome if it's the first message
  const msgs = document.querySelector('.chatbot-messages');
  if (msgs && msgs.children.length === 1) {
    msgs.children[0].textContent = T[lang].chatWelcome;
  }
}

// ── Nav scroll ───────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile nav ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => links?.classList.toggle('open'));
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // Lang toggle
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Scroll animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Initialize language
  setLang('fr');
});

// ── Chatbot ──────────────────────────────────────────────
function toggleChat() {
  document.querySelector('.chatbot-window')?.classList.toggle('open');
}

function closeChat() {
  document.querySelector('.chatbot-window')?.classList.remove('open');
}

function sendChat() {
  const input = document.querySelector('.chatbot-input input');
  const msg = input.value.trim();
  if (!msg) return;
  appendMsg(msg, 'user');
  input.value = '';
  showTyping();
  const delay = 800 + Math.random() * 1200;
  setTimeout(() => {
    hideTyping();
    const reply = getBotReply(msg);
    appendMsg(reply, 'bot');
  }, delay);
}

function appendMsg(text, type) {
  const container = document.querySelector('.chatbot-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  document.querySelector('.chatbot-typing')?.classList.add('show');
  const container = document.querySelector('.chatbot-messages');
  container.scrollTop = container.scrollHeight;
}
function hideTyping() {
  document.querySelector('.chatbot-typing')?.classList.remove('show');
}

function getBotReply(msg) {
  const m = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const isFr = currentLang === 'fr';

  // Reservation
  if (/reserv|book|table/.test(m)) {
    return isFr
      ? "Avec plaisir ! Vous pouvez réserver par téléphone au +229 21 30 00 00 ou directement sur place. Nous vous recommandons de réserver au moins 24h à l'avance pour le dîner. 🍽️"
      : "Of course! You can reserve by phone at +229 21 30 00 00 or in person. We recommend booking at least 24h in advance for dinner. 🍽️";
  }

  // Top dishes / recommendations
  if (/meilleur|best|top|recommend|conseil|populaire|popular|prefer|favori|favorite/.test(m)) {
    return isFr
      ? "Nos plats les plus appréciés sont l'Amiwo Royal, le Gboma Dessi et le Wagassi Doré. Le Djidja d'Agneau est aussi un coup de cœur de nos clients ! ⭐"
      : "Our most popular dishes are the Royal Amiwo, Gboma Dessi, and Golden Wagassi. The Djidja Lamb is also a customer favorite! ⭐";
  }

  // Menu
  if (/menu|carte|plat|dish|manger|eat|food/.test(m)) {
    return isFr
      ? "Notre carte propose des entrées, plats principaux, grillades, desserts et boissons artisanales. Vous pouvez consulter la carte complète sur notre page Menu. Souhaitez-vous une recommandation ? 📖"
      : "Our menu features starters, main courses, grills, desserts, and artisanal beverages. You can browse the full menu on our Menu page. Would you like a recommendation? 📖";
  }

  // Hours / schedule
  if (/heure|hour|horaire|schedule|ouvert|open|ferm|close|quand|when/.test(m)) {
    return isFr
      ? "Nous sommes ouverts du lundi au vendredi de 12h à 15h pour le déjeuner, du mercredi au samedi de 19h à 23h pour le dîner, et le dimanche de 12h à 16h pour le brunch. Nous sommes fermés le mardi. 🕐"
      : "We're open Monday to Friday from 12 PM to 3 PM for lunch, Wednesday to Saturday from 7 PM to 11 PM for dinner, and Sunday from 12 PM to 4 PM for brunch. Closed on Tuesdays. 🕐";
  }

  // Location / address
  if (/adresse|address|ou |where|lieu|location|trouver|find|direction/.test(m)) {
    return isFr
      ? "Nous sommes situés au 42 Boulevard de la Marina, Cotonou, Bénin. Nous avons hâte de vous accueillir ! 📍"
      : "We're located at 42 Boulevard de la Marina, Cotonou, Benin. We look forward to welcoming you! 📍";
  }

  // Price
  if (/prix|price|cout|cost|cher|expensive|budget|combien|how much/.test(m)) {
    return isFr
      ? "Nos entrées démarrent à 8 000 FCFA et nos plats principaux entre 14 000 et 24 000 FCFA. N'hésitez pas à consulter notre carte complète pour tous les détails ! 💰"
      : "Our starters begin at 8,000 FCFA and main courses range from 14,000 to 24,000 FCFA. Feel free to check our full menu for all the details! 💰";
  }

  // Greeting
  if (/bonjour|bonsoir|salut|hello|hi |hey|good morning|good evening/.test(m)) {
    return isFr
      ? "Bonjour et bienvenue ! Comment puis-je vous aider aujourd'hui ? 😊"
      : "Hello and welcome! How can I help you today? 😊";
  }

  // Thanks
  if (/merci|thank|thanks/.test(m)) {
    return isFr
      ? "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. À bientôt chez Goût du Pays ! 🌿"
      : "My pleasure! Don't hesitate if you have any other questions. See you soon at Goût du Pays! 🌿";
  }

  // Vegetarian / dietary
  if (/vegeta|vegan|regime|diet|allergi|gluten|sans/.test(m)) {
    return isFr
      ? "Nous proposons plusieurs options végétariennes comme le Wagassi Doré et l'Alloco. Pour les allergies ou régimes spéciaux, notre équipe se fera un plaisir de vous accompagner. Contactez-nous au +229 21 30 00 00. 🌱"
      : "We offer several vegetarian options including the Golden Wagassi and Alloco. For allergies or special diets, our team will be happy to assist. Contact us at +229 21 30 00 00. 🌱";
  }

  // Fallback — friendly redirect to customer service
  return isFr
    ? "C'est une très bonne question ! Pour vous apporter la meilleure réponse possible, je vous invite à contacter notre service client au +229 21 30 00 00 ou par email à contact@goutdupays.bj. Notre équipe se fera un plaisir de vous aider ! 😊"
    : "That's a great question! To give you the best possible answer, I'd recommend reaching out to our customer service team at +229 21 30 00 00 or via email at contact@goutdupays.bj. They'll be happy to help! 😊";
}

// Enter key for chat
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement?.closest('.chatbot-input')) {
    sendChat();
  }
});
