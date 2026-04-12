window.addEventListener('scroll', function () {
  document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 60);
});

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
  if (resForm) resForm.addEventListener('submit', handleReservation);

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
    }),
  })
    .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
    .then(function (result) {
      if (result.ok) {
        successBox.textContent = T[currentLang].resSuccess;
        successBox.classList.add('show');
        document.getElementById('res-form').reset();
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
