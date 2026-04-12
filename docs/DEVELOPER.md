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
│   └── index.js              # Routes pages + API réservation
│
├── services/
│   └── whatsapp.js           # Envoi de messages via WhatsApp Cloud API
│
├── public/                   # Fichiers statiques servis par Express
│   ├── css/
│   │   ├── base.css          # Reset, variables CSS, typographie, utilitaires
│   │   ├── layout.css        # Nav, hero, sections, formulaire réservation, footer
│   │   ├── components.css    # Boutons, cartes plats, toggle langue
│   │   └── chatbot.css       # Widget chatbot (FAB, fenêtre, messages)
│   │
│   ├── js/
│   │   ├── i18n.js           # Traductions FR/EN et fonction setLang()
│   │   ├── chatbot.js        # Logique chatbot (UI + réponses + taille dynamique)
│   │   └── main.js           # Init DOM, réservation API, animations
│   │
│   ├── images/               # Images (hero, chef, plats, menu)
│   │
│   └── pages/
│       ├── index.html        # Page d'accueil (avec formulaire de réservation)
│       └── menu.html         # Page carte complète
│
└── docs/
    └── DEVELOPER.md          # Ce fichier
```

### Séparation des responsabilités

| Couche       | Fichier(s)             | Rôle                                        |
|-------------|------------------------|---------------------------------------------|
| Serveur     | `app.js`               | Bootstrap Express, monte les middlewares     |
| Config      | `config/index.js`      | Centralise les paramètres (port, WhatsApp)   |
| Routage     | `routes/index.js`      | Pages HTML + endpoint API réservation        |
| Services    | `services/whatsapp.js` | Envoi de messages WhatsApp (client + restau) |
| Styles      | `public/css/*`         | 4 fichiers CSS séparés par domaine           |
| Scripts     | `public/js/*`          | 3 fichiers JS séparés par fonctionnalité     |
| Vues        | `public/pages/*`       | Pages HTML statiques                         |

---

## Installation et lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables WhatsApp (voir section ci-dessous)

# 3. Lancer le serveur
npm start

# Le site est accessible sur http://localhost:8080
```

### Variables d'environnement

| Variable              | Défaut          | Description                                      |
|-----------------------|-----------------|--------------------------------------------------|
| `PORT`                | `3000`          | Port d'écoute du serveur                         |
| `WA_PHONE_NUMBER_ID`  | —               | ID du numéro WhatsApp Business (Meta)            |
| `WA_ACCESS_TOKEN`      | —               | Token d'accès permanent WhatsApp Cloud API       |
| `WA_RESTAURANT_NUMBER` | `22921300000`   | Numéro WhatsApp du restaurant (avec indicatif)   |

---

## Routes

| Méthode | URL                | Fichier / Handler                     |
|---------|--------------------|---------------------------------------|
| GET     | `/`                | `public/pages/index.html`             |
| GET     | `/menu`            | `public/pages/menu.html`              |
| POST    | `/api/reservation` | Validation + envoi WhatsApp           |

Les fichiers statiques (CSS, JS, images) sont servis automatiquement par le middleware `express.static` monté sur `/public`.

---

## Horaires d'ouverture

Le restaurant est **ouvert du mardi au dimanche** et **fermé le lundi**.

| Jour               | Service                   |
|-------------------|---------------------------|
| Mardi – Samedi    | Déjeuner : 12h00 – 15h00 |
| Mercredi – Samedi | Dîner : 19h00 – 23h00    |
| Dimanche          | Brunch : 12h00 – 16h00   |
| Lundi             | Fermé                     |

Ces horaires sont utilisés dans le footer, le chatbot et la validation des réservations (côté client ET côté serveur).

---

## Système de réservation

### Flux complet

1. Le client remplit le formulaire (nom, indicatif + numéro WhatsApp, date, créneau, couverts)
2. Le frontend valide les champs et les disponibilités, puis envoie un `POST /api/reservation`
3. Le backend re-valide les données et appelle l'API WhatsApp Cloud
4. Deux messages sont envoyés en parallèle :
   - **Au restaurant** : notification de la nouvelle réservation
   - **Au client** : confirmation avec les détails et l'adresse
5. Le client voit un message de succès — il n'a rien d'autre à faire

### Champs du formulaire

| Champ      | ID          | Type     | Description                               |
|-----------|-------------|----------|-------------------------------------------|
| Nom       | `res-name`  | text     | Nom complet du client                     |
| Indicatif | `res-code`  | select   | Indicatif pays (+229, +33, +1, etc.)      |
| Téléphone | `res-phone` | tel      | Numéro sans indicatif ni zéro initial     |
| Date      | `res-date`  | date     | Date souhaitée                            |
| Créneau   | `res-time`  | select   | lunch / dinner / brunch                   |
| Couverts  | `res-guests`| number   | Nombre de personnes (1–20)                |

### Validation (double : client + serveur)

1. Tous les champs doivent être remplis
2. La date ne peut pas être dans le passé
3. Le lundi est fermé (`getDay() === 1`)
4. Le dîner n'est disponible que du mercredi au samedi (jours 3–6)
5. Le brunch n'est disponible que le dimanche (jour 0)

### WhatsApp Cloud API

Le module `services/whatsapp.js` utilise l'API Graph de Meta pour envoyer des messages texte.

**Prérequis :**
1. Créer une app sur [Meta for Developers](https://developers.facebook.com)
2. Activer le produit WhatsApp Business
3. Obtenir un Phone Number ID et un Access Token permanent
4. Renseigner `WA_PHONE_NUMBER_ID` et `WA_ACCESS_TOKEN` dans les variables d'environnement

Le numéro du client est reconstitué à partir de l'indicatif (`res-code`) + le numéro saisi (le zéro initial est retiré automatiquement).

---

## Frontend — Guide par fichier

### CSS

Les styles sont découpés en 4 fichiers chargés dans cet ordre :

1. **`base.css`** — Reset CSS, variables `:root` (couleurs, typographies, espacements), classes utilitaires (`.container`, `.section-pad`, `.fade-up`).
2. **`layout.css`** — Mise en page de chaque section : navigation fixe, hero plein écran, grille éditoriale intro, grille plats signatures, formulaire de réservation (avec groupe indicatif+téléphone), footer, et page menu.
3. **`components.css`** — Composants réutilisables : boutons (`.btn`, `.btn-filled`), toggle de langue (`.lang-toggle`), cartes plats (`.dish-card`).
4. **`chatbot.css`** — Widget chatbot : bouton flottant (FAB), fenêtre de chat avec hauteur dynamique, bulles de messages, animation de frappe.

#### Palette de couleurs

| Variable        | Valeur    | Usage                  |
|----------------|-----------|------------------------|
| `--gold`       | `#C9A84C` | Accent principal       |
| `--gold-light` | `#E2CB7D` | Hover                  |
| `--bg`         | `#0E0E0E` | Fond principal         |
| `--bg-card`    | `#161616` | Fond cartes/sections   |
| `--text`       | `#F0ECE2` | Texte principal        |
| `--text-muted` | `#9A9588` | Texte secondaire       |

#### Typographies

- **Playfair Display** (`--serif`) — Titres
- **Cormorant Garamond** (`--serif-body`) — Corps de texte
- **Lato** (`--sans`) — Labels, boutons, UI

### JavaScript

Les scripts sont chargés en fin de `<body>` dans cet ordre :

1. **`i18n.js`** — Dictionnaires de traduction `T.fr` / `T.en` et la fonction `setLang(lang)`. Expose la variable globale `currentLang`.
2. **`chatbot.js`** — Fonctions `toggleChat()`, `closeChat()`, `sendChat()`, `getBotReply()`. Les réponses sont retardées de 0.8–2s avec une animation de frappe. La fenêtre grandit dynamiquement via la variable CSS `--chat-h` (plafonnée à 70vh).
3. **`main.js`** — Au `DOMContentLoaded` : initialise le hamburger mobile, les boutons de langue, l'IntersectionObserver pour les animations au scroll, le formulaire de réservation (POST vers `/api/reservation`), et appelle `setLang('fr')`.

### Système i18n

Les éléments HTML utilisent l'attribut `data-i18n="clé"` pour le contenu texte et `data-i18n-placeholder="clé"` pour les placeholders. La fonction `setLang()` parcourt le DOM et remplace le contenu à la volée.

```html
<h2 data-i18n="dishesH2">Nos Plats Signatures</h2>
```

Pour ajouter une traduction : ajouter la clé dans les deux objets `T.fr` et `T.en` dans `i18n.js`, puis utiliser `data-i18n="maClé"` dans le HTML.

### Chatbot

Le chatbot utilise un système de pattern matching par regex dans `getBotReply()`. Catégories gérées :

| Intent           | Mots-clés détectés                                    |
|-----------------|------------------------------------------------------|
| Réservation     | `reserv`, `book`, `table`                             |
| Recommandations | `meilleur`, `best`, `top`, `recommend`, `populaire`   |
| Menu            | `menu`, `carte`, `plat`, `dish`, `manger`             |
| Horaires        | `heure`, `hour`, `ouvert`, `open`, `fermé`, `close`   |
| Adresse         | `adresse`, `address`, `where`, `location`             |
| Prix            | `prix`, `price`, `combien`, `how much`                |
| Salutation      | `bonjour`, `hello`, `hi`, `hey`                       |
| Remerciement    | `merci`, `thank`                                      |
| Régime          | `vegetar`, `vegan`, `allergi`, `gluten`               |
| **Fallback**    | *Tout le reste* — redirige vers le service client     |

#### Taille dynamique

La fenêtre du chatbot grandit automatiquement à chaque message. La hauteur est calculée par `growChat()` :

```
hauteur = min(360 + nbMessages × 32, 70% de la hauteur de l'écran)
```

Cette valeur est appliquée via la variable CSS `--chat-h`.

---

## Ajouter une page

1. Créer le fichier HTML dans `public/pages/`.
2. Ajouter la route dans `routes/index.js` :
   ```js
   router.get('/ma-page', (req, res) => {
     res.sendFile(path.join(pagesDir, 'ma-page.html'));
   });
   ```
3. Inclure les 4 CSS et 3 JS dans le `<head>` et fin de `<body>`.

## Ajouter un plat au menu

1. Ajouter les clés de traduction (nom, description, prix) dans `T.fr` et `T.en` dans `public/js/i18n.js`.
2. Ajouter le bloc HTML `<div class="menu-item">` dans la catégorie correspondante dans `public/pages/menu.html`.

---

## Déploiement

Le projet est prêt pour un déploiement sur toute plateforme supportant Node.js (Render, Railway, Heroku, VPS, etc.) :

```bash
WA_PHONE_NUMBER_ID=xxxxx WA_ACCESS_TOKEN=xxxxx PORT=8080 npm start
```

Aucun build step nécessaire — les fichiers sont servis en statique.
