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
    color: '#2563EB',         // 파랑
    color_bg: '#EFF6FF',
    status: 'healthy',         // healthy | at_risk | normal

    // KPI
    students: 168,
    students_trend: +5,        // 이번주 신규
    attendance_rate: 0.87,
    attendance_trend: +0.02,   // vs 지난주
    revenue_mtd: 32400,
    revenue_trend: +0.15,      // vs 지난달
    new_signups_week: 5,

    // 운영
    daily_goal_progress: 0.72, // 오늘 진행도 72%
    alerts_count: 1,
    payment_failed: 0,

    // Xiro 한 줄 인사이트
    xiro_insight: '오늘 시험 대상자 7명, 모두 출석 확정',

    // 사범
    head_instructor: 'Master Kim',
    staff_count: 6,
  },

  nyc: {
    id: 'nyc',
    name: 'NYC Branch',
    region: 'Flushing, Queens',
    timezone: 'America/New_York',
    color: '#10B981',         // 초록
    color_bg: '#ECFDF5',
    status: 'at_risk',         // ⭐ 시연 스토리의 주인공

    // KPI
    students: 142,
    students_trend: -2,        // 이번주 -2명
    attendance_rate: 0.79,
    attendance_trend: -0.08,   // -8% (위기 신호)
    revenue_mtd: 24800,
    revenue_trend: -0.04,
    new_signups_week: 1,

    // 운영
    daily_goal_progress: 0.45,
    alerts_count: 3,
    payment_failed: 1,         // 결제 실패 1건 (시연 핵심)

    // Xiro 한 줄 인사이트
    xiro_insight: '4월 15일 이후 출석률 지속 하락 — 사범 변경 영향 가능',

    head_instructor: 'Master Park',
    staff_count: 4,
  },

  dallas: {
    id: 'dallas',
    name: 'Dallas Branch',
    region: 'Plano, Dallas',
    timezone: 'America/Chicago',
    color: '#F59E0B',         // 주황
    color_bg: '#FFFBEB',
    status: 'normal',          // 대조군

    // KPI
    students: 96,
    students_trend: +3,
    attendance_rate: 0.83,
    attendance_trend: +0.005,  // 거의 변화 없음
    revenue_mtd: 18200,
    revenue_trend: +0.03,
    new_signups_week: 3,

    // 운영
    daily_goal_progress: 0.58,
    alerts_count: 0,
    payment_failed: 0,

    xiro_insight: '정상 운영, 특이사항 없음',

    head_instructor: 'Master Lee',
    staff_count: 3,
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
