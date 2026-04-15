# Goût du Pays — Documentation Développeur

## Vue d'ensemble

Site vitrine pour un restaurant gastronomique béninois.  
Stack : **Node.js + Express** (serveur) / **HTML + CSS + JS vanilla** (client).

---

## Architecture du projet

```
Nfoxx/
├── app.js                    # Point d'entrée — crée le serveur Express
├── package.json              # Dépendances et scripts npm
│
├── config/
│   └── index.js              # Configuration (port, nom, WhatsApp API)
│
├── routes/
│   └── index.js              # Routes pages + API réservation + API commande
│
├── services/
│   └── whatsapp.js           # Envoi de messages via WhatsApp Cloud API
│
├── public/                   # Fichiers statiques servis par Express
│   ├── css/
│   │   ├── base.css          # Reset, variables CSS, typographie, utilitaires
│   │   ├── layout.css        # Nav, hero, sections, formulaire, footer, commande
│   │   ├── components.css    # Boutons, cartes, toggle langue, CTA nav
│   │   └── chatbot.css       # Widget chatbot (FAB, fenêtre, messages)
│   │
│   ├── js/
│   │   ├── i18n.js           # Traductions FR/EN et fonction setLang()
│   │   ├── chatbot.js        # Chatbot intelligent (détection langue, NLP)
│   │   └── main.js           # Lenis, DOM, réservation, commande, animations
│   │
│   ├── images/               # Images (hero, chef, plats, menu)
│   │
│   └── pages/
│       ├── index.html        # Page d'accueil (réservation, menu du jour, etc.)
│       ├── menu.html         # Page carte complète
│       └── commander.html    # Page commande en ligne (takeaway/livraison)
│
└── docs/
    └── DEVELOPER.md          # Ce fichier
```

### Séparation des responsabilités

| Couche       | Fichier(s)             | Rôle                                        |
|-------------|------------------------|---------------------------------------------|
| Serveur     | `app.js`               | Bootstrap Express, monte les middlewares     |
| Config      | `config/index.js`      | Centralise les paramètres (port, WhatsApp)   |
| Routage     | `routes/index.js`      | Pages HTML + endpoints API (réservation, commande) |
| Services    | `services/whatsapp.js` | Envoi de messages WhatsApp (réservation + commande) |
| Styles      | `public/css/*`         | 4 fichiers CSS séparés par domaine           |
| Scripts     | `public/js/*`          | 3 fichiers JS séparés par fonctionnalité     |
| Vues        | `public/pages/*`       | Pages HTML statiques                         |

---

## Installation et lancement

```bash
npm install
npm start
# → http://localhost:8080
```

### Variables d'environnement

| Variable              | Défaut          | Description                                      |
|-----------------------|-----------------|--------------------------------------------------|
| `PORT`                | `8080`          | Port d'écoute du serveur                         |
| `WA_PHONE_NUMBER_ID`  | —               | ID du numéro WhatsApp Business (Meta)            |
| `WA_ACCESS_TOKEN`      | —               | Token d'accès permanent WhatsApp Cloud API       |
| `WA_RESTAURANT_NUMBER` | `22921300000`   | Numéro WhatsApp du restaurant (avec indicatif)   |

---

## Routes

| Méthode | URL                | Handler                               |
|---------|--------------------|---------------------------------------|
| GET     | `/`                | `public/pages/index.html`             |
| GET     | `/menu`            | `public/pages/menu.html`              |
| GET     | `/commander`       | `public/pages/commander.html`         |
| POST    | `/api/reservation` | Validation + envoi WhatsApp           |
| POST    | `/api/order`       | Validation commande + envoi WhatsApp  |

---

## Horaires d'ouverture

| Jour               | Service                   |
|-------------------|---------------------------|
| Mardi – Samedi    | Déjeuner : 12h00 – 15h00 |
| Mercredi – Samedi | Dîner : 19h00 – 23h00    |
| Dimanche          | Brunch : 12h00 – 16h00   |
| Lundi             | Fermé                     |

---

## Smooth Scroll (Lenis)

Le site utilise **Lenis v1.3.21** (CDN) pour un défilement fluide premium.

- Chargé via CDN dans les trois pages HTML (CSS + JS)
- Initialisé dans `main.js` avec `autoRaf: true`, `anchors: true`, `lerp: 0.08`
- La navigation par ancres (#reserve, #story, etc.) est fluide automatiquement
- Le chatbot utilise `data-lenis-prevent` pour garder son propre scroll indépendant

---

## Système de réservation

### Parcours utilisateur

1. Le client accède au formulaire via :
   - Le bouton CTA "Réserver" dans la navigation
   - Le bouton "Réserver" dans le hero
   - Le CTA en bas de la page menu
2. Le formulaire est organisé par priorité : **Date → Créneau → Couverts → Nom → Téléphone**
3. Le champ téléphone inclut un sélecteur d'indicatif pays (20 pays)
4. Le champ date a un `min` automatique (aujourd'hui)
5. Option de **pré-commande** de plats (toggle + checkboxes)
6. La soumission envoie un `POST /api/reservation`
7. Deux messages WhatsApp sont envoyés (restaurant + client, avec pré-commande si applicable)
8. Le client voit un message de succès vert

### Validation (double : client + serveur)

1. Tous les champs requis
2. Date ≥ aujourd'hui
3. Lundi fermé (`getDay() === 1`)
4. Dîner : mercredi–samedi uniquement (jours 3–6)
5. Brunch : dimanche uniquement (jour 0)

### WhatsApp Cloud API

Module `services/whatsapp.js` — utilise l'API Graph de Meta (v21.0).

Prérequis : créer une app sur Meta for Developers, activer WhatsApp Business, obtenir Phone Number ID + Access Token permanent.

---

## Commande en ligne

### Page `/commander`

Page dédiée pour les commandes à emporter ou en livraison.

- **Toggle mode** : À emporter / Livraison (affiche le champ adresse en mode livraison)
- **Menu complet** : tous les plats organisés par catégorie avec bouton `+` pour ajouter au panier
- **Panier sticky** : sidebar fixe sur desktop, bottom sheet sur mobile
- **Mobile UX** : panier replié par défaut, s'ouvre au clic sur le titre

### Panier (client-side)

- État géré en JS (array `cart[]`)
- Chaque article : `{ name, price, qty }`
- Fonctions : `addToCart()`, `updateCartQty()`, `renderCart()`, `getCartTotal()`
- Format prix : `formatPrice()` avec séparateur de milliers

### Soumission

1. Validation : panier non vide, nom + téléphone requis, adresse si livraison
2. `POST /api/order` avec items, total, mode, contact
3. Deux messages WhatsApp : notification restaurant + confirmation client

---

## Plat signature hebdomadaire

Section "Coup de Cœur Hebdomadaire" sur la page d'accueil.

- **Rotation automatique** basée sur le numéro de semaine (`getWeekNumber()`)
- 7 plats en rotation dans `weeklyDishes[]` dans `main.js`
- Image, nom, description et prix mis à jour dynamiquement
- Traduit en FR/EN via `populateWeeklyDish()` appelé par `setLang()`

---

## Menu du jour

Section "Menu du Jour" sur la page d'accueil.

- **Rotation quotidienne** basée sur `new Date().getDay()`
- 7 menus (un par jour) dans `dailyMenus[]` dans `main.js`
- Chaque menu : Entrée + Plat + Dessert (3 cartes)
- Prix fixe affiché (22 000 FCFA)
- Traduit en FR/EN via `populateDailyMenu()` appelé par `setLang()`

---

## Recommandations du Chef

Section "Notre Sélection" sur la page d'accueil.

- 4 cartes numérotées : Entrée, Plat, Dessert, Boisson
- Sélection statique (modifiable dans `index.html`)
- Chaque carte référence les clés i18n du menu existant
- CTA "Commander cette sélection" renvoie vers `/commander`

---

## Chatbot intelligent

### Détection automatique de langue

Le chatbot analyse le message de l'utilisateur avec deux listes de mots-clés (FR/EN) et répond dans la langue détectée. Si aucune langue n'est clairement identifiée, il utilise la langue active du site (`currentLang`).

### Distinction question / affirmation

La fonction `isQuestion()` vérifie :
- La ponctuation (?) 
- Les mots interrogatifs français (comment, pourquoi, est-ce que…)
- Les mots interrogatifs anglais (how, what, where, when…)

Les réponses sont adaptées : plus informatives pour les questions, plus conversationnelles pour les affirmations.

### Intents gérés

| Intent       | Mots-clés                                     |
|-------------|-----------------------------------------------|
| Réservation | `reserv`, `book`, `table`                      |
| Recommandations | `meilleur`, `best`, `recommend`, `suggest` |
| Menu        | `menu`, `carte`, `plat`, `dish`                |
| Horaires    | `heure`, `ouvert`, `fermé`, `open`, `close`    |
| Adresse     | `adresse`, `address`, `where`, `location`      |
| Prix        | `prix`, `price`, `combien`, `how much`         |
| Salutation  | `bonjour`, `hello`, `hi`, `hey`                |
| Au revoir   | `au revoir`, `bye`, `goodbye`                  |
| Remerciement| `merci`, `thank`                               |
| Régime      | `vegetar`, `vegan`, `allergi`, `gluten`, `halal` |
| Événements  | `anniversaire`, `birthday`, `mariage`, `group` |
| Brunch      | `brunch`                                       |
| Boissons    | `cocktail`, `vin`, `sodabi`, `bissap`          |
| Chef        | `chef`, `cuisine`, `cuisinier`                 |
| Fallback    | Tout le reste                                  |

### Taille dynamique

Hauteur = `min(360 + nbMessages × 32, 70vh)` via CSS `--chat-h`.

---

## Frontend — CSS

4 fichiers chargés dans cet ordre :

1. **`base.css`** — Reset, variables `:root`, typographies, utilitaires
2. **`layout.css`** — Sections, grilles responsive (mobile → tablette → desktop)
3. **`components.css`** — Boutons, cartes, CTA nav, toggle langue
4. **`chatbot.css`** — Widget chatbot responsive

### Breakpoints responsive

| Breakpoint | Cible                                  |
|-----------|----------------------------------------|
| ≤ 400px   | Très petit mobile (form 1 col)         |
| ≤ 480px   | Mobile (hero stack, footer 1 col)      |
| ≤ 600px   | Mobile large (dishes 1 col)            |
| ≤ 640px   | Form 2 cols                            |
| ≤ 768px   | Tablette (hamburger, intro/footer 2 col) |
| ≤ 900px   | Cart mobile (bottom sheet)             |
| ≤ 1024px  | Tablette large (dishes 2 col, chef 2 col) |

### Palette

| Variable        | Valeur    | Usage                  |
|----------------|-----------|------------------------|
| `--gold`       | `#C9A84C` | Accent principal       |
| `--gold-light` | `#E2CB7D` | Hover                  |
| `--bg`         | `#0E0E0E` | Fond principal         |
| `--bg-card`    | `#161616` | Fond cartes/sections   |
| `--text`       | `#F0ECE2` | Texte principal        |
| `--text-muted` | `#9A9588` | Texte secondaire       |

---

## Ajouter une page

1. Créer le fichier dans `public/pages/`
2. Ajouter la route dans `routes/index.js`
3. Inclure Lenis CSS/JS, les 4 CSS et 3 JS

## Ajouter un plat

1. Ajouter les clés dans `T.fr` et `T.en` dans `i18n.js`
2. Ajouter le `<div class="menu-item">` dans `menu.html`
3. Si le plat doit être commandable, ajouter un `<div class="order-item">` dans `commander.html`

## Modifier le menu du jour

Éditer le tableau `dailyMenus[]` dans `main.js`. Chaque entrée référence les préfixes de clés i18n (ex: `s1` pour `s1n` / `s1d`).

## Modifier le plat de la semaine

Éditer le tableau `weeklyDishes[]` dans `main.js`. Chaque entrée référence les clés i18n de nom, description, prix et l'image.

---

## Déploiement

```bash
WA_PHONE_NUMBER_ID=xxxxx WA_ACCESS_TOKEN=xxxxx PORT=8080 npm start
```

Aucun build step — fichiers servis en statique. Lenis chargé via CDN.
