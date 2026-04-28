/**
 * HQ Main — JS (v6.6 어휘 IA)
 *
 * 책임:
 *  1. Studio Switcher 마운트
 *  2. Greeting + 날짜
 *  3. Xiro 일일 브리핑 (HQ 톤)
 *  4. KPI 3카드 (통합 출석률 / 통합 매출 / 통합 학생수)
 *  5. HQ Ops Center (지점 라벨 포함)
 *  6. 지점 운영 현황 (Live View) ⭐
 *  7. HQ Event Hub (통합 승급 심사 + 다가오는 이벤트)
 *  8. Quick Actions (정적 — HTML에 직접)
 *  9. Ask Xiro FAB (토스트만)
 * 10. 키보드 단축키 (⌘K, ⌘L)
 */

(function HQMain() {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    StudioSwitcher.mount('#studio-switcher-sidebar', 'sidebar');
    renderGreeting();
    renderBriefing();
    renderKPIs();
    renderOps();
    renderLiveView();
    renderEventHub();
    bindAskXiroFAB();
    bindGlobalShortcuts();

    console.log('[HQ Main] v6.6 IA 호환 — Live View 중심');
  }

  // ============================================================
  // 1. Greeting + 날짜
  // ============================================================
  function renderGreeting() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
    });
    document.getElementById('page-date-str').textContent = dateStr;
  }

  // ============================================================
  // 2. Xiro 일일 브리핑 — HQ 톤 (분석가)
  // ============================================================
  function renderBriefing() {
    const card = document.getElementById('hq-briefing');
    const titleEl = document.getElementById('briefing-title-text');
    const descEl = document.getElementById('briefing-desc');
    const ctaEl = document.getElementById('briefing-cta');

    const studios = Object.values(STUDIOS);
    const at_risk = studios.filter(s => s.status === 'at_risk');

    const today = new Date();
    const dateText = `${today.getMonth() + 1}월 ${today.getDate()}일`;

    if (at_risk.length > 0) {
      // 위험 신호 있음 — 분석가 톤
      const main = at_risk[0];
      card.classList.add('has-risk');
      titleEl.textContent = `Xiro의 ${dateText} HQ 통합 브리핑입니다.`;

      // 분석가 톤: 데이터 우선
      const trend = formatPercent(main.attendance_trend);
      const otherCount = studios.length - at_risk.length;
      descEl.innerHTML = `
        <strong>${main.name}</strong>가 가장 주의를 요합니다 — 출석률 <strong class="risk-emphasis">${trend}</strong> (지난주 대비)${
          main.payment_failed > 0 ? `, 결제 실패 <strong>${main.payment_failed}건</strong> 동반` : ''
        }. 나머지 <strong>${otherCount}개 지점</strong>은 안정 추세입니다.
      `;

      ctaEl.onclick = () => {
        window.location.href = `../step_main_v6.html?studio=${main.id}`;
      };
    } else {
      // 모두 정상
      titleEl.textContent = `Xiro의 ${dateText} HQ 통합 브리핑입니다.`;
      descEl.innerHTML = `
        <strong>${studios.length}개 지점</strong> 모두 정상 운영 중입니다. 
        오늘 통합 출석 예상 <strong>${(computeNetworkKPI().avg_attendance * 100).toFixed(0)}%</strong>.
      `;
      ctaEl.onclick = () => showToast('Briefing Details — Phase 2에서 정식 구현');
    }
  }

  // ============================================================
  // 3. KPI 3카드
  // ============================================================
  function renderKPIs() {
    const kpi = computeNetworkKPI();
    const studios = Object.values(STUDIOS);

    // KPI 1: 통합 출석률
    document.getElementById('kpi-attendance').innerHTML = `
      <span class="num">${(kpi.avg_attendance * 100).toFixed(1)}</span><span class="kpi-unit">%</span>
    `;
    const attTrend = document.getElementById('kpi-attendance-trend');
    attTrend.className = 'kpi-trend ' + trendClass(kpi.attendance_trend);
    attTrend.textContent = `${trendArrow(kpi.attendance_trend)} ${formatPercent(kpi.attendance_trend)}`;

    const at_risk_studios = studios.filter(s => s.status === 'at_risk');
    document.getElementById('kpi-attendance-meta').innerHTML = at_risk_studios.length > 0
      ? `<strong>${at_risk_studios[0].name}</strong> 위험 · ${studios.length - at_risk_studios.length}개 지점 안정`
      : `${studios.length}개 지점 평균`;

    // 지점별 status dots
    const dotsEl = document.getElementById('kpi-attendance-dots');
    dotsEl.innerHTML = studios.map(s => `
      <span class="sd ${s.status}" title="${s.name}: ${(s.attendance_rate * 100).toFixed(0)}%"></span>
    `).join('');

    // KPI 2: 통합 매출
    document.getElementById('kpi-revenue').textContent = formatCurrency(kpi.total_revenue);
    const revTrend = document.getElementById('kpi-revenue-trend');
    revTrend.className = 'kpi-trend ' + trendClass(kpi.revenue_trend);
    revTrend.textContent = `${trendArrow(kpi.revenue_trend)} ${formatPercent(kpi.revenue_trend)}`;

    const totalPending = studios.reduce((acc, s) => acc + s.payment_failed, 0);
    document.getElementById('kpi-revenue-meta').innerHTML = totalPending > 0
      ? `미납 <strong>${totalPending}건</strong> · ${studios.length}개 지점 합산`
      : `${studios.length}개 지점 합산`;

    // 지점별 매출 mini bars
    const barsEl = document.getElementById('kpi-revenue-bars');
    const maxRev = Math.max(...studios.map(s => s.revenue_mtd));
    barsEl.innerHTML = studios.map(s => {
      const h = (s.revenue_mtd / maxRev) * 100;
      const cls = s.revenue_trend < 0 ? 'warn' : '';
      return `<span class="bar ${cls}" style="height: ${h}%;" title="${s.name}: ${formatCurrency(s.revenue_mtd)}"></span>`;
    }).join('');

    // KPI 3: 통합 학생수
    document.getElementById('kpi-students').innerHTML = `
      ${kpi.total_students.toLocaleString()}<span class="kpi-unit">명</span>
    `;
    const stuTrend = document.getElementById('kpi-students-trend');
    const totalNew = kpi.total_new;
    stuTrend.className = 'kpi-trend ' + (totalNew > 0 ? 'up' : 'neutral');
    stuTrend.textContent = `${totalNew > 0 ? '↗' : '–'} ${totalNew > 0 ? '+' : ''}${totalNew}명`;

    const avgRetention = studios.reduce((acc, s) => acc + s.retention_rate, 0) / studios.length;
    document.getElementById('kpi-students-meta').innerHTML = `
      이번주 신규 <strong>+${totalNew}</strong>명 · 유지율 ${(avgRetention * 100).toFixed(0)}%
    `;

    // 신규 학생 미니 아바타 (이번주 가입 첫 글자)
    const newAvatars = ['서', '윤', '하', '민', '지'].slice(0, Math.min(3, totalNew));
    const colors = ['blue', 'amber', 'green', 'purple', 'red'];
    document.getElementById('kpi-students-avatars').innerHTML = newAvatars
      .map((name, i) => `<div class="mini-avatar ${colors[i]}">${name}</div>`)
      .join('');
  }

  // ============================================================
  // 4. HQ Ops Center
  // ============================================================
  let currentOpsFilter = 'all';

  function renderOps() {
    const counts = computeOpsCounts();
    document.getElementById('ops-count-all').textContent = counts.all;
    document.getElementById('ops-count-urgent').textContent = counts.urgent;
    document.getElementById('ops-count-routine').textContent = counts.routine;
    document.getElementById('ops-count-insight').textContent = counts.insight;

    renderOpsList(currentOpsFilter);

    document.querySelectorAll('.ops-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.ops-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentOpsFilter = chip.dataset.filter;
        renderOpsList(currentOpsFilter);
      });
    });
  }

  function renderOpsList(filter) {
    const list = document.getElementById('ops-list');
    const items = filter === 'all'
      ? HQ_OPS_ITEMS
      : HQ_OPS_ITEMS.filter(i => i.type === filter);

    if (items.length === 0) {
      list.innerHTML = `<div class="ops-empty">표시할 항목이 없습니다</div>`;
      return;
    }

    list.innerHTML = items.map(opsItemHTML).join('');
  }

  function opsItemHTML(item) {
    const studio = item.studio_id === 'all' ? null : STUDIOS[item.studio_id];
    const studioTag = studio
      ? `<span class="ops-studio-tag">${studio.id.toUpperCase()}</span>`
      : `<span class="ops-studio-tag">전체</span>`;

    const typeIcon = {
      urgent: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      routine: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      insight: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 21h6"/><path d="M12 3a6 6 0 016 6c0 3-3 4-3 7H9c0-3-3-4-3-7a6 6 0 016-6z"/></svg>',
    };

    const typeTag = {
      urgent: '🔴 긴급',
      routine: '📋 정규',
      insight: '💡 제안',
    };

    return `
      <div class="ops-item" data-type="${item.type}">
        <div class="ops-icon-wrap ${item.icon}">
          ${typeIcon[item.type]}
        </div>
        <div class="ops-body">
          <div class="ops-tag-row">
            <span class="ops-tag ${item.type}">${typeTag[item.type]}</span>
            ${studioTag}
          </div>
          <div class="ops-title">${item.title}</div>
          <div class="ops-meta">${item.meta}</div>
        </div>
        <button class="ops-action" onclick="event.stopPropagation(); window.HQMain && window.HQMain.toast('${item.action} — Phase 2 구현')">
          ${item.action}
        </button>
      </div>
    `;
  }

  // ============================================================
  // 5. 지점 운영 현황 — Live View ⭐
  // ============================================================
  let currentLiveSort = 'status';

  const SORT_FNS = {
    status: list => {
      const order = { at_risk: 0, normal: 1, healthy: 2 };
      return [...list].sort((a, b) => order[a.status] - order[b.status]);
    },
    revenue: list => [...list].sort((a, b) => b.revenue_mtd - a.revenue_mtd),
    students: list => [...list].sort((a, b) => b.students - a.students),
  };

  function renderLiveView() {
    renderLiveCards(currentLiveSort);

    document.querySelectorAll('.panel-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentLiveSort = tab.dataset.sort;
        renderLiveCards(currentLiveSort);
      });
    });
  }

  function renderLiveCards(sortKey) {
    const list = document.getElementById('studio-live-list');
    const studios = Object.values(STUDIOS);
    const sorted = SORT_FNS[sortKey](studios);
    list.innerHTML = sorted.map(liveCardHTML).join('');
  }

  function liveCardHTML(s) {
    const live = s.live;

    // 라이브 상태 표시
    let liveStateHTML = '';
    if (live.state === 'in-session') {
      liveStateHTML = `
        <div class="slc-live-state in-session">
          <span class="live-icon"></span>
          <span class="slc-live-text">
            <strong>${live.current_class}</strong> · ${live.current_attendance} 출석 · ${live.current_room}
          </span>
          <span class="slc-live-time">${live.time_range}</span>
        </div>
      `;
    } else if (live.state === 'in-break') {
      liveStateHTML = `
        <div class="slc-live-state in-break">
          <span class="live-icon"></span>
          <span class="slc-live-text">현재 휴식 시간</span>
          <span class="slc-live-time">다음: ${live.next_class} ${live.next_time}</span>
        </div>
      `;
    } else {
      liveStateHTML = `
        <div class="slc-live-state closed">
          <span class="live-icon"></span>
          <span class="slc-live-text">마감</span>
        </div>
      `;
    }

    // 상태 태그
    let statusTag = '';
    if (s.status === 'at_risk') {
      statusTag = `<span class="slc-status-tag at_risk">⚠ 주의 <span class="alert-num">${s.alerts_count}</span></span>`;
    } else if (s.status === 'healthy') {
      statusTag = `<span class="slc-status-tag healthy">✓ 호조</span>`;
    } else {
      statusTag = `<span class="slc-status-tag normal">정상</span>`;
    }

    // 위험 라인 (at_risk만)
    let riskLine = '';
    if (s.status === 'at_risk') {
      const riskItems = [];
      if (s.payment_failed > 0) riskItems.push(`결제 실패 ${s.payment_failed}건`);
      if (s.attendance_trend < -0.05) riskItems.push(`출석률 ${formatPercent(s.attendance_trend)}`);
      if (riskItems.length > 0) {
        riskLine = `
          <div class="slc-risk-line">
            <span class="risk-dot"></span>
            <span>${riskItems.join(' · ')}</span>
          </div>
        `;
      }
    }

    return `
      <a href="../step_main_v6.html?studio=${s.id}" class="studio-live-card ${s.status}">
        <div class="slc-head">
          <div class="slc-name-wrap">
            <span class="slc-status-dot ${s.status}"></span>
            <span class="slc-name">${s.name}</span>
          </div>
          ${statusTag}
        </div>

        ${liveStateHTML}

        <div class="slc-metrics">
          <div class="slc-metric">
            <span class="label">학생</span>
            <span class="num">${s.students}</span>
            <span class="trend ${s.students_trend > 0 ? 'up' : (s.students_trend < 0 ? 'down' : 'neutral')}">
              ${s.students_trend > 0 ? '+' : ''}${s.students_trend}
            </span>
          </div>
          <div class="slc-divider"></div>
          <div class="slc-metric">
            <span class="label">출석</span>
            <span class="num">${(s.attendance_rate * 100).toFixed(0)}%</span>
            <span class="trend ${trendClass(s.attendance_trend)}">${formatPercent(s.attendance_trend)}</span>
          </div>
          <div class="slc-divider"></div>
          <div class="slc-metric">
            <span class="label">매출</span>
            <span class="num">${formatCurrency(s.revenue_mtd)}</span>
          </div>
        </div>

        ${riskLine}
      </a>
    `;
  }

  // ============================================================
  // 6. HQ Event Hub
  // ============================================================
  function renderEventHub() {
    const totals = computePromotionTotals();

    // 원형 차트 3개
    const ringsEl = document.getElementById('event-rings');
    const ringData = [
      { label: '참여 현황', num: totals.participants, total: totals.participants, color: 'purple', total_label: 'tot' },
      { label: '결제 완료', num: totals.paid, total: totals.participants, color: 'green', total_label: '/' + totals.participants },
      { label: '미결제', num: totals.pending, total: totals.participants, color: 'red', total_label: '/' + totals.participants },
    ];

    ringsEl.innerHTML = ringData.map(r => {
      const ratio = r.total > 0 ? r.num / r.total : 0;
      const circumference = 2 * Math.PI * 22;
      const dashoffset = circumference * (1 - ratio);
      return `
        <div class="event-ring">
          <div class="event-ring-svg ${r.color}">
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle class="bg-circle" cx="28" cy="28" r="22"/>
              <circle class="progress-circle" cx="28" cy="28" r="22"
                      stroke-dasharray="${circumference}"
                      stroke-dashoffset="${dashoffset}"/>
            </svg>
            <div class="event-ring-text">
              <span class="ring-num">${r.num}</span>
              <span class="ring-total">${r.total_label === 'tot' ? '명' : r.total_label}</span>
            </div>
          </div>
          <span class="event-ring-label">${r.label}</span>
        </div>
      `;
    }).join('');

    // CTA
    document.getElementById('event-cta').onclick = () => {
      showToast(`${totals.pending}명에게 미결제 알림 발송 — Phase 2 구현`);
    };

    // 다가오는 이벤트
    const listEl = document.getElementById('event-list');
    listEl.innerHTML = HQ_EVENTS.upcoming.map(evt => `
      <div class="hq-event-item">
        <div class="hq-event-item-icon ${evt.icon}">
          ${evt.icon === 'purple' ? '⚡' : evt.icon === 'amber' ? '🏆' : '📚'}
        </div>
        <div class="hq-event-item-body">
          <div class="hq-event-item-tag">${evt.type_label}</div>
          <div class="hq-event-item-name">${evt.name}</div>
          <div class="hq-event-item-meta">${evt.date}</div>
        </div>
        <div class="hq-event-item-count">참여 ${evt.participants}명</div>
      </div>
    `).join('');
  }

  // ============================================================
  // 7. Ask Xiro FAB
  // ============================================================
  function bindAskXiroFAB() {
    const btn = document.getElementById('askXiroBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      showToast('Ask Xiro · HQ — Phase 2에서 정식 구현');
    });
  }

  // ============================================================
  // 8. 키보드 단축키
  // ============================================================
  function bindGlobalShortcuts() {
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        const trigger = document.querySelector('.dojang-selector');
        if (trigger) trigger.click();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const sidebarSearch = document.getElementById('sidebar-search-input');
        const globalSearch = document.querySelector('.global-search input');
        (sidebarSearch || globalSearch)?.focus();
      }
    });
  }

  // ============================================================
  // Toast (간이)
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

  // 외부 노출
  window.HQMain = { toast: showToast };
})();
