/* ============================================
   열정 오리 포트폴리오 - 랜딩 스크립트
   ============================================ */

const duck  = document.getElementById('duck');
const stage = document.getElementById('stage');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- 클릭: 폴짝 뛰고 홈으로 이동 ---- */
const HOME_URL = 'about.html'; /* ← 이동할 페이지 주소를 여기서 바꾸세요 */

duck.addEventListener('click', () => {
  if (reduceMotion) { location.href = HOME_URL; return; }
  duck.classList.add('jump');
  stage.classList.add('leaving');
  setTimeout(() => location.href = HOME_URL, 800);
});

/* ---- 가끔 땀방울이 또르륵 ---- */
function drip() {
  if (reduceMotion) return;
  const rect = duck.getBoundingClientRect();
  const drop = document.createElement('div');
  drop.className = 'drop';
  /* 오리 양옆 어딘가에서 떨어짐 */
  const side = Math.random() < 0.5 ? 0.12 : 0.88;
  drop.style.left = rect.left + rect.width * side + 'px';
  drop.style.top  = rect.top + rect.height * (0.25 + Math.random() * 0.3) + 'px';
  document.body.appendChild(drop);
  setTimeout(() => drop.remove(), 1100);
}
setInterval(drip, 1800);
