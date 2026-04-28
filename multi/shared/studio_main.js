/**
 * Studio Main Page (멀티 컨텍스트 미리보기)
 * Phase 1A · Step 5
 *
 * URL: studio_main.html?studio=la|nyc|dallas
 *
 * 책임:
 * - URL 파라미터에서 studio 식별
 * - Studio 컨텍스트 헤더, KPI, 알림, Xiro 인사이트 렌더링
 * - v6.6 풀 운영 화면(step_main_v6.html)으로 진입 CTA
 * - HQ 복귀 경로
 */

(function StudioMain() {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    const ctx = getCurrentContext();

    // URL에 studio 파라미터 없으면 HQ로 리디렉트
    if (ctx.mode !== 'studio') {
      window.location.replace('hq_main.html');
      return;
    }

    const studio = ctx.studio;

    // 페이지 컨텍스트 색상 적용 (지점 식별색 + 상태 신호색)
    document.body.classList.add(studio.id);
    document.body.classList.add(studio.status.replace('_', '-') + '-status');
    const titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = `${studio.name} · STEP Manager`;

    // 사이드바 마운트 — Studio 컨텍스트
    StudioSwitcher.mount('#studio-switcher-sidebar', 'sidebar');

    // 사이드바 활성 상태 조정 (HQ Overview 비활성, "이 지점" 활성 시뮬)
    const navOverview = document.querySelector('[data-nav="hq-overview"]');
    navOverview?.classList.remove('active');
    const navStudio = document.querySelector('[data-nav="this-studio"]');
    navStudio?.classList.add('active');

    renderHeader(studio);
    renderHero(studio);
    renderStrip(studio);
    renderQuickStats(studio);
    renderXiroInsight(studio);
    renderAlerts(studio);
    renderBottomCTA(studio);
    bindAskXiroFAB(studio);
    bindGlobalShortcuts();

    console.log(`[Studio Main] Step 5 — ${studio.name} 컨텍스트 로드 OK`);
  }

  // ============================================================
  // Breadcrumb (글로벌 헤더 아래)
  // ============================================================
  function renderHeader(s) {
    const breadcrumb = document.getElementById('studio-breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="hq_main.html">🏢 HQ</a>
        <span class="sep">›</span>
        <span class="current">
          <span class="studio-color-dot"></span>
          ${s.name}
        </span>
      `;
    }
  }

  // ============================================================
  // Hero Section
  // ============================================================
  function renderHero(s) {
    const heroEl = document.getElementById('studio-hero');
    if (!heroEl) return;

    heroEl.innerHTML = `
      <div class="studio-hero-icon">🥋</div>
      <div class="studio-hero-text">
        <div class="studio-hero-name">
          ${s.name}
          ${heroBadge(s)}
        </div>
        <div class="studio-hero-region">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${s.region}
          <span class="meta-dot">·</span>
          <span>관장 ${s.head_instructor}</span>
          <span class="meta-dot">·</span>
          <span>사범 ${s.staff_count}명</span>
        </div>
      </div>
      <a href="../step_main_v6.html" class="studio-hero-cta">
        운영 화면 진입
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M13 5l7 7-7 7"/>
        </svg>
      </a>
    `;
  }

  function heroBadge(s) {
    if (s.status === 'at_risk') {
      return `<span class="studio-card-alert-badge risk">
        <span>⚠</span><span>주의 <span class="badge-num">${s.alerts_count}</span></span>
      </span>`;
    }
    if (s.status === 'healthy') {
      return `<span class="studio-card-alert-badge good"><span>✓</span><span>호조</span></span>`;
    }
    return `<span class="studio-card-alert-badge normal"><span>·</span><span>정상</span></span>`;
  }

  // ============================================================
  // Status Strip — 핵심 운영 상태 한 줄
  // ============================================================
  function renderStrip(s) {
    const stripEl = document.getElementById('studio-strip');
    if (!stripEl) return;

    stripEl.innerHTML = `
      <div class="studio-strip-item">
        <div class="studio-strip-label">학생수</div>
        <div class="studio-strip-value">
          <span class="num-big num">${s.students}</span>
          <span class="num-unit">명</span>
        </div>
      </div>
      <div class="studio-strip-item">
        <div class="studio-strip-label">사범</div>
        <div class="studio-strip-value">
          <span class="num-big num">${s.staff_count}</span>
          <span class="num-unit">명</span>
        </div>
      </div>
      <div class="studio-strip-item">
        <div class="studio-strip-label">오늘 진행도</div>
        <div class="studio-strip-value">
          <span class="num-big num">${(s.daily_goal_progress * 100).toFixed(0)}</span>
          <span class="num-unit">%</span>
        </div>
      </div>
      <div class="studio-strip-item">
        <div class="studio-strip-label">타임존</div>
        <div class="studio-strip-value">
          <span class="num-big num" style="font-size: 13px;">${formatTimezone(s.timezone)}</span>
        </div>
      </div>
    `;
  }

  function formatTimezone(tz) {
    const map = {
      'America/Los_Angeles': 'PT (Los Angeles)',
      'America/New_York': 'ET (New York)',
      'America/Chicago': 'CT (Chicago/Dallas)',
    };
    return map[tz] || tz;
  }

  // ============================================================
  // Quick Stats Panel (좌측)
  // ============================================================
  function renderQuickStats(s) {
    const grid = document.getElementById('studio-stats-grid');
    if (!grid) return;

    grid.innerHTML = `
      ${statCard('출석률', formatPercent(s.attendance_rate, false), '', s.attendance_trend, 'vs 지난주')}
      ${statCard('매출 MTD', formatCurrency(s.revenue_mtd), '', s.revenue_trend, 'vs 지난달')}
      ${statCard('이번주 신규', '+' + s.new_signups_week, '명', null, '명 등록')}
      ${statCard('알림', String(s.alerts_count), '건',
                 s.alerts_count > 0 ? -0.001 : 0,
                 s.alerts_count > 0 ? '확인 필요' : '문제 없음')}
    `;
  }

  function statCard(label, value, unit, trend, trendLabel) {
    let trendHTML = '';
    if (trend !== null) {
      const cls = trendClass(trend);
      const arrow = trendArrow(trend);
      const pctText = trend !== 0 && Math.abs(trend) > 0.001
        ? formatPercent(trend) + ' '
        : '';
      trendHTML = `
        <div class="studio-stat-trend ${cls}">
          ${arrow} ${pctText}<span class="trend-label">${trendLabel}</span>
        </div>
      `;
    } else {
      trendHTML = `<div class="studio-stat-trend neutral"><span class="trend-label">${trendLabel}</span></div>`;
    }

    return `
      <div class="studio-stat-card">
        <div class="studio-stat-label">
          <span>${label}</span>
        </div>
        <div class="studio-stat-value">${value}${unit ? `<span class="unit">${unit}</span>` : ''}</div>
        ${trendHTML}
      </div>
    `;
  }

  // ============================================================
  // Xiro Insight (우측 상단)
  // ============================================================
  function renderXiroInsight(s) {
    const el = document.getElementById('studio-xiro-card');
    if (!el) return;

    el.innerHTML = `
      <div class="studio-xiro-card-icon">🤖</div>
      <div class="studio-xiro-card-text">
        <div class="studio-xiro-card-meta">Xiro · ${s.name}</div>
        <div class="studio-xiro-card-body">${s.xiro_insight}</div>
      </div>
    `;
  }

  // ============================================================
  // Alerts (우측 하단)
  // ============================================================
  function renderAlerts(s) {
    const el = document.getElementById('studio-alerts');
    if (!el) return;

    const items = computeRealAlerts(s);

    if (items.length === 0) {
      el.innerHTML = `
        <div class="studio-empty-state">
          <span class="check-icon">✓</span>
          <span>긴급 항목 없음 · 정상 운영 중</span>
        </div>
      `;
      return;
    }

    el.innerHTML = `
      <div class="studio-alerts">
        ${items.map(a => `
          <div class="studio-alert ${a.severity}">
            <div class="studio-alert-dot"></div>
            <div class="studio-alert-text">
              <div class="studio-alert-label">${a.label}</div>
              <div class="studio-alert-desc">${a.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * QuickPeek과 동일한 위험 판단 로직
   */
  function computeRealAlerts(s) {
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
        desc: `지난주 대비 ${formatPercent(s.attendance_trend)} 하락 — 사범과 확인 필요`,
      });
    }
    if (s.students_trend < -3) {
      items.push({
        severity: 'warning',
        label: '학생 이탈 추세',
        desc: `이번주 ${Math.abs(s.students_trend)}명 감소 — 학부모 면담 검토`,
      });
    }
    return items;
  }

  // ============================================================
  // Bottom CTA — v6.6 진입 안내
  // ============================================================
  function renderBottomCTA(s) {
    const el = document.getElementById('studio-bottom-cta');
    if (!el) return;

    el.innerHTML = `
      <div class="studio-bottom-cta-text">
        <div class="studio-bottom-cta-title">${s.name}의 풀 운영 화면으로 이동</div>
        <div class="studio-bottom-cta-sub">
          출석 마킹, 회원 관리, 일일 브리핑, Ops Center 등 모든 일상 운영 도구가 준비되어 있습니다.
        </div>
      </div>
      <div class="studio-bottom-cta-actions">
        <a href="hq_main.html" class="studio-cta-btn studio-cta-btn-secondary">
          ← HQ로 복귀
        </a>
        <a href="../step_main_v6.html" class="studio-cta-btn studio-cta-btn-primary">
          운영 화면 진입
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    `;
  }

  // ============================================================
  // Ask Xiro FAB
  // ============================================================
  function bindAskXiroFAB(s) {
    const btn = document.getElementById('askXiroBtn');
    if (!btn) return;

    // 컨텍스트 라벨 업데이트 (HQ → 지점명)
    const ctxLabel = btn.querySelector('.ctx-label');
    if (ctxLabel) ctxLabel.textContent = s.name.replace(' Branch', '');

    btn.addEventListener('click', () => {
      showToast(`Ask Xiro · ${s.name} — Phase 2에서 정식 구현됩니다`);
    });
  }

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

  // ============================================================
  // 키보드 단축키
  // ============================================================
  function bindGlobalShortcuts() {
    document.addEventListener('keydown', e => {
      // Cmd+L — Studio Switcher 열기
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        const trigger = document.querySelector('.dojang-selector');
        if (trigger) trigger.click();
      }
      // Cmd+K — 검색 포커스
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const sidebarSearch = document.getElementById('sidebar-search-input');
        const globalSearch = document.querySelector('.global-search input');
        (sidebarSearch || globalSearch)?.focus();
      }
      // Esc — HQ 복귀
      if (e.key === 'Escape') {
        // 모달이 열려있으면 통과 (자체 처리)
        // 아니면 HQ 복귀는 너무 공격적이라 안 함, 사용자가 직접 클릭하게
      }
    });
  }
})();
