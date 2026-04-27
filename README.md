# STEP Manager — Demo Mock-ups

> 태권도 도장 운영 SaaS의 풀 사이클 디자인 목업.<br>
> **가격 페이지 → AI 온보딩 (Plan 선택 + 결제) → 도장 설정 → 메인 운영**까지 끊김 없이 클릭 가능한 시연 환경입니다.

🌐 **Live Demo**: https://step-demo-tau.vercel.app<br>
📦 **GitHub**: https://github.com/STEPNEXT-US/step-demo<br>
🗓️ **버전**: v6.6 (2026.04)

---

## 🚀 Quick Start

```
시작점: step_index.html
```

`step_index.html`을 브라우저로 열면 모든 시연이 시작됩니다. 3가지 사용자 여정 중 하나를 선택해서 클릭하세요.

---

## 🎬 시연 시나리오 (3가지 Journey)

### 1️⃣ E2E — 신규 가입부터 메인 진입까지 (추천 시작점)

신규 도장 Owner가 STEP을 처음 만나는 풀 사이클입니다.

```
step_pricing_page_v2.html
   │  어떤 CTA(Get started / Start with Core / Start with Pro)를
   │  클릭해도 → 동일한 온보딩 흐름으로 진입
   ▼
step_onboarding_step1.html  (1 · 환영 — 홈페이지 주소 입력)
   ▼
step_onboarding_step2.html  (2 · 도장 주소 — timezone 자동 설정)
   ▼
step_onboarding_step3.html  (3 · AI 분석 — 도장 정보 수집)
   ▼
step_onboarding_step4.html  (4 · 검수 — 추출 결과 확인)
   ▼
step_onboarding_step5.html  (5 · 인사이트 — SEO/GBP 점수)
   ▼
step_onboarding_step6.html  (6 · Plan 선택 ⭐ NEW)
   │   • Core $50 / Pro $249 / Grow Coming soon
   │   • Pro 기본 추천 (Most Popular)
   │   • 60일 무료 사용 후 자동 결제
   ▼
step_onboarding_step7.html  (7 · 결제 등록 — 카드 정보)
   │   • "카드 등록하고 시작하기" 또는 "카드 등록 없이 시작하기"
   │   • Plan 변경 가능 (← Plan 변경 링크)
   ▼
step_onboarding_step8.html  (8 · 완료 — "도장 설정 시작하기")
   ▼
step_setup_step0.html
   │  도장 초기 설정 진입점 (10단계)
   ▼
step_setup_step1.html ~ step_setup_step8.html
   │  기본 설정 (1~5): 도장 정보 / 띠 체계 / 수업 시간표 / 가격 / 학생 등록
   │  추가 설정 (6~8): 직원 / 용품 / 행사 (선택)
   ▼
step_setup_step9.html
   │  🎉 기본 설정 완료
   │  "STEP Manager 시작하기" 클릭
   ▼
step_main_v6.html
   메인 대시보드 진입
```

**시연 포인트**:
- 온보딩 8단계 각각 독립 페이지 (sticky top nav로 진행도 표시)
- Plan 선택 페이지에서 Pro 카드가 기본 선택됨 (Most Popular 강조)
- 결제 페이지에서 "← Plan 변경"으로 step6로 복귀 가능

### 2️⃣ 운영 중 사용자 — 메인에서 일상 운영

도장이 이미 셋업된 상태의 일상 워크플로입니다.

```
step_main_v6.html
   ├ Xiro 일일 브리핑 카드
   ├ KPI 3종 (출석률 · 승급 예정자 · 매출) ⭐ v6.6: 클릭 가능
   ├ Ops Center / 라이브 도장 / Event Hub
   └ 빠른 액션 7개
       │
       ├──→ KPI 카드 (출석률 / 승급 / 매출) 클릭  ⭐ v6.6 NEW
       │     ▼
       │     step_kpi_detail.html?tab=xxx
       │     (3-tab 통합 상세 분석 페이지)
       │     ├ Hero KPI 4분할 + 스파크라인
       │     ├ 차트 (Y축 + 비교 라인 + hover tooltip)
       │     ├ 학생 리스트 (인라인 확장 + 정렬 + 다중 선택)
       │     └ 우측: Watch + Xiro 추천 + Pro 도우미 + 타임라인
       │
       ├──→ 사이드바 "회원 관리" 클릭
       │     ▼
       │     step_members.html (회원 빈 상태 + 3가지 등록 옵션)
       │
       ├──→ 헤더 "업무" 탭 클릭
       │     ▼
       │     [Vercel] step_weekly_report
       │     (Tasks/SOP — Pro 핵심 가치)
       │
       ├──→ 헤더 ? 클릭 → "이 화면 둘러보기"
       │     ▼
       │     코치마크 발동 (페이지별 가이드)
       │
       └──→ 헤더 🔔 클릭 → 알림 패널
```

**시연 포인트**:
- 우상단 `설정` 토글로 **정상 ↔ 설정 미완** 즉시 전환
- 우상단 `UPSELL ON/OFF`로 업셀 트리거 켜기/끄기
- 신규 페이지 첫 진입 시 **코치마크 자동 1회 발동**
- ⭐ **v6.6: KPI 카드 5개 모두 클릭 가능** — 메인 ↔ 상세 자유로운 왕복

### 3️⃣ 설정 미완 사용자 — 중단된 셋업 이어가기

도장 설정 도중에 빠져나갔다가 돌아온 사용자의 시나리오입니다.

```
step_main_v6.html?state=empty
   │  (또는 헤더 설정 토글로 "설정 미완" 클릭)
   │
   │  화면 변화:
   │  ├ 상단에 글로벌 setup-banner 노출
   │  ├ Xiro 일일 브리핑이 "75% 완료" 메시지로 변형
   │  ├ KPI 3개가 "설정 필요" 잠금 상태
   │  └ Ops Center 긴급 항목에 "학생 등록 필요"
   │
   ▼ "이어하기 →" 클릭
step_setup_step5.html  (학생 등록 — 미완 단계)
   ▼
step_setup_step9.html  (모든 단계 완주 또는 "여기까지")
   ▼
step_main_v6.html  (메인 복귀, 모든 KPI 활성화)
```

---

## 📁 파일 구조

```
step-demo/
├── README.md                            ← 이 파일
├── cleanup.ps1                          ← 폴더 정리 자동화 (v6.2 NEW)
├── index.html                           ← Vercel root URL 진입점 (= pricing 사본) ⭐
├── step_index.html                      ← 시연 인덱스 ⭐
│
├── 📄 가격 페이지
│   └── step_pricing_page_v2.html        ← STEP 컬러 통일 (v6.2)
│
├── 🚀 AI 온보딩 (8단계, 독립 페이지)  ⭐ v6.2 NEW
│   ├── step_onboarding_step1.html       ← 환영 (홈페이지 주소)
│   ├── step_onboarding_step2.html       ← 도장 주소
│   ├── step_onboarding_step3.html       ← AI 분석
│   ├── step_onboarding_step4.html       ← 검수
│   ├── step_onboarding_step5.html       ← 인사이트
│   ├── step_onboarding_step6.html       ← Plan 선택 ⭐
│   ├── step_onboarding_step7.html       ← 결제 등록
│   └── step_onboarding_step8.html       ← 완료
│
├── 🔄 하위 호환성
│   └── step_onboarding_v1.html          ← 자동 리다이렉트 stub → step1
│
├── 🥋 도장 초기 설정 (10단계 + 안내)
│   ├── step_setup_required.html         ← 설정 미완 통합 안내 (v6.2 통합)
│   ├── step_setup_step0.html            ← 시작
│   ├── step_setup_step1.html            ← 도장 정보
│   ├── step_setup_step2.html            ← 띠 체계
│   ├── step_setup_step3.html            ← 수업 시간표
│   ├── step_setup_step4.html            ← 가격정책
│   ├── step_setup_step4_bulk.html       ← 가격정책 일괄 모드
│   ├── step_setup_step5.html            ← 학생 등록
│   ├── step_setup_step6.html            ← 직원 등록 (선택)
│   ├── step_setup_step7.html            ← 용품·재고 (선택)
│   ├── step_setup_step8.html            ← 행사 일정 (선택)
│   └── step_setup_step9.html            ← 🎉 기본 설정 완료
│
├── 🏢 운영 OS
│   ├── step_main_v6.html                ← 메인 대시보드 ⭐
│   ├── step_kpi_detail.html             ← KPI 상세 (3-tab 통합) ⭐ v6.6 NEW
│   ├── step_members.html                ← 회원 관리
│   └── step_attendance.html             ← 출석 마킹 (라이브 도장, v6.2 통합)
│
├── 📑 명세서 / 데모
│   ├── step_weekly_report.html          ← Tasks/SOP (Vercel 배포)
│   ├── step_notification_demo.html      ← 알림 시스템 데모
│   └── step_upsell_triggers_v1.html     ← 업셀 트리거 명세
│
└── 📦 _archive/                         ← 보존된 이전 버전
    ├── README.md                        ← 보존 사유 안내
    ├── step_onboarding_v1.html          ← v6.1 단일 파일 원본 (1034 lines)
    └── step_pricing_page_v1.html        ← 이전 pricing 디자인 (옵션)
```

---

## 🛠️ 주요 디자인 결정사항

### 디자인 시스템 (사이트 + 운영 OS 통일)
- **폰트**: Pretendard (한글) + JetBrains Mono (숫자) + Inter (영문)
- **컬러**:
  - 베이스: `#F9FAFB` (light mode)
  - Primary: `#2563EB` (STEP 파랑)
  - Pro premium: `#8B5CF6 / #7C3AED` (보라 — Pro 카드 차별)
  - 성공/경고/위험: `#10B981 / #F59E0B / #EF4444`
- **모서리**: rounded-2xl (18px) 통일
- **톤**: Toss 스타일 (직관적, 따뜻한, 친근한)

### 정보 구조 (IA)
- **Layer 1 — 운영 OS**: work / calendar / notes / communication
- **Layer 2 — 비즈니스 데이터**: MEMBER + EVENT + GOODS + MANAGEMENT
- **Layered Information Architecture**: 같은 사실을 다른 각도로 (Setup banner / Briefing / KPI / Ops Center / Quick Actions)

### 가격 (3 Tier)
- **Core $50/mo** — Run (운영 OS)
- **Pro $249/mo** — Manage (B2C 통합, Stripe, Xiro AI) ⭐ Most Popular
- **Grow $399/mo** — Grow (사이트, 콘텐츠 자동화) — Coming when you're ready

### 온보딩 흐름 (8단계 — v6.2)
- 1~5단계: 도장 분석 (홈페이지 → 주소 → AI 분석 → 검수 → 인사이트)
- **6단계: Plan 선택** (분석 후 가치 인식 후 결정 — SaaS 황금 패턴)
- 7단계: 결제 등록 (60일 무료, 사용 인증용 카드)
- 8단계: 완료 → 도장 설정 진입

### AI 에이전트
- 이름: **Xiro** (지로) — 도장 운영 전반 도와줌
- 메인의 일일 브리핑, Ask Xiro 챗 패널, 코치마크 안내자

### 코치마크 시스템
- Linear/Stripe 스타일 spotlight + 사이드 카드
- 페이지별 가이드 데이터 (`PAGE_GUIDES`)로 재사용
- 신규 페이지 첫 진입 시 자동 1회 발동 (localStorage 마킹)
- 도움말 패널의 "이 화면 둘러보기"로 수동 발동

---

## 📝 변경 로그

### v6.6 (현재 세션) ⭐

**메인 → KPI 상세 페이지 풀 사이클 완성**

기존: 메인 KPI는 숫자만 보여주고 클릭해도 아무 일도 일어나지 않음<br>
v6.6: KPI 카드 5개 모두 클릭 가능 → 100점짜리 상세 분석 페이지로 자연스럽게 이동

**🆕 신규: step_kpi_detail.html** (3-tab 통합 KPI 상세 페이지)

3개 탭이 같은 골격으로 작동 (Attendance / Promotion / Revenue):

- ✨ **Hero KPI 4분할** — 메인 카드 (큰 숫자 + 스파크라인) + 보조 카드 3개 (미니 아바타)
- ✨ **차트** (SVG 직접 그림, Recharts 미사용)
  - Y축 라벨 (60/70/80/90/100% 또는 $5k/$10k/$15k/$20k 등)
  - 비교 고스트 라인 (지난주 / 전년 동월 / 미납 — 점선)
  - Hover tooltip + 펄스 도트
  - 핵심 인사이트 callout (수요일 60% 저하 / 3개월 연속 상승 / 매출 +12.8%)
- ✨ **학생/후보/결제 리스트** (탭별 5명)
  - 인라인 확장 (행 클릭 시 4주~14개월 패턴 미니 차트 + 학부모 정보)
  - 체크박스 다중 선택 → 하단 Bulk Action Bar
  - Sortable 컬럼 (출석률 / 금액)
  - 행별 액션 버튼 (안내 보내기 / 승인 처리 / 즉시 연락) + 발송 후 ✓ 표시
- ✨ **우측 사이드바 4종 카드**
  - Watch List (위험/대기/미납 학생) + 일괄 안내 CTA
  - Xiro 추천 액션 카드 (우선순위별 3개)
  - Pro 자동화 카드 (도우미 활성, 통계, 관장 승인 흐름 강조)
  - 자동화 타임라인 카드 (시간순 5건)
- ✨ **Plan 분기** — `?plan=core` 시 Pro 자동화 카드 → Core 업셀 카드 자동 전환
- ✨ **Tab 분기** — `?tab=attendance` / `?tab=promotion` / `?tab=revenue`
- ✨ **JS 함수 28개** — 탭별 핸들러 (toggleExpand×3, sortBy×3, markSent×2, approvePromotion 등) + 통합 차트 hover

**메인 ↔ KPI 상세 양방향 연결 (step_main_v6)**

- ✨ **KPI 카드 5개 모두 클릭 가능** (role="link" + tabindex + onclick)
  - Pro 카드 (출석/승급/매출) → `step_kpi_detail.html?tab=xxx&plan=pro`
  - Core 카드 (신규 등록 → step_members / 업무 완료율 → step_weekly_report)
- ✨ **자식 링크 격리** — overlay CTA, pro-lock CTA 클릭 시 부모 onclick 무효
- ✨ **Empty 상태 처리** — 학생 등록 안 됨 시 카드 본체 클릭 무효 (overlay만 활성)
- ✨ **Core 잠금 처리** — Core에서 promotion/revenue 카드 클릭 시 plan-badge 자동 클릭 (Pro 안내)
- ✨ **Plan 컨텍스트 전달** — 메인의 plan 상태를 상세 페이지에도 그대로 유지
- ✨ **키보드 접근성** — Tab으로 카드 포커스, Enter/Space로 활성화

**톤 통일 — "AI는 준비, 결정은 관장"** (관장 거부감 해소 핵심)

도장 관장의 AI 자동화에 대한 거부감/불안 해소를 위한 핵심 톤 변경:

| Before (자동화) | After (승인 기반) |
|---|---|
| 자동 안내 / 자동 발송 | **안내 보내기 / 메시지 초안 검토** |
| 자동 메시지 | **메시지 초안 자동 작성** (관장 검토 후 발송) |
| Pro 자동화 활성 | **Xiro 도우미 활성** |
| 학부모 자동 알림 N건 | **메시지 초안 준비 N건** |
| 절약한 시간 4h 30m | **최종 발송은 관장님 승인 후 진행돼요** (12건 중 11건 승인·발송) |
| 자동 회수 처리 | 결제 안내 준비 |

- ✅ 유지: Stripe 자동 결제 / 자동 회수 / 자동 동기화 (학부모 약정 또는 시스템 동작)
- ✅ 변경: 학부모를 향한 메시지 발송은 모두 "관장 승인 후" 명시
- ✅ 적용 파일: `step_kpi_detail`, `step_main_v6`, `step_members`, `step_setup_step8`

**차트 X축 라벨 겹침 수정**
- 🔧 wrapper height 180px → 230px
- 🔧 SVG 인라인 height 제거, preserveAspectRatio "none" → "xMidYMid meet"
- 🔧 X 라벨 13px / Y 라벨 11px (시각적 균형)

### v6.5

**철학 정립 — Plan 분기 단순화**
- 도장 초기 설정 8단계는 **모든 사용자 공통** (Core/Pro 동일 흐름)
- Plan은 "운영 모드"의 차이지 "도장 데이터"의 차이가 아님
- 데이터 vs 자동화 모드 분리 원칙 정립 — Setup은 통합, Plan별 차이는 페이지 내부 옵션으로

**메인 대시보드 (step_main_v6)**
- ✨ **Pro Mode Preview 시스템** — 5단계 마일스톤 (Day 0/30/33/37/38)
  - Day 30: 🎉 7일 무료 체험 제안 (Earned Moment)
  - Day 33: ✨ 체험 4일째 (활용 통계)
  - Day 37: ⏰ 종료 24시간 전 (Loss Aversion)
  - Day 38: 📊 회상 (다시 결제 유도)
- ✨ **PLAN 토글** — Core/Pro 즉시 전환 (1800px Pro / 1280px Core)
- ✨ **업셀 카드 재설계** — Loss Aversion ($420 회수) + Earned Moments (승급 후보 박서윤·이도현)
- ✨ **코치마크 Pro 완성 상태 기반** — Briefing → KPI → Ops Center → Live Dojang → Quick Actions
- 🔧 **헤더 토글 순서 재정렬** — PLAN → 설정 → UPSELL → DAY
- 🔧 **DEMO → 설정 라벨 변경** (시연 토글)
- 🔧 **KPI overflow + 아바타 정리** — 카드 영역 외부 노출 차단
- 🔧 **Briefing 모드별 CTA 분기** — Pro 파랑 / Core 보라

**가격정책 (step_setup_step4)**
- ✨ **미국 도장 샘플 5개 사전 입력** (검토/수정 방식)
  - Tiny Tigers (3-5세) $130 / Kids Beginner (6-12세) $150 / Kids Black Belt Club $180 / Adult Class (13세+) $160 / Family Plan $120
- ✨ **Pro Plan 전용 Stripe Connect 카드** — `?plan=pro`로 분기
  - 매월 자동 결제 + 미납 자동 회수 + Play STEP 학부모 결제
- 🔧 빈 폼 → 채워진 폼: "확인해주세요" 톤으로 변경

**행사 일정 (step_setup_step8)**
- 🔧 **모든 사용자 공통 일반 톤** — "올해 도장 일정을 캘린더에 등록해주세요"
- 🔧 승급심사 "필수" 잠금 제거 (Core 사용자에게 부담 X)
- 🔧 첫 행도 일반 행으로 (삭제 가능, 건너뛰기 활성화)
- ✨ **Pro Plan 자동화 카드** — `?plan=pro`로 분기
  - 학부모 자동 안내 + 승급심사 대상 자동 추천 + 대회 등록 추적

**설정 안내 (step_setup_required)**
- 🔧 **완전 통합** — Plan 분기 마크업 모두 제거, 모든 사용자에게 동일 8단계 표시
- 🔧 헤더 토글 라벨 정리: "DEMO Case A/B" → "설정 시작 안 함/일부 완료"
- 🔧 메인 복귀 버튼 헤더 추가

**라벨 통일 (4개 파일)**
- 🔧 step_main_v6, step_setup_required, step_members, step_attendance
- "DEMO" → **"설정"** 시연 토글 라벨 통일

**링크 무결성 점검 (배포 전 마지막 정리)**
- 🔗 `index.html`, `step_pricing_page_v2.html` → onboarding_v1 → **onboarding_step1** (4회씩)
- 🔗 `step_setup_step4_bulk.html` → main_v5 → **main_v6** (3회)
- 🔗 `step_onboarding_v1.html` → 51KB 구버전 → **1.3KB redirect stub** (하위 호환성 유지)
- 🔗 `step_main_v6`, `step_members` → 외부 절대 URL → **상대 경로**
- 🔗 `step_notification_demo` → 깨진 panel.html 링크 → step_index
- 🔗 `step_setup_required`, `step_weekly_report` → "메인으로" 복귀 버튼 추가
- ✅ **검증 결과: 30개 파일, 깨진 링크 0개, 정방향 흐름 20/20, 양방향 메인 ↔ 운영 4/4**

### v6.2
- ✨ **온보딩 8단계로 분리** — 단일 파일 → 8개 독립 페이지
- ✨ **Plan 선택 페이지 신규** (step_onboarding_step6) — Core/Pro 라디오 선택, Pro 기본 추천, Grow hint
- ✨ **index.html 통합** — Vercel root URL이 v6.2 pricing 사본으로 자동 서빙
- ✨ **step_attendance.html 시연 흐름에 통합** — 라이브 도장 → 출석 마킹 화면
- ✨ **step_setup_required.html 경유** — 메인 "이어하기" → 통합 안내 → 미완 단계로 점프
- ✨ **_archive/ 폴더** — 옛 v1 원본 보존 (하위 호환성)
- ✨ **cleanup.ps1** — 폴더 정리 자동화 스크립트
- 🔧 **검은띠 표현 → 기본 설정 완료**로 단순화 (step_setup_step9, step_index)
- 🔧 **Pro Plan 뱃지 + 동적 plan 처리 제거** — 결정은 step6에서만
- 🔧 **pricing 페이지 STEP 컬러 통일** — Primary 파랑, Pro 카드만 보라 유지
- 🔧 **pricing nav 5개 카테고리** — Home / Product / Pricing / Resources / Contact
- 🔧 **step_attendance v5 → v6 링크 정리** (5곳)
- 🔧 **step_setup_required 메인 복귀 링크 추가**
- 🗑️ **구버전 파일 정리** — step_main_v4*, step_main_v5, step_index_backup, ZIP 백업

### v6.1
- ✨ **step_index.html** — 사용자 여정 중심 인덱스 (3 Journey + 17개 파일 카드)
- ✨ **step_members.html** — 회원 관리 빈 상태 페이지
- ✨ **코치마크 시스템** — 페이지별 화면 둘러보기
- 🔧 **메인 v6 KPI 깨짐 수정** — empty overlay 3-row 재설계
- 🔧 **링크 v5 → v6 업데이트** — step_setup_step9, step4_bulk, notification_demo

---

## 🧪 시연 팁

### 헤더 토글 4종 (메인 v6) ⭐ v6.5
화면 좌상단 토글로 즉시 시연 모드 전환 — 순서: **PLAN → 설정 → UPSELL → DAY**

**PLAN** (Plan별 화면 분기)
- `Core` — 1280px 폭, 단독 제품 느낌, 3컬럼 KPI 중 출석/신규/업무
- `Pro` — 1800px 풀 폭, 출석/승급/매출 KPI

**설정** (이전 "DEMO" 라벨)
- `정상` — 모든 데이터 활성, 일일 브리핑 표시
- `설정 미완` — 글로벌 배너 + KPI 잠금 + Ops Center 긴급 항목

**UPSELL** (Pro 업셀 트리거)
- `ON` — Xiro Whisper, Loss Aversion 카드 ($420 회수), Earned Moments (승급 후보) 표시
- `OFF` — 모든 업셀 메시지 숨김 (정식 제품 모습)

**DAY** (Pro Mode Preview 마일스톤) ⭐ v6.5 신규
- `일반` — Day 0, 평상시 운영 화면
- `30` — 🎉 30일 마일스톤, 7일 무료 체험 제안
- `33` — ✨ 체험 4일째, 활용 통계 (자동 회수 $280, Xiro 12회)
- `37` — ⏰ 종료 24시간 전, Loss Aversion (절약 시간 8h, 회수 $580)
- `38` — 📊 회상, 다시 결제 유도

### Pro 분기 시연 (Setup + KPI Detail 페이지)
URL 파라미터로 즉시 분기 가능:
- `step_setup_step4.html?plan=pro` — 가격정책 + Stripe Connect 카드 표시
- `step_setup_step4.html?plan=core` — 가격정책만 (Stripe 카드 숨김)
- `step_setup_step8.html?plan=pro` — 행사 일정 + Xiro 도우미 카드 (메시지 초안 준비, 후보 분석, 등록 관리)
- `step_setup_step8.html?plan=core` — 행사 일정만 (캘린더 등록 일반 톤)

⭐ **v6.6 신규: KPI 상세 페이지 분기**
- `step_kpi_detail.html` — 기본 (Attendance 탭 + Pro)
- `step_kpi_detail.html?tab=attendance` / `?tab=promotion` / `?tab=revenue` — 탭 직접 진입
- `step_kpi_detail.html?plan=core` — Core 모드 (Pro 자동화 → Core 업셀 카드 자동 전환)
- `step_kpi_detail.html?tab=revenue&plan=core` — 조합 (Core + Revenue)

### 코치마크 리셋 (재테스트)
브라우저 콘솔에서:
```javascript
localStorage.removeItem('step.coach.seen.main');
localStorage.removeItem('step.coach.seen.members');
location.reload();
```

### 온보딩 단계 점프
각 온보딩 페이지 상단의 sticky NAV에서 어떤 단계든 클릭 가능:
- 완료 단계: 짙은 색 (검은) — 클릭 시 그 단계 페이지로 이동
- 현재 단계: 파란 강조
- 미진행: 회색 — 클릭 시 그 단계로 점프 가능

### URL 파라미터
- `?state=empty` — 메인을 설정 미완 상태로 진입
- `?mode=csv` — 회원 관리 등록 시 CSV 임포트 모드
- `?plan=pro` / `?plan=core` — Setup Step 4/8에서 Plan별 옵션 분기 ⭐ v6.5
- `?mode=sample` — 회원 관리 등록 시 샘플 데이터 모드

---

## 🚢 v6.6 배포 가이드

### Step 1 — 변경된 파일 받기

이 README와 함께 받은 4개 파일을 `C:\Users\xinapse\Desktop\step-demo\`에 덮어쓰기.

**🆕 v6.6 변경 파일 (4개)**

| 카테고리 | 파일 | 변경 요약 |
|---|---|---|
| **🆕 KPI 상세** | `step_kpi_detail.html` | 신규 — 3-tab 통합 KPI 상세 페이지 (224KB, 5099 lines) |
| **메인 운영 OS** | `step_main_v6.html` | KPI 카드 5개 onclick 연결 + 톤 통일 (Pro 자동화 → Xiro 도우미) |
| **회원 관리** | `step_members.html` | 톤 통일 (자동 → Xiro 도우미) |
| **행사 일정** | `step_setup_step8.html` | Pro 자동화 카드 → Xiro 도우미 카드 |
| **문서** | `README.md` | 이 파일 |

**🚨 v6.5에서 변경 없음 (덮어쓰지 않아도 됨)**
- `step_index.html`, `step_pricing_page_v2.html`, `index.html`
- `step_setup_step0~7.html`, `step_setup_step9.html`, `step_setup_required.html`
- `step_setup_step4.html`, `step_setup_step4_bulk.html`
- `step_attendance.html`, `step_weekly_report.html`, `step_notification_demo.html`
- `step_onboarding_step1~8.html`, `step_onboarding_v1.html`
- `step_upsell_triggers_v1.html`, `_archive/`

다만 모든 파일을 한 번에 받으셨다면 그냥 전체 덮어쓰기로 진행하셔도 동일하게 작동합니다.

---

### Step 2 — Git 커밋 + 푸시

```powershell
cd C:\Users\xinapse\Desktop\step-demo

# 1. 변경 확인
git status

# 2. v6.6 변경 파일 추가
git add step_kpi_detail.html step_main_v6.html step_members.html step_setup_step8.html README.md

# 3. v6.6 통합 커밋
git commit -m "v6.6: 100-point KPI detail page + Main↔Detail wiring + Xiro tone

NEW:
- step_kpi_detail.html: 3-tab integrated detail page (Attendance/Promotion/Revenue)
  · Hero KPI 4-block with sparklines and mini avatars
  · SVG charts with Y-axis labels, ghost line, hover tooltip, pulse dot
  · Student/candidate/payment lists with inline expansion (4w-14m patterns)
  · Multi-select checkboxes + Bulk Action Bar
  · Sortable columns (attendance rate / amount)
  · Xiro suggested actions card + automation timeline
  · Plan branching (?plan=core/pro), Tab branching (?tab=xxx)
  · 28 JS functions

CHANGED:
- step_main_v6: 5 KPI cards now clickable (Main↔Detail wiring)
  · Pro cards (attendance/promotion/revenue) → step_kpi_detail.html?tab=xxx
  · Core cards (signup → step_members, tasks → step_weekly_report)
  · Child link isolation, empty state handling, Core lock handling
  · Keyboard a11y (role=link, tabindex, Enter/Space)

TONE UNIFICATION (도장 관장 거부감 해소):
- '자동 안내/발송' → '안내 보내기 / 메시지 초안 검토'
- 'Pro 자동화 활성' → 'Xiro 도우미 활성'
- '학부모 자동 알림 N건' → '메시지 초안 준비 N건'
- All parent-facing messages now '관장 승인 후 발송'
- Stripe auto-billing kept (parent contract-based)
- Applied: step_kpi_detail, step_main_v6, step_members, step_setup_step8

FIX:
- Chart X-axis label overlap (wrapper 180→230px, preserveAspectRatio none→xMidYMid meet)
"

# 4. 푸시
git push

# 1~2분 후 Vercel 자동 배포
# https://step-demo-tau.vercel.app
```

---

### Step 3 — 배포 검증 체크리스트

배포 1~2분 후 다음 URL이 모두 작동하는지 확인:

```
🆕 v6.6 신규 페이지
✅ https://step-demo-tau.vercel.app/step_kpi_detail                          ← Attendance 탭 (기본)
✅ https://step-demo-tau.vercel.app/step_kpi_detail?tab=promotion           ← Promotion 탭
✅ https://step-demo-tau.vercel.app/step_kpi_detail?tab=revenue             ← Revenue 탭
✅ https://step-demo-tau.vercel.app/step_kpi_detail?plan=core               ← Core 모드 (Pro 자동화 → 업셀 카드)
✅ https://step-demo-tau.vercel.app/step_kpi_detail?tab=revenue&plan=core   ← 조합 (Core + Revenue)

🌐 진입점
✅ https://step-demo-tau.vercel.app/                              ← Vercel root (pricing)
✅ https://step-demo-tau.vercel.app/step_index                    ← 시연 인덱스

📄 가격 + 온보딩
✅ https://step-demo-tau.vercel.app/step_pricing_page_v2
✅ https://step-demo-tau.vercel.app/step_onboarding_step1         ← 환영
✅ https://step-demo-tau.vercel.app/step_onboarding_step6         ← Plan 선택

🥋 도장 설정
✅ https://step-demo-tau.vercel.app/step_setup_step0              ← 시작
✅ https://step-demo-tau.vercel.app/step_setup_step4              ← 가격정책 (Pro 기본)
✅ https://step-demo-tau.vercel.app/step_setup_step8?plan=pro     ← 행사 일정 + Xiro 도우미 (v6.6 톤 변경)
✅ https://step-demo-tau.vercel.app/step_setup_step9              ← 기본 설정 완료

🏢 운영 OS (v6.6 KPI 클릭 가능)
✅ https://step-demo-tau.vercel.app/step_main_v6                  ← KPI 5개 모두 클릭 가능 ⭐ v6.6
✅ https://step-demo-tau.vercel.app/step_members
✅ https://step-demo-tau.vercel.app/step_attendance
✅ https://step-demo-tau.vercel.app/step_weekly_report
```

---

### Step 4 — 시연 흐름 빠른 점검

배포 후 step_index에서 시작해 끝까지 클릭해보기:

**v6.6 핵심 시연 — 메인 ↔ KPI 상세 왕복** ⭐
```
1. step_main_v6 진입 → 메인 대시보드
2. 출석률 84% 카드 클릭
   → step_kpi_detail?tab=attendance (Pro 모드)
3. 차트 hover → 수요일 60% tooltip ("지난주 92% / ↘ 32%p")
4. 김민준 행 클릭 → 4주 출석 패턴 펼침 + 학부모 정보
5. "안내 보내기" 클릭 → ✓ 발송 완료 + Hero KPI "위험 학생 3 → 2"
6. 탭 전환: 출석률 → 승급 예정자
   → 9명 후보, 박서윤·이도현 승인 대기
7. 박서윤 행 클릭 → 12개월 출석 95% + "사범 평가 미완료"
8. "승인 처리" 클릭 → ✓ 승인 완료 + Hero "승인 대기 2 → 1"
9. 탭 전환: 승급 → 매출
   → $18,420 / 미납 $420 (3건)
10. 차트 hover → 4월 $18,420 + 미납 $420
11. 이서연 행 클릭 → 카드 만료 (5/24) + "갱신 요청" 버튼
12. "메인으로" 클릭 → step_main_v6 복귀
```

**v6.6 Plan 분기 시연** ⭐
```
A. 메인에서 PLAN 토글 → Core 전환
B. 메인 출석률 84% 카드 클릭
   → step_kpi_detail?tab=attendance&plan=core (Core 모드 자동 전달)
C. 우측 사이드바 확인
   → Pro 자동화 카드 → Core 업셀 카드로 자동 전환
D. 메인 복귀 → 승급 카드 클릭 (Core 잠금 상태)
   → Pro 업셀 안내 (plan-badge 자동 토글)
```

**v6.6 톤 통일 확인 포인트**
```
✓ 메인 우측 ROI 카드: "학부모 자동 응답" → "학부모 답장 도우미"
✓ KPI 상세 Pro 카드: "Pro 자동화 활성" → "Xiro 도우미 활성"
✓ KPI 상세 통계: "학부모 자동 알림 12건" → "메시지 초안 준비 12건"
✓ KPI 상세 Pro 설명: "최종 발송은 관장님 승인 후 진행돼요"
✓ 모든 액션 버튼: "자동 안내" → "안내 보내기"
✓ 모든 Toast 메시지: "자동 안내가 발송됐어요" → "안내 메시지를 보냈어요"
```

어디서 깨지면 즉시 피드백 주세요.

---

### Step 5 — 롤백 방법 (만약을 위해)

배포 후 문제 발견 시:

```powershell
cd C:\Users\xinapse\Desktop\step-demo

# 직전 커밋으로 롤백
git revert HEAD
git push

# 또는 특정 커밋으로 hard reset (주의: force push 필요)
git log --oneline -5    # 이전 커밋 확인
git reset --hard <commit-hash>
git push --force        # 신중하게!
```

Vercel에서도 직전 deployment를 promote할 수 있으니 web dashboard에서 처리 가능.

---

## 🚢 v6.5 배포 가이드 (참고용)

### Step 1 — 변경된 파일 받기

이 README와 함께 받은 12개 파일을 `C:\Users\xinapse\Desktop\step-demo\`에 덮어쓰기.

**🆕 v6.5 변경 파일 (12개 모두 덮어쓰기)**

| 카테고리 | 파일 | 변경 요약 |
|---|---|---|
| **메인 운영 OS** | `step_main_v6.html` | Pro Mode Preview 5단계, PLAN 토글, 코치마크 재설계, 라벨 통일, 외부 URL → 상대 경로 |
| **도장 설정** | `step_setup_step4.html` | 미국 도장 샘플 5개 + Pro Stripe Connect 카드 |
| | `step_setup_step8.html` | 일반 톤 + Pro 자동화 카드, 승급심사 필수 잠금 제거 |
| | `step_setup_step4_bulk.html` | step_main_v5 → step_main_v6 (3회) |
| **설정 안내** | `step_setup_required.html` | Plan 분기 제거 (완전 통합), 라벨 통일, 메인 복귀 버튼 |
| **회원/출석** | `step_members.html` | 라벨 통일, 외부 URL → 상대 경로 |
| | `step_attendance.html` | 라벨 통일 |
| **주간 리포트** | `step_weekly_report.html` | 헤더에 "메인" 복귀 링크 추가 |
| **온보딩 진입점** | `index.html` | onboarding_v1 → onboarding_step1 (4회) |
| | `step_pricing_page_v2.html` | onboarding_v1 → onboarding_step1 (4회) |
| | `step_onboarding_v1.html` | 51KB → 1.3KB redirect stub (옛 URL 호환성 유지) |
| **알림 데모** | `step_notification_demo.html` | 깨진 panel.html 링크 → step_index |
| **문서** | `README.md` | 이 파일 |

**🚨 v6.2에서 변경 없음 (덮어쓰지 않아도 됨)**
- `step_index.html`, `step_setup_step0~3.html`, `step_setup_step5~7.html`, `step_setup_step9.html`
- `step_onboarding_step1~8.html`, `step_upsell_triggers_v1.html`, `_archive/`

다만 모든 파일을 한 번에 받으셨다면 그냥 전체 덮어쓰기로 진행하셔도 동일하게 작동합니다.

---

### Step 2 — Git 커밋 + 푸시

```powershell
cd C:\Users\xinapse\Desktop\step-demo

# 1. 변경 확인
git status

# 2. 모든 변경 추가
git add .

# 3. v6.5 통합 커밋
git commit -m "v6.5: Pro Mode Preview, unified setup flow, Plan-aware setup pages

- step_main_v6: Pro Mode Preview 5-state milestone (Day 0/30/33/37/38)
- step_main_v6: PLAN toggle (Core 1280 / Pro 1800), upsell card redesign
- step_main_v6: Coachmark redesign for Pro completed-state user
- step_setup_step4: US dojang sample plans (5 pre-filled) + Pro Stripe Connect card
- step_setup_step8: Unified general tone for all plans + Pro automation card
- step_setup_required: Remove all Plan branching (complete unification)
- Label unification: DEMO -> 설정 (4 files)
- Link integrity: index/pricing -> onboarding_step1, step4_bulk -> main_v6
- Add Main return links: setup_required, weekly_report
- Convert onboarding_v1 to redirect stub (51KB -> 1.3KB)"

# 4. 푸시
git push

# 1~2분 후 Vercel 자동 배포
# https://step-demo-tau.vercel.app
```

---

### Step 3 — 배포 검증 체크리스트

배포 1~2분 후 다음 URL이 모두 작동하는지 확인:

```
🌐 진입점
✅ https://step-demo-tau.vercel.app/                              ← Vercel root (pricing)
✅ https://step-demo-tau.vercel.app/step_index                    ← 시연 인덱스

📄 가격 + 온보딩
✅ https://step-demo-tau.vercel.app/step_pricing_page_v2
✅ https://step-demo-tau.vercel.app/step_onboarding_step1         ← 환영
✅ https://step-demo-tau.vercel.app/step_onboarding_step6         ← Plan 선택
✅ https://step-demo-tau.vercel.app/step_onboarding_v1            ← 옛 URL → 자동 리다이렉트 → step1

🥋 도장 설정
✅ https://step-demo-tau.vercel.app/step_setup_step0              ← 시작
✅ https://step-demo-tau.vercel.app/step_setup_step4              ← 가격정책 (Pro 기본)
✅ https://step-demo-tau.vercel.app/step_setup_step4?plan=pro     ← 가격정책 + Stripe Connect 카드 ⭐ v6.5
✅ https://step-demo-tau.vercel.app/step_setup_step4?plan=core    ← 가격정책만 (Stripe 카드 숨김) ⭐ v6.5
✅ https://step-demo-tau.vercel.app/step_setup_step8?plan=pro     ← 행사 일정 + 자동화 카드 ⭐ v6.5
✅ https://step-demo-tau.vercel.app/step_setup_step8?plan=core    ← 행사 일정 (일반 톤) ⭐ v6.5
✅ https://step-demo-tau.vercel.app/step_setup_step9              ← 기본 설정 완료
✅ https://step-demo-tau.vercel.app/step_setup_required           ← 설정 미완 안내

🏢 운영 OS
✅ https://step-demo-tau.vercel.app/step_main_v6                  ← 메인 (PLAN/설정/UPSELL/DAY 토글)
✅ https://step-demo-tau.vercel.app/step_members
✅ https://step-demo-tau.vercel.app/step_attendance               ← 출석 마킹
✅ https://step-demo-tau.vercel.app/step_weekly_report            ← 주간 업무일지 (메인 링크 추가)
```

---

### Step 4 — 시연 흐름 빠른 점검

배포 후 step_index에서 시작해 끝까지 클릭해보기:

**기본 흐름** (E2E 신규 가입)
```
1. step_index → Journey 1 "지금 바로 시작하기"
2. step_pricing_page_v2 → "Start with Pro"
3. step_onboarding_step1 ~ step5 (자연스럽게 진행)
4. step_onboarding_step6 (Plan 선택, Pro 기본 체크)
5. step_onboarding_step7 (결제) → step8 (완료)
6. step_setup_step0 ~ step9 (도장 설정 8단계)
7. step_main_v6 (메인 진입, 코치마크 자동 발동)
8. 라이브 도장 → "Mark Attendance" → step_attendance
9. 설정 토글 "설정 미완" → "이어하기" → step_setup_required → "메인으로" 복귀
```

**v6.5 신규 시연 포인트** ⭐
```
A. step_main_v6 헤더의 PLAN 토글 → Pro / Core 즉시 전환
   - Pro: 1800px 풀 폭, KPI 3종 (출석/승급/매출)
   - Core: 1280px, KPI 3종 (출석/신규 등록/업무 완료율)

B. step_main_v6 헤더의 DAY 토글 → Pro Mode Preview 마일스톤
   - 일반 → 30 → 33 → 37 → 38 순서로 시연
   - Day 30: 🎉 7일 무료 체험 제안
   - Day 37: ⏰ 종료 24시간 전 (Loss Aversion)
   - Day 38: 📊 회상 (재결제 유도)

C. step_setup_step4?plan=pro vs ?plan=core
   - Pro: 가격 5개 샘플 + Stripe Connect 카드
   - Core: 가격 5개 샘플만 (Stripe 카드 숨김)

D. step_setup_step8?plan=pro vs ?plan=core
   - Pro: 행사 일정 + 자동화 카드 (학부모 자동 안내, 승급심사 자동 추천)
   - Core: 행사 일정만 (캘린더 등록 일반 톤)
```

어디서 깨지면 즉시 피드백 주세요.

---

### Step 5 — 롤백 방법 (만약을 위해)

배포 후 문제 발견 시:

```powershell
cd C:\Users\xinapse\Desktop\step-demo

# 직전 커밋으로 롤백
git revert HEAD
git push

# 또는 특정 커밋으로 hard reset (주의: force push 필요)
git log --oneline -5    # 이전 커밋 확인
git reset --hard <commit-hash>
git push --force        # 신중하게!
```

Vercel에서도 직전 deployment를 promote할 수 있으니 web dashboard에서 처리 가능.

---

## 👤 메인 컨택트

**Steve** · IT 전문가, 기업가<br>
📍 South Korea, Gumi<br>
🎯 STEP 생태계 — Play STEP / Event STEP / Plus STEP / STEP Partner / World Taekwondo Lab

---

*"Manage → Execute → Auto Growth"*<br>
**STEP Manager** — 미국 도장 운영의 OS
