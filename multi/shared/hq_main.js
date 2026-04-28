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
  // 3. KPI 3카드 — v6.6 1:1 호환
  //   [1] 통합 출석률   (v6.6 출석률)
  //   [2] 통합 승급 심사 (v6.6 승급 예정자)
  //   [3] 매출 진행률   (v6.6 이번 달 매출)
  // ============================================================
  function renderKPIs() {
    const kpi = computeNetworkKPI();
    const studios = Object.values(STUDIOS);

    // ─── [1] 통합 출석률 ───
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

    // ─── [2] 통합 승급 심사 ───
    const promotion = computePromotionTotals();
    document.getElementById('kpi-promotion').innerHTML = `
      <span class="num">${promotion.participants}</span><span class="kpi-unit">명</span>
    `;
    document.getElementById('kpi-promotion-meta').innerHTML = `
      결제 완료 <strong>${promotion.paid}</strong> · 미결제 <strong class="risk-text">${promotion.pending}</strong>
    `;

    // 지점별 미니 아바타 (지점 첫 글자) — 진행 중 승급 심사 데이터에서 가져옴
    const promotionEvent = HQ_EVENTS.ongoing.find(e => e.id === 'ong-promotion');
    const promotionAvatars = (promotionEvent ? promotionEvent.by_studio : []).map(bs => {
      const studio = STUDIOS[bs.studio_id];
      const colorMap = { la: 'blue', nyc: 'green', dallas: 'amber' };
      const initial = studio.name.charAt(0); // L / N / D
      return `<div class="mini-avatar ${colorMap[bs.studio_id]}" title="${studio.name}: ${bs.participants}명">${initial}</div>`;
    }).join('');
    document.getElementById('kpi-promotion-avatars').innerHTML = promotionAvatars;

    // ─── [3] 매출 진행률 ───
    const totalRevenue = studios.reduce((acc, s) => acc + s.revenue_mtd, 0);
    const totalGoal = studios.reduce((acc, s) => acc + s.revenue_goal, 0);
    const progressRatio = totalGoal > 0 ? totalRevenue / totalGoal : 0;
    const progressPct = (progressRatio * 100).toFixed(0);

    document.getElementById('kpi-revenue').innerHTML = `
      <span class="num">${progressPct}</span><span class="kpi-unit">%</span>
    `;

    const revTrend = document.getElementById('kpi-revenue-trend');
    revTrend.className = 'kpi-trend ' + trendClass(kpi.revenue_trend);
    revTrend.textContent = `${trendArrow(kpi.revenue_trend)} ${formatPercent(kpi.revenue_trend)}`;

    // D-day 계산 (월말까지)
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dDay = lastDay - today.getDate();

    document.getElementById('kpi-revenue-meta').innerHTML = `
      ${formatCurrency(totalRevenue)} / ${formatCurrency(totalGoal)} · <strong>D-${dDay}</strong>
    `;

    // 지점별 매출 진행률 mini bars (목표 대비)
    const barsEl = document.getElementById('kpi-revenue-bars');
    barsEl.innerHTML = studios.map(s => {
      const ratio = s.revenue_goal > 0 ? s.revenue_mtd / s.revenue_goal : 0;
      const h = Math.min(100, ratio * 100);
      const cls = ratio < 0.5 ? 'warn' : '';
      return `<span class="bar ${cls}" style="height: ${h}%;"
                    title="${s.name}: ${(ratio * 100).toFixed(0)}% (${formatCurrency(s.revenue_mtd)} / ${formatCurrency(s.revenue_goal)})"></span>`;
    }).join('');
  }

  // ============================================================
  // 4. HQ Ops Center
  //   - 기본 5건 노출, 나머지는 "더보기" 토글
  //   - 지점 라벨 색상 강화 (LA 파랑 / NYC 초록 / Dallas 주황 / 전체 점선)
  // ============================================================
  let currentOpsFilter = 'all';
  let opsExpanded = false;
  const OPS_INITIAL_LIMIT = 5;

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
        opsExpanded = false;          // 필터 바꾸면 항상 접힘 상태로 리셋
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

    const visibleItems = opsExpanded ? items : items.slice(0, OPS_INITIAL_LIMIT);
    const hiddenCount = items.length - visibleItems.length;

    let html = visibleItems.map(opsItemHTML).join('');

    // 더보기 토글 (5건 초과 시)
    if (items.length > OPS_INITIAL_LIMIT) {
      const remaining = items.length - OPS_INITIAL_LIMIT;
      html += `
        <button class="ops-show-more ${opsExpanded ? 'expanded' : ''}" data-action="toggle-more" type="button">
          ${opsExpanded
            ? `<span>접기</span><span class="arrow">▾</span>`
            : `<span>더보기</span><span class="count">+${remaining}</span><span class="arrow">▾</span>`
          }
        </button>
      `;
    }

    list.innerHTML = html;

    // 더보기 바인딩
    const moreBtn = list.querySelector('[data-action="toggle-more"]');
    if (moreBtn) {
      moreBtn.addEventListener('click', () => {
        opsExpanded = !opsExpanded;
        renderOpsList(currentOpsFilter);
      });
    }
  }

  function opsItemHTML(item) {
    const studio = item.studio_id === 'all' ? null : STUDIOS[item.studio_id];

    // 지점 라벨 (색상 배지)
    let studioTag;
    if (studio) {
      const studioLabel = item.studio_id.toUpperCase();
      studioTag = `<span class="ops-studio-tag ${item.studio_id}">${studioLabel}</span>`;
    } else {
      studioTag = `<span class="ops-studio-tag all">전체</span>`;
    }

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
  //   - 진행 중 이벤트 2건 (승급 심사 + 캠페인)
  //   - 다가오는 이벤트 2건 (컴팩트, 1줄)
  // ============================================================
  function renderEventHub() {
    renderOngoingEvents();
    renderUpcomingEvents();
  }

  function renderOngoingEvents() {
    const list = document.getElementById('event-ongoing-list');
    if (!list) return;

    list.innerHTML = HQ_EVENTS.ongoing.map(evt => {
      const totals = evt.by_studio.reduce(
        (acc, s) => ({
          participants: acc.participants + s.participants,
          paid: acc.paid + s.paid,
          pending: acc.pending + s.pending,
        }),
        { participants: 0, paid: 0, pending: 0 }
      );
      const paidRatio = totals.participants > 0 ? totals.paid / totals.participants : 0;
      const isUrgent = evt.d_day <= 3 || (totals.pending / totals.participants > 0.4);
      const ddayClass = isUrgent ? 'urgent' : '';

      const ctaClass = isUrgent ? 'urgent' : '';
      const ctaText = totals.pending > 0
        ? `미결제 ${totals.pending}명 알림`
        : '상세 보기';

      return `
        <div class="hq-event-ongoing ${isUrgent ? 'urgent' : ''}">
          <div class="hq-event-ongoing-head">
            <div class="hq-event-ongoing-meta">
              <div class="hq-event-ongoing-tag-row">
                <span class="hq-event-ongoing-tag ${evt.type}">${evt.type_label}</span>
                <span class="hq-event-ongoing-dday ${ddayClass}">D-${evt.d_day}</span>
              </div>
              <div class="hq-event-ongoing-name">${evt.name}</div>
              <div class="hq-event-ongoing-date">${evt.date}</div>
            </div>
          </div>

          <div class="hq-event-progress">
            <div class="hq-event-progress-stats">
              <div class="hq-event-progress-stat">
                <span class="num">${totals.participants}</span>
                <span class="label">참여</span>
              </div>
              <div class="hq-event-progress-divider"></div>
              <div class="hq-event-progress-stat">
                <span class="num">${totals.paid}</span>
                <span class="label">완료</span>
              </div>
              <div class="hq-event-progress-divider"></div>
              <div class="hq-event-progress-stat ${totals.pending > 0 ? 'pending' : ''}">
                <span class="num">${totals.pending}</span>
                <span class="label">미결제</span>
              </div>
            </div>
            <div class="hq-event-progress-bar" title="${(paidRatio * 100).toFixed(0)}% 완료">
              <div class="hq-event-progress-bar-fill" style="width: ${paidRatio * 100}%;"></div>
            </div>
          </div>

          <button class="hq-event-ongoing-cta ${ctaClass}"
                  onclick="window.HQMain && window.HQMain.toast('${ctaText} — Phase 2 구현')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            ${ctaText}
          </button>
        </div>
      `;
    }).join('');
  }

  function renderUpcomingEvents() {
    const listEl = document.getElementById('event-list');
    if (!listEl) return;

    listEl.innerHTML = HQ_EVENTS.upcoming.map(evt => {
      const iconMap = { purple: '⚡', amber: '🏆', blue: '📚' };
      const icon = iconMap[evt.icon] || '📅';
      // 날짜 포맷 컴팩트화 (2026.05.24 → 5.24)
      const dateMatch = evt.date.match(/(\d{4})\.(\d{2})\.(\d{2})/);
      const compactDate = dateMatch ? `${parseInt(dateMatch[2])}.${parseInt(dateMatch[3])}` : evt.date;

      return `
        <div class="hq-event-item" onclick="window.HQMain && window.HQMain.toast('${evt.name} 상세 — Phase 2')">
          <div class="hq-event-item-icon ${evt.icon}">${icon}</div>
          <div class="hq-event-item-body">
            <span class="hq-event-item-name">${evt.name}</span>
            <span class="hq-event-item-date">${compactDate}</span>
          </div>
          <div class="hq-event-item-count">${evt.participants}명</div>
        </div>
      `;
    }).join('');
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
