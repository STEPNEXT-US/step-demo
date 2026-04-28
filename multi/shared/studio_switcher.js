/**
 * Studio Switcher Component
 * — 헤더 좌측 드롭다운으로 컨텍스트 전환
 * — HQ ↔ Studio (LA/NYC/Dallas) ↔ 지점 추가
 *
 * 사용법:
 *   <div id="studio-switcher"></div>
 *   <script>
 *     StudioSwitcher.mount('#studio-switcher');
 *   </script>
 */

const StudioSwitcher = {
  /**
   * mount(selector, mode)
   * - mode: 'header' (기본, 인라인 칩) | 'sidebar' (사이드바 셀렉터, 풀폭)
   */
  mount(selector, mode = 'header') {
    const container = document.querySelector(selector);
    if (!container) return;

    const ctx = getCurrentContext();
    container.innerHTML = mode === 'sidebar'
      ? this.renderSidebar(ctx)
      : this.render(ctx);
    this.bindEvents(container, ctx);
  },

  render(ctx) {
    const isHQ = ctx.mode === 'hq';
    const current = isHQ
      ? { name: 'HQ', sub: '전체 보기', icon: '🏢', color: '#6B6B78' }
      : { name: ctx.studio.name, sub: ctx.studio.region, icon: '🥋', color: ctx.studio.color };

    return `
      <div class="ss-trigger" data-action="toggle">
        <div class="ss-current-icon" style="background: ${isHQ ? '#F1F1F4' : current.color + '15'}; color: ${current.color};">
          ${current.icon}
        </div>
        <div class="ss-current-text">
          <div class="ss-current-name">${current.name}</div>
          <div class="ss-current-sub">${current.sub}</div>
        </div>
        <svg class="ss-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      ${this.dropdownHTML(ctx)}
    `;
  },

  /**
   * 사이드바 모드 — v6.6의 .dojang-selector 자리에 들어가는 풀폭 셀렉터
   */
  renderSidebar(ctx) {
    const isHQ = ctx.mode === 'hq';
    return `
      <div class="dojang-selector ${isHQ ? 'is-hq' : ''}" data-action="toggle">
        <div class="dojang-selector-left">
          <div class="dojang-selector-icon">${isHQ ? '🏢' : '🥋'}</div>
          <div class="dojang-selector-text">
            <div class="dojang-name">${isHQ ? 'HQ · 전체 보기' : ctx.studio.name}</div>
            <div class="dojang-sub">${isHQ ? `3개 지점 통합` : ctx.studio.region}</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9B9BA8" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>

      ${this.dropdownHTML(ctx)}
    `;
  },

  dropdownHTML(ctx) {
    const isHQ = ctx.mode === 'hq';
    return `
      <div class="ss-dropdown" id="ss-dropdown" hidden>
        <div class="ss-section-label">전체 보기</div>
        <a href="hq_main.html" class="ss-item ${isHQ ? 'active' : ''}">
          <div class="ss-item-icon hq">🏢</div>
          <div class="ss-item-text">
            <div class="ss-item-name">HQ <span class="ss-item-tag">본부</span></div>
            <div class="ss-item-sub">3개 지점 통합 뷰</div>
          </div>
          ${isHQ ? '<div class="ss-checkmark">✓</div>' : ''}
        </a>

        <div class="ss-divider"></div>
        <div class="ss-section-label">지점</div>
        ${Object.values(STUDIOS).map(s => {
          const isCurrent = !isHQ && ctx.studio.id === s.id;
          return `
            <a href="../step_main_v6.html?studio=${s.id}" class="ss-item ${isCurrent ? 'active' : ''}">
              <div class="ss-item-icon" style="background: ${s.color}15; color: ${s.color};">🥋</div>
              <div class="ss-item-text">
                <div class="ss-item-name">${s.name} ${this.statusBadge(s.status)}</div>
                <div class="ss-item-sub">${s.region} · 학생 ${s.students}명</div>
              </div>
              ${isCurrent ? '<div class="ss-checkmark">✓</div>' : ''}
            </a>
          `;
        }).join('')}

        <div class="ss-divider"></div>
        <a href="hq_studio_add.html" class="ss-item ss-add">
          <div class="ss-item-icon add">+</div>
          <div class="ss-item-text">
            <div class="ss-item-name">지점 추가</div>
            <div class="ss-item-sub">새 도장 등록 ($249/mo · 다지점 할인 적용)</div>
          </div>
        </a>
      </div>
    `;
  },

  statusBadge(status) {
    if (status === 'at_risk') return '<span class="ss-status-dot risk" title="주의"></span>';
    if (status === 'healthy') return '<span class="ss-status-dot good" title="호조"></span>';
    return '';
  },

  bindEvents(container, ctx) {
    // 헤더 모드 또는 사이드바 모드 둘 다 지원
    const trigger = container.querySelector('.ss-trigger, .dojang-selector');
    const dropdown = container.querySelector('#ss-dropdown');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.hidden = !dropdown.hidden;
      trigger.classList.toggle('open', !dropdown.hidden);
    });

    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.hidden = true;
        trigger.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !dropdown.hidden) {
        dropdown.hidden = true;
        trigger.classList.remove('open');
      }
    });
  },
};
