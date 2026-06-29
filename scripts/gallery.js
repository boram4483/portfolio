/* ============================================
   작업물 갤러리 (라이트박스)
   - work-card 에 data-images="경로1, 경로2, ..." 를 쓰면
     카드를 눌렀을 때 이미지들을 넘겨볼 수 있어요
   ============================================ */

(function () {
  const cards = document.querySelectorAll('.work-card[data-images]');
  if (!cards.length) return;

  /* ---- 라이트박스 뼈대를 한 번만 만들어 둠 ---- */
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <div class="lb-box" role="dialog" aria-modal="true">
      <div class="lb-head">
        <h3 class="lb-title"></h3>
        <span class="lb-counter"></span>
        <button class="lb-close" aria-label="닫기">×</button>
      </div>
      <div class="lb-stage"><img alt="" /></div>
      <button class="lb-prev" aria-label="이전 이미지">‹</button>
      <button class="lb-next" aria-label="다음 이미지">›</button>
    </div>`;
  document.body.appendChild(lb);

  const img     = lb.querySelector('.lb-stage img');
  const stage   = lb.querySelector('.lb-stage');
  const title   = lb.querySelector('.lb-title');
  const counter = lb.querySelector('.lb-counter');

  let list = [];
  let idx = 0;

  function show(i) {
    idx = (i + list.length) % list.length;        // 끝에서 처음으로 순환
    img.src = list[idx];
    counter.textContent = `${idx + 1} / ${list.length}`;
    stage.scrollTop = 0;                          // 긴 이미지는 맨 위부터
    /* 이미지가 1장이면 화살표 숨김 */
    lb.querySelector('.lb-prev').style.display =
    lb.querySelector('.lb-next').style.display = list.length > 1 ? '' : 'none';
  }

  function open(card) {
    list = card.dataset.images.split(',').map((s) => s.trim()).filter(Boolean);
    if (!list.length) return;
    title.textContent = card.dataset.title || card.querySelector('h3')?.textContent || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';      // 뒤 배경 스크롤 잠금
    show(0);
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
  }

  /* ---- 카드 클릭으로 열기 + 장수 배지 달기 ---- */
  cards.forEach((card) => {
    const n = card.dataset.images.split(',').filter((s) => s.trim()).length;
    if (n > 1) {
      const badge = document.createElement('span');
      badge.className = 'count';
      badge.textContent = `${n}장`;
      card.querySelector('.thumb')?.appendChild(badge);
    }
    card.addEventListener('click', (e) => {
      e.preventDefault();
      open(card);
    });
  });

  /* ---- 닫기/이동 ---- */
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });  // 바깥 클릭

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
