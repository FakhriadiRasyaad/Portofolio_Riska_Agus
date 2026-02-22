
  /* ── cursor ── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx-5}px, ${my-5}px)`;
  });
  (function animRing(){
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.transform = `translate(${rx-17}px, ${ry-17}px)`;
    requestAnimationFrame(animRing);
  })();

  /* ── page navigation ── */
  function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.getElementById('nav-' + name).classList.add('active');
    window.scrollTo({ top:0, behavior:'smooth' });
    observeReveal();
    return false;
  }

  /* ── scroll reveal ── */
  function observeReveal() {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
  }
  observeReveal();
  document.addEventListener('DOMContentLoaded', observeReveal);

  /* ── form ── */
  function handleSubmit(btn) {
    btn.textContent = 'Mengirim...';
    btn.style.opacity = '.7';
    setTimeout(() => {
      btn.textContent = 'Terkirim ✓';
      document.getElementById('form-success').style.display = 'block';
    }, 1200);
  }

  /* prevent default on all # links */
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });
