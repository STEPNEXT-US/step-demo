/**
 * STEP Multi-Studio Mock Data
 * Phase 1A — Studios: LA(healthy) / NYC(at_risk) / Dallas(normal)
 *
 * 시연 스토리: Owner 아침 9시 → HQ 진입 → Xiro NYC 알림 →
 * NYC 카드 클릭 → 결제 실패 발견 → 처리 후 HQ 복귀
 */

const STUDIOS = {
  la: {
    id: 'la',
    name: 'LA Branch',
    region: 'Koreatown, Los Angeles',
    timezone: 'America/Los_Angeles',
    color: '#2563EB',
    color_bg: '#EFF6FF',
    status: 'healthy',

    students: 168,
    students_trend: +5,
    attendance_rate: 0.87,
    attendance_trend: +0.02,
    revenue_mtd: 32400,
    revenue_trend: +0.15,
    revenue_goal: 42000,         // 5월 목표
    new_signups_week: 5,
    retention_rate: 0.94,

    daily_goal_progress: 0.72,
    alerts_count: 1,
    payment_failed: 0,

    xiro_insight: '오늘 시험 대상자 7명, 모두 출석 확정',

    head_instructor: 'Master Kim',
    staff_count: 6,

    // Live 운영 상태 (현재 시점 기준)
    live: {
      state: 'in-session',          // in-session | in-break | closed
      current_class: '4세반 (꼬마호랑이)',
      current_attendance: '16/18',
      current_room: 'Room A',
      current_instructor: '박사범',
      time_range: '10:00 — 10:45',
      next_class: '5세반',
      next_time: '11:00',
    },
  },

  nyc: {
    id: 'nyc',
    name: 'NYC Branch',
    region: 'Flushing, Queens',
    timezone: 'America/New_York',
    color: '#10B981',
    color_bg: '#ECFDF5',
    status: 'at_risk',

    students: 142,
    students_trend: -2,
    attendance_rate: 0.79,
    attendance_trend: -0.08,
    revenue_mtd: 24800,
    revenue_trend: -0.04,
    revenue_goal: 36000,         // 5월 목표
    new_signups_week: 1,
    retention_rate: 0.81,

    daily_goal_progress: 0.45,
    alerts_count: 3,
    payment_failed: 1,

    xiro_insight: '4월 15일 이후 출석률 지속 하락 — 사범 변경 영향 가능',

    head_instructor: 'Master Park',
    staff_count: 4,

    live: {
      state: 'in-session',
      current_class: '청소년반',
      current_attendance: '12/15',
      current_room: 'Room B',
      current_instructor: '이사범',
      time_range: '10:00 — 11:00',
      next_class: '성인반',
      next_time: '11:30',
    },
  },

  dallas: {
    id: 'dallas',
    name: 'Dallas Branch',
    region: 'Plano, Dallas',
    timezone: 'America/Chicago',
    color: '#F59E0B',
    color_bg: '#FFFBEB',
    status: 'normal',

    students: 96,
    students_trend: +3,
    attendance_rate: 0.83,
    attendance_trend: +0.005,
    revenue_mtd: 18200,
    revenue_trend: +0.03,
    revenue_goal: 24000,         // 5월 목표
    new_signups_week: 3,
    retention_rate: 0.89,

    daily_goal_progress: 0.58,
    alerts_count: 0,
    payment_failed: 0,

    xiro_insight: '정상 운영, 특이사항 없음',

    head_instructor: 'Master Lee',
    staff_count: 3,

    live: {
      state: 'in-break',
      current_class: null,
      current_attendance: null,
      current_room: null,
      current_instructor: null,
      time_range: null,
      next_class: '오후반 (초등부)',
      next_time: '14:00',
    },
  },
};

/**
 * Network 통합 KPI (자동 계산)
 */
function computeNetworkKPI() {
  const list = Object.values(STUDIOS);
  const total_revenue = list.reduce((s, x) => s + x.revenue_mtd, 0);
  const total_students = list.reduce((s, x) => s + x.students, 0);
  const avg_attendance = list.reduce((s, x) => s + x.attendance_rate, 0) / list.length;
  const total_new = list.reduce((s, x) => s + x.new_signups_week, 0);

  // 추세 (가중 평균: 학생 수 기준)
  const weighted_attendance_trend = list.reduce(
    (s, x) => s + x.attendance_trend * x.students, 0
  ) / total_students;
  const weighted_revenue_trend = list.reduce(
    (s, x) => s + x.revenue_trend * x.revenue_mtd, 0
  ) / total_revenue;

  return {
    total_revenue,
    total_students,
    avg_attendance,
    total_new,
    revenue_trend: weighted_revenue_trend,
    attendance_trend: weighted_attendance_trend,
    students_trend: list.reduce((s, x) => s + x.students_trend, 0),
  };
}

/**
 * Xiro HQ Briefing 동적 생성
 * — 위험 지점이 있으면 그 지점을 주인공으로
 * — 없으면 호조 지점 칭찬 + 평범 지점 언급
 */
function generateXiroBriefing() {
  const list = Object.values(STUDIOS);
  const at_risk = list.filter(x => x.status === 'at_risk');
  const healthy = list.filter(x => x.status === 'healthy');
  const normal = list.filter(x => x.status === 'normal');

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', weekday: 'short',
  });

  if (at_risk.length > 0) {
    const main = at_risk[0];
    return {
      date: dateStr,
      headline: `오늘 ${list.length}개 지점 중 ${main.name}가 가장 주의가 필요합니다.`,
      bullets: [
        ...at_risk.map(s => ({
          studio_id: s.id,
          severity: 'risk',
          text: `${s.name}: 출석률 ${formatPercent(s.attendance_trend)} (지난주 대비)${
            s.payment_failed > 0 ? `, 결제 실패 ${s.payment_failed}건` : ''
          }`,
        })),
        ...healthy.map(s => ({
          studio_id: s.id,
          severity: 'good',
          text: `${s.name}: 신규 등록 +${s.new_signups_week}명, 정상 운영`,
        })),
        ...normal.map(s => ({
          studio_id: s.id,
          severity: 'neutral',
          text: `${s.name}: 정상 운영, 특이사항 없음`,
        })),
      ],
      cta_studio: main.id,
      cta_label: `${main.name}로 이동`,
    };
  }

  // 위험 지점 없을 때 (현재 시연 데이터에서는 발생 안 함)
  return {
    date: dateStr,
    headline: `${list.length}개 지점 모두 정상 운영 중입니다.`,
    bullets: list.map(s => ({
      studio_id: s.id,
      severity: 'neutral',
      text: `${s.name}: ${s.xiro_insight}`,
    })),
    cta_studio: null,
    cta_label: '전체 알림 보기',
  };
}

/**
 * 유틸: 통화 포맷
 */
function formatCurrency(n) {
  return '$' + n.toLocaleString('en-US');
}

/**
 * 유틸: 퍼센트 포맷 (부호 포함)
 */
function formatPercent(n, withSign = true) {
  const pct = (n * 100).toFixed(1);
  if (!withSign) return pct + '%';
  if (n > 0) return '+' + pct + '%';
  return pct + '%';
}

/**
 * 유틸: 부호 화살표
 */
function trendArrow(n) {
  if (n > 0.001) return '▲';
  if (n < -0.001) return '▼';
  return '–';
}

/**
 * 유틸: 추세 색상 클래스
 */
function trendClass(n, inverse = false) {
  // inverse=true: 매출/출석은 +가 좋음, 결석률은 -가 좋음
  if (Math.abs(n) < 0.001) return 'neutral';
  if (inverse) return n > 0 ? 'down' : 'up';
  return n > 0 ? 'up' : 'down';
}

/**
 * 현재 컨텍스트 (URL 파라미터 기반)
 * - ?studio=la|nyc|dallas → 단일 지점
 * - 없음 → HQ
 */
function getCurrentContext() {
  const params = new URLSearchParams(window.location.search);
  const studio_id = params.get('studio');
  if (studio_id && STUDIOS[studio_id]) {
    return { mode: 'studio', studio: STUDIOS[studio_id] };
  }
  return { mode: 'hq', studio: null };
}

/**
 * HQ Ops Items — 지점별 발생 항목들을 통합
 * v6.6 Ops Center 어휘를 그대로 사용 (urgent/routine/insight)
 * 지점 라벨이 추가된 점만 다름
 */
const HQ_OPS_ITEMS = [
  // 긴급 — at_risk 지점에서 발생
  {
    id: 'op-nyc-payment',
    type: 'urgent',
    studio_id: 'nyc',
    title: '학부모 결제 실패 1건',
    meta: '김유나 학생 · 자동결제 거절 · $180',
    action: '결제 안내',
    icon: 'danger',
  },
  {
    id: 'op-nyc-attendance',
    type: 'urgent',
    studio_id: 'nyc',
    title: '출석 위험 학생 4명',
    meta: '4월 15일 이후 출석률 -8% — 박사범 변경 영향 가능',
    action: '리마인드',
    icon: 'warn',
  },
  {
    id: 'op-la-promotion',
    type: 'urgent',
    studio_id: 'la',
    title: '5월 승급 심사 대상자 미답변 3건',
    meta: '시험 등록 마감까지 D-7',
    action: '학부모 안내',
    icon: 'warn',
  },

  // 정규 — 일상 SOP
  {
    id: 'op-routine-attendance',
    type: 'routine',
    studio_id: 'all',
    title: '오늘 출석 마감 확인',
    meta: 'LA 진행 중 · NYC 진행 중 · Dallas 휴식 중',
    action: '점검',
    icon: 'info',
  },
  {
    id: 'op-routine-message',
    type: 'routine',
    studio_id: 'nyc',
    title: '학부모 메시지 5건 미응답',
    meta: '평균 응답 시간 2.3시간 · 빠른 응답 권장',
    action: '응답하기',
    icon: 'info',
  },
  {
    id: 'op-routine-supplies',
    type: 'routine',
    studio_id: 'la',
    title: '띠 재고 부족 (검정띠 3개)',
    meta: '5월 승급 심사 대비 보충 필요',
    action: '주문',
    icon: 'info',
  },
  {
    id: 'op-routine-staff',
    type: 'routine',
    studio_id: 'all',
    title: '주간 사범 평가 미작성',
    meta: '13명 중 8명 평가 대기',
    action: '작성',
    icon: 'info',
  },

  // 제안 — Xiro 인사이트
  {
    id: 'op-insight-nyc',
    type: 'insight',
    studio_id: 'nyc',
    title: 'NYC 사범 변경 후 학부모 면담 권장',
    meta: '이탈 위험 학생 4명 — 면담 시 평균 60% 회복',
    action: '검토',
    icon: 'idea',
  },
  {
    id: 'op-insight-la',
    type: 'insight',
    studio_id: 'la',
    title: '수요일 출석률이 4주 연속 저하',
    meta: 'Xiro 분석 — 시간대 조정 검토 권장',
    action: '검토',
    icon: 'idea',
  },
  {
    id: 'op-insight-cross',
    type: 'insight',
    studio_id: 'all',
    title: '신규 가입 13명 — 첫 달 유지율 91%',
    meta: '지난달 대비 +5%p · 환영 메시지 효과 확인',
    action: '리포트',
    icon: 'idea',
  },
];

/**
 * 지점별 카운트 (chip filter용)
 */
function computeOpsCounts() {
  const all = HQ_OPS_ITEMS.length;
  const urgent = HQ_OPS_ITEMS.filter(i => i.type === 'urgent').length;
  const routine = HQ_OPS_ITEMS.filter(i => i.type === 'routine').length;
  const insight = HQ_OPS_ITEMS.filter(i => i.type === 'insight').length;
  return { all, urgent, routine, insight };
}

/**
 * HQ Event Hub 데이터
 * - 진행 중인 이벤트 2건 (대표: 5월 통합 승급 심사 + 4월 리텐션 캠페인)
 * - 다가오는 이벤트 2건
 */
const HQ_EVENTS = {
  // 진행 중 (현재 운영 중인 통합 이벤트)
  ongoing: [
    {
      id: 'ong-promotion',
      type: 'promotion',
      type_label: '승급 심사',
      name: '5월 통합 승급 심사',
      date: '26.05.20 (수) 10:00',
      d_day: 22,
      by_studio: [
        { studio_id: 'la', participants: 16, paid: 14, pending: 2 },
        { studio_id: 'nyc', participants: 12, paid: 9, pending: 3 },
        { studio_id: 'dallas', participants: 10, paid: 9, pending: 1 },
      ],
    },
    {
      id: 'ong-campaign',
      type: 'campaign',
      type_label: '캠페인',
      name: '4월 리텐션 캠페인 — Welcome Back',
      date: '진행 중 · ~26.04.30',
      d_day: 2,
      by_studio: [
        { studio_id: 'la', participants: 8, paid: 6, pending: 2 },
        { studio_id: 'nyc', participants: 14, paid: 7, pending: 7 },  // 위험 지점 캠페인 집중
        { studio_id: 'dallas', participants: 5, paid: 4, pending: 1 },
      ],
    },
  ],

  // 다가오는 이벤트 (2건만)
  upcoming: [
    {
      id: 'evt-1',
      type: 'special',
      type_label: '특강',
      name: '스파링 집중 특강',
      date: '2026.05.24 (토)',
      participants: 24,
      icon: 'purple',
    },
    {
      id: 'evt-2',
      type: 'tournament',
      type_label: '대회',
      name: '서울시 협회장기 대회',
      date: '2026.06.07 (토)',
      participants: 18,
      icon: 'amber',
    },
  ],
};

/**
 * 진행 중 이벤트의 합계 계산
 */
function computeEventTotals(eventId) {
  const evt = HQ_EVENTS.ongoing.find(e => e.id === eventId);
  if (!evt) return null;
  const totals = evt.by_studio.reduce(
    (acc, s) => ({
      participants: acc.participants + s.participants,
      paid: acc.paid + s.paid,
      pending: acc.pending + s.pending,
    }),
    { participants: 0, paid: 0, pending: 0 }
  );
  return { ...evt, totals };
}

// 하위 호환 — 기존 코드가 사용
function computePromotionTotals() {
  const result = computeEventTotals('ong-promotion');
  return result ? result.totals : { participants: 0, paid: 0, pending: 0 };
}
