/**
 * HQ Main Page — 정식 분리된 JS
 * Phase 1A · Step 4
 *
 * 책임:
 * - 페이지 인사말, Briefing, KPI Strip, Studio Comparison Board, HQ Actions 바인딩
 * - 빠른 보기 모달 (Quick Peek)
 * - 키보드 단축키 (Esc, Cmd+L)
 * - Ask Xiro FAB 임시 핸들러 (Phase 2에서 정식 챗 패널)
 *
 * 의존성:
 * - multi_data.js (STUDIOS, computeNetworkKPI, generateXiroBriefing, formatters)
 * - studio_switcher.js (StudioSwitcher.mount)
 */

(function HQMain() {
  'use strict';

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    mountStudioSwitcher();
    renderPageGreeting();
    renderBriefing();
    renderKPIStrip();
    renderStudioBoard();
    bindGlobalShortcuts();
    bindAskXiroFAB();
    QuickPeek.init();

    console.log('[HQ Main] Step 4 — 정식 JS 분리 + 빠른 보기 모달 OK');
  }

  // ============================================================
  // 0. Studio Switcher
  // ============================================================
  function mountStudioSwitcher() {
    StudioSwitcher.mount('#studio-switcher-sidebar', 'sidebar');
  }

  // ============================================================
  // 페이지 인사말 (날짜 + 컨텍스트)
  // ============================================================
  function renderPageGreeting() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
    });
    const el = document.getElementById('page-date-str');
    if (el) el.textContent = dateStr;
  }

  // ============================================================
  // ① HQ Briefing
  // ============================================================
  function renderBriefing() {
    const brief = generateXiroBriefing();
    const briefingEl = document.getElementById('hq-briefing');
    const headlineEl = document.getElementById('briefing-headline');
    const bulletsEl = document.getElementById('briefing-bullets');
    const dateEl = document.getElementById('briefing-date');
    const ctaEl = document.getElementById('briefing-cta');
    const ctaLabelEl = document.getElementById('briefing-cta-label');

    if (dateEl) dateEl.textContent = brief.date;

    // Headline에서 위기 지점명 강조
    const hasRisk = brief.bullets.some(b => b.severity === 'risk');
    if (hasRisk) {
      briefingEl?.classList.add('has-risk');
      const riskBullet = brief.bullets.find(b => b.severity === 'risk');
      const studioName = STUDIOS[riskBullet.studio_id].name;
      if (headlineEl) {
        headlineEl.innerHTML = brief.headline.replace(
          studioName,
          `<span class="risk-emphasis">${studioName}</span>`
        );
      }
    } else if (headlineEl) {
      headlineEl.textContent = brief.headline;
    }

    // Bullets — 지점명 굵게
    if (bulletsEl) {
      bulletsEl.innerHTML = brief.bullets.map(b => {
        const studio = STUDIOS[b.studio_id];
        const text = b.text.replace(
          studio.name,
          `<span class="studio-name">${studio.name}</span>`
        );
        return `
          <div class="hq-briefing-bullet" data-studio="${b.studio_id}">
            <span class="sev-dot ${b.severity}"></span>
            <span>${text}</span>
          </div>
        `;
      }).join('');

      // Bullet 클릭 → 빠른 보기
      bulletsEl.querySelectorAll('.hq-briefing-bullet').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          const sid = el.dataset.studio;
          if (sid) QuickPeek.open(sid);
        });
      });
    }

    // CTA
    if (ctaLabelEl) ctaLabelEl.textContent = brief.cta_label;
    if (ctaEl) {
      ctaEl.href = brief.cta_studio
        ? `studio_main.html?studio=${brief.cta_studio}`
        : '#';
    }
  }

  // ============================================================
  // ② Network KPI Strip
  // ============================================================
  function renderKPIStrip() {
    const kpi = computeNetworkKPI();

    setEl('kpi-revenue', formatCurrency(kpi.total_revenue));
    setEl('kpi-students', kpi.total_students.toLocaleString());

    const attEl = document.getElementById('kpi-attendance');
    if (attEl) {
      attEl.innerHTML = formatPercent(kpi.avg_attendance, false)
        .replace('%', '<span class="unit">%</span>');
    }

    setEl('kpi-signups', '+' + kpi.total_new);

    setTrend('kpi-revenue-trend', kpi.revenue_trend);
    setTrend(
      'kpi-students-trend',
      kpi.students_trend > 0 ? 0.001 : (kpi.students_trend < 0 ? -0.001 : 0),
      (kpi.students_trend > 0 ? '+' : '') + kpi.students_trend + '명'
    );
    setTrend('kpi-attendance-trend', kpi.attendance_trend);
  }

  function setEl(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setTrend(id, value, label, inverse = false) {
    const el = document.getElementById(id);
    if (!el) return;
    const cls = trendClass(value, inverse);
    el.className = 'trend-badge ' + cls;
    el.textContent = trendArrow(value) + ' ' + (label || formatPercent(value));
  }

  // ============================================================
  // ③ Studio Comparison Board
  // ============================================================
  const STATUS_ORDER = { at_risk: 0, normal: 1, healthy: 2 };
  let currentSort = 'status';

  const SORT_FNS = {
    status: list => [...list].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]),
    revenue: list => [...list].sort((a, b) => b.revenue_mtd - a.revenue_mtd),
    students: list => [...list].sort((a, b) => b.students - a.students),
  };

  function renderStudioBoard() {
    renderCards(currentSort);
    bindSortButtons();
  }

  function renderCards(sortKey) {
    const grid = document.getElementById('board-grid');
    if (!grid) return;
    const studios = Object.values(STUDIOS);
    const sorted = SORT_FNS[sortKey](studios);
    grid.innerHTML = sorted.map(studioCardHTML).join('');
    bindCardEvents(grid);
  }

  function studioCardHTML(s) {
    return `
      <a href="studio_main.html?studio=${s.id}" class="studio-card ${s.status}" data-studio="${s.id}">
        <div class="studio-card-head">
          <div class="studio-card-title-wrap">
            <div class="studio-card-name">
              <span class="status-dot ${s.status}"></span>
              ${s.name}
            </div>
            <div class="studio-card-region">
              <svg class="region-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              ${s.region}
            </div>
          </div>
          ${statusBadge(s)}
        </div>

        <div class="studio-card-metrics">
          <div class="studio-metric">
            <div class="studio-metric-label">출석률</div>
            <div class="studio-metric-value">${formatPercent(s.attendance_rate, false)}</div>
            <div class="studio-metric-trend ${trendClass(s.attendance_trend)}">
              ${trendArrow(s.attendance_trend)} ${formatPercent(s.attendance_trend)}
            </div>
          </div>
          <div class="studio-metric">
            <div class="studio-metric-label">매출 MTD</div>
            <div class="studio-metric-value">${formatCurrency(s.revenue_mtd)}</div>
            <div class="studio-metric-trend ${trendClass(s.revenue_trend)}">
              ${trendArrow(s.revenue_trend)} ${formatPercent(s.revenue_trend)}
            </div>
          </div>
          <div class="studio-metric">
            <div class="studio-metric-label">학생수</div>
            <div class="studio-metric-value">${s.students}</div>
            <div class="studio-metric-trend ${s.students_trend > 0 ? 'up' : (s.students_trend < 0 ? 'down' : 'neutral')}">
              ${s.students_trend > 0 ? '▲' : (s.students_trend < 0 ? '▼' : '–')} ${s.students_trend > 0 ? '+' : ''}${s.students_trend}
            </div>
          </div>
        </div>

        <div class="studio-card-progress">
          <span class="studio-card-progress-label">오늘 진행도</span>
          <div class="studio-card-progress-bar">
            <div class="studio-card-progress-fill" style="width: ${(s.daily_goal_progress * 100).toFixed(0)}%;"></div>
          </div>
          <span class="studio-card-progress-pct">${(s.daily_goal_progress * 100).toFixed(0)}%</span>
        </div>

        <div class="studio-card-xiro">
          <span class="studio-card-xiro-icon">🤖</span>
          <span>${s.xiro_insight}</span>
        </div>

        <div class="studio-card-foot">
          <span class="studio-card-btn studio-card-btn-primary">지점 진입 →</span>
          <button type="button" class="studio-card-btn studio-card-btn-secondary" data-action="quick-peek" data-studio="${s.id}">
            빠른 보기
          </button>
        </div>
      </a>
    `;
  }

  function statusBadge(s) {
    if (s.status === 'at_risk') {
      return `<span class="studio-card-alert-badge risk">
        <span>⚠</span><span>주의 <span class="badge-num">${s.alerts_count}</span></span>
      </span>`;
    }
    if (s.status === 'healthy') {
      return `<span class="studio-card-alert-badge good">
        <span>✓</span><span>호조</span>
      </span>`;
    }
    return `<span class="studio-card-alert-badge normal">
      <span>·</span><span>정상</span>
    </span>`;
  }

  function bindCardEvents(grid) {
    grid.querySelectorAll('[data-action="quick-peek"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const sid = btn.dataset.studio;
        QuickPeek.open(sid);
      });
    });
  }

  function bindSortButtons() {
    document.querySelectorAll('.hq-board-action').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.hq-board-action').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentSort = btn.dataset.sort;
        renderCards(currentSort);
      });
    });
  }

  // ============================================================
  // 빠른 보기 모달 (Quick Peek)
  // ============================================================
  const QuickPeek = {
    el: null,
    backdropEl: null,
    contentEl: null,
    currentStudioId: null,

    init() {
      this.create();
      this.bindEvents();
    },

    create() {
      // 모달 DOM 한 번만 생성, 재사용
      const wrap = document.createElement('div');
      wrap.className = 'quick-peek';
      wrap.id = 'quickPeek';
      wrap.setAttribute('aria-modal', 'true');
      wrap.setAttribute('role', 'dialog');
      wrap.hidden = true;
      wrap.innerHTML = `
        <div class="qp-backdrop" data-action="close"></div>
        <div class="qp-modal" role="document">
          <div class="qp-content"></div>
        </div>
      `;
      document.body.appendChild(wrap);
      this.el = wrap;
      this.backdropEl = wrap.querySelector('.qp-backdrop');
      this.contentEl = wrap.querySelector('.qp-content');
    },

    bindEvents() {
      // 배경/X 클릭 닫기
      this.el.addEventListener('click', e => {
        const action = e.target.closest('[data-action]')?.dataset.action;
        if (action === 'close') this.close();
      });

      // Esc 닫기
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !this.el.hidden) {
          e.preventDefault();
          this.close();
        }
      });
    },

    open(studioId) {
      const studio = STUDIOS[studioId];
      if (!studio) return;
      this.currentStudioId = studioId;
      this.contentEl.innerHTML = this.render(studio);
      this.el.hidden = false;
      // 애니메이션 트리거
      requestAnimationFrame(() => this.el.classList.add('open'));
      // 포커스 이동 + 스크롤 잠금
      document.body.style.overflow = 'hidden';
      const closeBtn = this.contentEl.querySelector('[data-action="close"]');
      closeBtn?.focus();
    },

    close() {
      this.el.classList.remove('open');
      // 트랜지션 후 hidden
      setTimeout(() => {
        this.el.hidden = true;
        document.body.style.overflow = '';
        this.currentStudioId = null;
      }, 180);
    },

    render(s) {
      const alertItems = this.computeAlerts(s);
      const alertsHTML = alertItems.length > 0
        ? this.renderAlerts(alertItems)
        : this.renderNormalState(s);

      return `
        <button class="qp-close" data-action="close" aria-label="닫기" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <header class="qp-header ${s.status}">
          <div class="qp-header-left">
            <div class="qp-icon" style="background: ${s.color}15; color: ${s.color};">🥋</div>
            <div class="qp-header-text">
              <div class="qp-header-title">
                <span class="status-dot ${s.status}"></span>
                ${s.name}
              </div>
              <div class="qp-header-sub">
                ${s.region} · 학생 ${s.students}명 · 사범 ${s.staff_count}명
              </div>
            </div>
          </div>
          ${statusBadge(s)}
        </header>

        <div class="qp-section">
          <div class="qp-section-label">📊 KPI 요약</div>
          <div class="qp-metrics">
            <div class="qp-metric">
              <div class="qp-metric-label">출석률</div>
              <div class="qp-metric-value">${formatPercent(s.attendance_rate, false)}</div>
              <div class="qp-metric-trend ${trendClass(s.attendance_trend)}">
                ${trendArrow(s.attendance_trend)} ${formatPercent(s.attendance_trend)} <span class="qp-metric-sub">vs 지난주</span>
              </div>
            </div>
            <div class="qp-metric">
              <div class="qp-metric-label">매출 MTD</div>
              <div class="qp-metric-value">${formatCurrency(s.revenue_mtd)}</div>
              <div class="qp-metric-trend ${trendClass(s.revenue_trend)}">
                ${trendArrow(s.revenue_trend)} ${formatPercent(s.revenue_trend)} <span class="qp-metric-sub">vs 지난달</span>
              </div>
            </div>
            <div class="qp-metric">
              <div class="qp-metric-label">학생수</div>
              <div class="qp-metric-value">${s.students}</div>
              <div class="qp-metric-trend ${s.students_trend > 0 ? 'up' : (s.students_trend < 0 ? 'down' : 'neutral')}">
                ${s.students_trend > 0 ? '▲' : (s.students_trend < 0 ? '▼' : '–')} ${s.students_trend > 0 ? '+' : ''}${s.students_trend}명 <span class="qp-metric-sub">이번주</span>
              </div>
            </div>
          </div>
        </div>

        ${alertsHTML}

        <div class="qp-section">
          <div class="qp-section-label">🤖 Xiro 인사이트</div>
          <div class="qp-xiro">
            <div class="qp-xiro-icon">🤖</div>
            <div class="qp-xiro-text">
              <div class="qp-xiro-meta">Xiro · ${s.name}</div>
              <div class="qp-xiro-body">${s.xiro_insight}</div>
            </div>
          </div>
        </div>

        <footer class="qp-footer">
          <button class="qp-btn qp-btn-secondary" data-action="close" type="button">
            닫기
            <span class="qp-kbd">Esc</span>
          </button>
          <a href="studio_main.html?studio=${s.id}" class="qp-btn qp-btn-primary">
            지점 진입
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
        </footer>
      `;
    },

    /**
     * 실제 위험 조건만 alerts로 카운트 — 단순 alerts_count는 무시
     */
    computeAlerts(s) {
      const items = [];
      if (s.payment_failed > 0) {
        items.push({
          severity: 'risk',
          label: '결제 실패',
          desc: `${s.payment_failed}건의 학부모 결제가 실패했습니다`,
        });
      }
      if (s.attendance_trend < -0.05) {
        items.push({
          severity: 'risk',
          label: '출석률 급락',
          desc: `지난주 대비 ${formatPercent(s.attendance_trend)} 하락`,
        });
      }
      if (s.students_trend < -3) {
        items.push({
          severity: 'warning',
          label: '학생 이탈 추세',
          desc: `이번주 ${Math.abs(s.students_trend)}명 감소`,
        });
      }
      return items;
    },

    renderAlerts(items) {
      return `
        <div class="qp-section">
          <div class="qp-section-label">🚨 긴급 항목 <span class="qp-count">${items.length}</span></div>
          <div class="qp-alerts">
            ${items.map(a => `
              <div class="qp-alert ${a.severity}">
                <div class="qp-alert-dot"></div>
                <div class="qp-alert-text">
                  <div class="qp-alert-label">${a.label}</div>
                  <div class="qp-alert-desc">${a.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    renderNormalState(s) {
      return `
        <div class="qp-section">
          <div class="qp-normal-state">
            <span class="qp-normal-icon">✓</span>
            <span>긴급 항목 없음 · 정상 운영 중</span>
          </div>
        </div>
      `;
    },
  };

  // ============================================================
  // 키보드 단축키
  // ============================================================
  function bindGlobalShortcuts() {
    document.addEventListener('keydown', e => {
      // Cmd+L (or Ctrl+L) — Studio Switcher 열기
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        const trigger = document.querySelector('.dojang-selector');
        if (trigger) trigger.click();
      }

      // Cmd+K — 검색 포커스 (사이드바 검색 우선, 없으면 글로벌)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const sidebarSearch = document.getElementById('sidebar-search-input');
        const globalSearch = document.querySelector('.global-search input');
        (sidebarSearch || globalSearch)?.focus();
      }
    });
  }

  // ============================================================
  // Ask Xiro FAB (Phase 2에서 정식 챗 패널)
  // ============================================================
  function bindAskXiroFAB() {
    const btn = document.getElementById('askXiroBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      // 임시: 토스트
      showToast('Ask Xiro 챗 패널 — Phase 2에서 정식 구현됩니다');
    });
  }

  // ============================================================
  // 토스트 (간이)
  // ============================================================
  function showToast(message) {
    let toast = document.getElementById('hq-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'hq-toast';
      toast.className = 'hq-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  // 외부 노출 (디버깅용)
  window.HQMain = { QuickPeek, renderCards };
})();
