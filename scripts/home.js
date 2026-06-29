/* ============================================
   열정 오리 포트폴리오 - About 페이지 스크립트
   ============================================ */

/* ---- 프로그램 숙련도: data-level 숫자만큼 땀방울 채우기 ---- */
document.querySelectorAll('.skills li').forEach((li) => {
  const level = Number(li.dataset.level) || 0; // 1~5
  const drops = li.querySelector('.drops');
  for (let i = 1; i <= 5; i++) {
    const drop = document.createElement('i');
    if (i <= level) drop.classList.add('on');
    drops.appendChild(drop);
  }
});
