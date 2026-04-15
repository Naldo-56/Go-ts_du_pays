var lenis = new Lenis({
  autoRaf: true,
  anchors: true,
  smoothWheel: true,
  lerp: 0.08,
});

window.addEventListener('scroll', function () {
  document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 60);
});

var weeklyDishes = [
  { nameKey: 'm1n', descKey: 'm1d', priceKey: 'pm1', img: '/images/dish-amiwo.jpg' },
  { nameKey: 'm2n', descKey: 'm2d', priceKey: 'pm2', img: '/images/dish-gboma.jpg' },
  { nameKey: 'm3n', descKey: 'm3d', priceKey: 'pm3', img: '/images/dish-amiwo.jpg' },
  { nameKey: 'm4n', descKey: 'm4d', priceKey: 'pm4', img: '/images/dish-gboma.jpg' },
  { nameKey: 'g1n', descKey: 'g1d', priceKey: 'pg1', img: '/images/dish-wagassi.jpg' },
  { nameKey: 'm5n', descKey: 'm5d', priceKey: 'pm5', img: '/images/dish-amiwo.jpg' },
  { nameKey: 'g2n', descKey: 'g2d', priceKey: 'pg2', img: '/images/dish-gboma.jpg' },
];

function getWeekNumber() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 1);
  var diff = now - start;
  var oneWeek = 604800000;
  return Math.floor(diff / oneWeek);
}

function populateWeeklyDish() {
  var el = document.getElementById('weekly-name');
  if (!el) return;
  var idx = getWeekNumber() % weeklyDishes.length;
  var dish = weeklyDishes[idx];
  var lang = currentLang;
  document.getElementById('weekly-name').textContent = T[lang][dish.nameKey];
  document.getElementById('weekly-desc').textContent = T[lang][dish.descKey];
  document.getElementById('weekly-price').textContent = T[lang][dish.priceKey];
  var img = document.getElementById('weekly-img');
  if (img) img.src = dish.img;
}

var dailyMenus = [
  { starter: 's3', main: 'm1', dessert: 'd1' },
  { starter: 's1', main: 'm2', dessert: 'd2' },
  { starter: 's4', main: 'm3', dessert: 'd3' },
  { starter: 's2', main: 'm4', dessert: 'd1' },
  { starter: 's3', main: 'm5', dessert: 'd2' },
  { starter: 's1', main: 'g1', dessert: 'd3' },
  { starter: 's4', main: 'm1', dessert: 'd2' },
];

function populateDailyMenu() {
  var el = document.getElementById('daily-starter-name');
  if (!el) return;
  var dayIndex = new Date().getDay();
  var menu = dailyMenus[dayIndex];
  var lang = currentLang;
  document.getElementById('daily-starter-name').textContent = T[lang][menu.starter + 'n'];
  document.getElementById('daily-starter-desc').textContent = T[lang][menu.starter + 'd'];
  document.getElementById('daily-main-name').textContent = T[lang][menu.main + 'n'];
  document.getElementById('daily-main-desc').textContent = T[lang][menu.main + 'd'];
  document.getElementById('daily-dessert-name').textContent = T[lang][menu.dessert + 'n'];
  document.getElementById('daily-dessert-desc').textContent = T[lang][menu.dessert + 'd'];
}

var cart = [];
var orderMode = 'takeaway';

function formatPrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
}

function renderCart() {
  var itemsEl = document.getElementById('cart-items');
  var footerEl = document.getElementById('cart-footer');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty" data-i18n="cartEmpty">' + T[currentLang].cartEmpty + '</p>';
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  var html = '';
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price * item.qty;
    html += '<div class="cart-line">'
      + '<span class="cart-line-name">' + item.name + '</span>'
      + '<span class="cart-line-qty">'
      + '<button onclick="updateCartQty(' + i + ',-1)">−</button>'
      + '<span>' + item.qty + '</span>'
      + '<button onclick="updateCartQty(' + i + ',1)">+</button>'
      + '</span>'
      + '<span class="cart-line-price">' + formatPrice(item.price * item.qty) + '</span>'
      + '</div>';
  }
  itemsEl.innerHTML = html;
  if (footerEl) footerEl.style.display = '';
  var totalEl = document.getElementById('cart-total-price');
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function addToCart(name, price) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty++;
      renderCart();
      return;
    }
  }
  cart.push({ name: name, price: price, qty: 1 });
  renderCart();
}

function updateCartQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}

function getCartTotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) total += cart[i].price * cart[i].qty;
  return total;
}

function submitOrder() {
  var lang = currentLang;
  var successEl = document.querySelector('.cart-success');
  if (successEl) successEl.classList.remove('show');

  if (cart.length === 0) {
    alert(T[lang].cartErrEmpty);
    return;
  }
  var name = document.getElementById('cart-name')?.value.trim();
  var code = document.getElementById('cart-code')?.value || '229';
  var phone = document.getElementById('cart-phone')?.value.trim();
  if (!name || !phone) {
    alert(T[lang].cartErrFields);
    return;
  }
  if (orderMode === 'delivery') {
    var address = document.getElementById('cart-address')?.value.trim();
    if (!address) {
      alert(T[lang].cartErrAddress);
      return;
    }
  }

  var fullPhone = code + phone.replace(/^0+/, '');
  var items = cart.map(function (c) {
    return { name: c.name, qty: c.qty, subtotal: c.price * c.qty };
  });

  var body = {
    name: name,
    phone: fullPhone,
    mode: orderMode,
    items: items,
    total: getCartTotal(),
    lang: lang,
  };
  if (orderMode === 'delivery') body.address = address;

  var btn = document.getElementById('cart-submit');
  if (btn) {
    btn.disabled = true;
    btn.textContent = lang === 'fr' ? 'Envoi en cours…' : 'Sending…';
  }

  fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
    .then(function (result) {
      if (result.ok) {
        cart = [];
        renderCart();
        if (successEl) {
          successEl.textContent = T[lang].cartSuccess;
          successEl.classList.add('show');
        }
        var form = document.getElementById('cart-name');
        if (form) form.value = '';
        var ph = document.getElementById('cart-phone');
        if (ph) ph.value = '';
        var addr = document.getElementById('cart-address');
        if (addr) addr.value = '';
      } else {
        alert(T[lang].cartErrGeneric);
      }
    })
    .catch(function () {
      alert(T[lang].cartErrGeneric);
    })
    .finally(function () {
      if (btn) {
        btn.disabled = false;
        btn.textContent = T[lang].cartSubmit;
      }
    });
}

document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.nav-hamburger');
  var links = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', function () { links?.classList.toggle('open'); });
  links?.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });

  document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(function (el) { observer.observe(el); });

  var resForm = document.getElementById('res-form');
  if (resForm) {
    resForm.addEventListener('submit', handleReservation);
    var dateInput = document.getElementById('res-date');
    if (dateInput) {
      var today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
  }

  var preorderBtn = document.getElementById('preorder-toggle');
  var preorderPanel = document.getElementById('res-preorder');
  if (preorderBtn && preorderPanel) {
    preorderBtn.addEventListener('click', function () {
      var hidden = preorderPanel.style.display === 'none';
      preorderPanel.style.display = hidden ? '' : 'none';
      preorderBtn.textContent = hidden
        ? (currentLang === 'fr' ? '− Masquer la pré-commande' : '− Hide pre-order')
        : T[currentLang].resPreorderToggle;
    });
  }

  document.querySelectorAll('.order-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.order-item');
      if (!item) return;
      var name = item.dataset.name;
      var price = parseInt(item.dataset.price, 10);
      addToCart(name, price);

      btn.textContent = '✓';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--bg)';
      setTimeout(function () {
        btn.textContent = '+';
        btn.style.background = '';
        btn.style.color = '';
      }, 600);
    });
  });

  document.querySelectorAll('.order-mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.order-mode-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      orderMode = btn.dataset.mode;
      var deliveryField = document.getElementById('cart-delivery-field');
      if (deliveryField) deliveryField.style.display = orderMode === 'delivery' ? '' : 'none';
    });
  });

  var cartSubmit = document.getElementById('cart-submit');
  if (cartSubmit) {
    cartSubmit.addEventListener('click', submitOrder);
  }

  var cartEl = document.getElementById('order-cart');
  if (cartEl) {
    var cartTitle = cartEl.querySelector('h3');
    if (cartTitle) {
      cartTitle.addEventListener('click', function () {
        cartEl.classList.toggle('expanded');
      });
    }
  }

  populateWeeklyDish();
  populateDailyMenu();

  setLang('fr');
});

function handleReservation(e) {
  e.preventDefault();
  var errBox = document.querySelector('.res-error');
  var successBox = document.querySelector('.res-success');
  errBox.classList.remove('show');
  successBox.classList.remove('show');

  var name = document.getElementById('res-name').value.trim();
  var code = document.getElementById('res-code').value;
  var phone = document.getElementById('res-phone').value.trim();
  var date = document.getElementById('res-date').value;
  var time = document.getElementById('res-time').value;
  var guests = document.getElementById('res-guests').value;
  var isFr = currentLang === 'fr';

  if (!name || !phone || !date || !time || !guests) {
    showResError(T[currentLang].resErrFields);
    return;
  }

  var fullPhone = code + phone.replace(/^0+/, '');

  var chosen = new Date(date + 'T00:00:00');
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosen < today) {
    showResError(T[currentLang].resErrPast);
    return;
  }

  var day = chosen.getDay();

  if (day === 1) {
    showResError(T[currentLang].resErrClosed);
    return;
  }

  if (time === 'dinner' && (day === 0 || day === 2)) {
    showResError(T[currentLang].resErrSlot);
    return;
  }
  if (time === 'brunch' && day !== 0) {
    showResError(T[currentLang].resErrSlot);
    return;
  }

  var preorders = [];
  document.querySelectorAll('input[name="preorder"]:checked').forEach(function (cb) {
    preorders.push(cb.value);
  });

  var submitBtn = document.querySelector('#res-form .btn');
  submitBtn.disabled = true;
  submitBtn.textContent = isFr ? 'Envoi en cours…' : 'Sending…';

  fetch('/api/reservation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      phone: fullPhone,
      date: date,
      time: time,
      guests: guests,
      lang: currentLang,
      preorders: preorders,
    }),
  })
    .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
    .then(function (result) {
      if (result.ok) {
        successBox.textContent = T[currentLang].resSuccess;
        successBox.classList.add('show');
        document.getElementById('res-form').reset();
        var preorderPanel = document.getElementById('res-preorder');
        if (preorderPanel) preorderPanel.style.display = 'none';
      } else {
        var key = result.data.error;
        var msg = T[currentLang]['resErr_' + key] || T[currentLang].resErrGeneric;
        showResError(msg);
      }
    })
    .catch(function () {
      showResError(T[currentLang].resErrGeneric);
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = T[currentLang].resCta;
    });
}

function showResError(msg) {
  var errBox = document.querySelector('.res-error');
  errBox.textContent = msg;
  errBox.classList.add('show');
}
