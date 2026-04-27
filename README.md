# STEP Manager — Demo Mock-ups

> 태권도 도장 운영 SaaS의 풀 사이클 디자인 목업.<br>
> **가격 페이지 → 온보딩 → 결제 → 도장 설정 → 메인 운영**까지 끊김 없이 클릭 가능한 시연 환경입니다.

🌐 **Live Demo**: https://step-demo-tau.vercel.app<br>
📦 **GitHub**: https://github.com/STEPNEXT-US/step-demo<br>
🗓️ **버전**: v6.1 (2026.04)

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
   │  Pro 또는 Core 선택 클릭
   │  → ?plan=pro / ?plan=core 컨텍스트 자동 전달
   ▼
step_onboarding_v1.html?plan=pro
   │  AI 온보딩 7단계
   │  ├ 1. 환영 (홈페이지 주소 입력)
   │  ├ 2. 도장 주소 (timezone 자동 설정)
   │  ├ 3. AI 분석 (홈페이지 정보 수집)
   │  ├ 4. 검수
   │  ├ 5. 인사이트 추출
   │  ├ 6. 결제 등록 (60일 무료, 카드 등록)
   │  └ 7. 완료 — "도장 설정 시작하기"
   ▼
step_setup_step0.html
   │  도장 초기 설정 진입점
   │  흰띠 → 검은띠 게이미피케이션
   ▼
step_setup_step1.html ~ step_setup_step8.html
   │  기본 설정 (1~5): 도장 정보 / 띠 체계 / 수업 시간표 / 가격 / 학생 등록
   │  추가 설정 (6~8): 직원 / 용품 / 행사 (선택)
   ▼
step_setup_step9.html
   │  🎉 검은띠 달성 화면
   │  "STEP Manager 시작하기" 클릭
   ▼
step_main_v6.html
   메인 대시보드 진입
```

**시연 포인트**:
- Pro 클릭 시 결제 페이지에 자동으로 **$249/mo 보라색 뱃지** 표시
- Core 클릭 시 **$50/mo 녹색 뱃지** 표시
- 직접 진입(파라미터 없음) 시 뱃지 없이 자연스럽게 흘러감

### 2️⃣ 운영 중 사용자 — 메인에서 일상 운영

도장이 이미 셋업된 상태의 일상 워크플로입니다.

```
step_main_v6.html
   ├ Xiro 일일 브리핑 카드
   ├ KPI 3종 (출석률 · 승급 예정자 · 매출)
   ├ Ops Center / 라이브 도장 / Event Hub
   └ 빠른 액션 7개
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
- 우상단 `DEMO` 토글로 **정상 ↔ 설정 미완** 즉시 전환
- 우상단 `UPSELL ON/OFF`로 업셀 트리거 켜기/끄기
- 신규 페이지 첫 진입 시 **코치마크 자동 1회 발동**

### 3️⃣ 설정 미완 사용자 — 중단된 셋업 이어가기

도장 설정 도중에 빠져나갔다가 돌아온 사용자의 시나리오입니다.

```
step_main_v6.html?state=empty
   │  (또는 헤더 DEMO 토글로 "설정 미완" 클릭)
   │
   │  화면 변화:
   │  ├ 상단에 글로벌 setup-banner 노출
   │  │   "설정을 마저 끝내면 모든 기능이 켜져요 [4/5]"
   │  │   "이어하기 →" 버튼
   │  │
   │  ├ Xiro 일일 브리핑이 "75% 완료" 메시지로 변형
   │  ├ KPI 3개가 "설정 필요" 잠금 상태
   │  └ Ops Center 긴급 항목에 "학생 등록 필요"
   │
   ▼ "이어하기 →" 클릭
step_setup_step5.html  (학생 등록 — 미완 단계)
   ▼
step_setup_step9.html  ("여기까지" 또는 모든 단계 완주)
   ▼
step_main_v6.html  (메인 복귀, 모든 KPI 활성화)
```

**시연 포인트**:
- 같은 화면이 layered IA로 **여러 진입점에서 동일 메시지**를 다른 각도로 노출
- "이어하기" 한 번 클릭으로 중단된 단계로 점프

---

## 📁 파일 구조

```
step-demo/
├── step_index.html               ← 모든 시연의 진입점 ⭐
│
├── 📄 가격 & 온보딩
│   ├── step_pricing_page_v2.html      ← Core/Pro 선택
│   └── step_onboarding_v1.html        ← AI 온보딩 7단계 + 결제 통합
│
├── 🥋 도장 초기 설정 (10단계)
│   ├── step_setup_step0.html          ← 시작
│   ├── step_setup_step1.html          ← 도장 정보
│   ├── step_setup_step2.html          ← 띠 체계
│   ├── step_setup_step3.html          ← 수업 시간표
│   ├── step_setup_step4.html          ← 가격정책
│   ├── step_setup_step4_bulk.html     ← 가격정책 일괄 모드
│   ├── step_setup_step5.html          ← 학생 등록
│   ├── step_setup_step6.html          ← 직원 등록 (선택)
│   ├── step_setup_step7.html          ← 용품·재고 (선택)
│   ├── step_setup_step8.html          ← 행사 일정 (선택)
│   └── step_setup_step9.html          ← 🎉 검은띠 달성
│
├── 🏢 운영 OS
│   ├── step_main_v6.html              ← 메인 대시보드 ⭐
│   └── step_members.html              ← 회원 관리
│
└── 📑 명세서 / 데모
    ├── step_weekly_report.html        ← Tasks/SOP (Vercel 배포)
    ├── step_notification_demo.html    ← 알림 시스템 데모
    └── step_upsell_triggers_v1.html   ← 업셀 트리거 명세
```

---

## 🛠️ 주요 디자인 결정사항

### 디자인 시스템
- **폰트**: Pretendard (한글) + JetBrains Mono (숫자) + Inter (영문)
- **컬러**: Light mode #F9FAFB 베이스, 파란색 #2563EB primary
- **모서리**: rounded-2xl (18px) 통일
- **톤**: Toss 스타일 (직관적, 따뜻한, 친근한)

### 정보 구조 (IA)
- **Layer 1 — 운영 OS**: work / calendar / notes / communication
- **Layer 2 — 비즈니스 데이터**: MEMBER + EVENT + GOODS + MANAGEMENT
- **Layered Information Architecture**: 같은 사실을 다른 각도로 (Setup banner / Briefing / KPI / Ops Center / Quick Actions)

### 가격 (3 Tier)
- **Core $50/mo** — Run (운영 OS)
- **Pro $249/mo** — Manage (B2C 통합, Stripe, Xiro AI)
- **Grow $399/mo** — Grow (사이트, 콘텐츠 자동화) — Future hint

### AI 에이전트
- 이름: **Xiro** (지로) — 도장 운영 전반 도와줌
- 메인의 일일 브리핑, Ask Xiro 챗 패널, 코치마크 안내자

### 게이미피케이션
- 도장 초기 설정을 **흰띠 → 노란띠 → 초록띠 → 파란띠 → 빨간띠 → 검은띠** 진행으로 표현
- Owner도 도장 학생처럼 띠를 따며 셋업 완주

### 코치마크 시스템 (v6.1 신규)
- Linear/Stripe 스타일 spotlight + 사이드 카드
- 페이지별 가이드 데이터 (`PAGE_GUIDES`)로 재사용
- 신규 페이지 첫 진입 시 자동 1회 발동 (localStorage 마킹)
- 도움말 패널의 "이 화면 둘러보기"로 수동 발동

---

## 📝 변경 로그 (v6.1 → 이번 세션)

### 신규
- ✨ **step_index.html** — 사용자 여정 중심 인덱스 (3 Journey + 17개 파일 카드)
- ✨ **step_members.html** — 회원 관리 빈 상태 페이지 (3가지 등록 옵션 + 미리보기 테이블)
- ✨ **코치마크 시스템** — 페이지별 화면 둘러보기 (메인, 회원관리)
- ✨ **Plan 컨텍스트 전달** — pricing → onboarding 간 ?plan=pro / ?plan=core URL 파라미터로 동적 표시

### 수정
- 🔧 **링크 v5 → v6 업데이트** — step_setup_step9, step4_bulk, notification_demo
- 🔧 **메인 v6 KPI 깨짐 수정** — empty overlay 3-row 재설계, 카드 min-height 168px
- 🔧 **메인 v6 사이드바 회원관리** — step_members.html로 라우팅 연결

---

## 🧪 시연 팁

### DEMO 토글 (메인 v6 헤더)
화면 우상단의 토글로 즉시 상태 전환:
- `정상` — 모든 데이터 활성, 일일 브리핑 표시
- `설정 미완` — 글로벌 배너 + KPI 잠금 + Ops Center 긴급 항목

### UPSELL ON/OFF (메인 v6 헤더)
Pro 업셀 트리거 활성/비활성:
- `ON` — Xiro Whisper, ROI 모달, Soft Choice 등 트리거 작동
- `OFF` — 모든 업셀 메시지 숨김

### 코치마크 리셋 (재테스트)
브라우저 콘솔에서:
```javascript
localStorage.removeItem('step.coach.seen.main');
localStorage.removeItem('step.coach.seen.members');
location.reload();
```

### URL 파라미터
- `?state=empty` — 메인을 설정 미완 상태로 진입
- `?plan=pro` — 온보딩에 Pro 컨텍스트 전달
- `?plan=core` — 온보딩에 Core 컨텍스트 전달
- `?mode=csv` — 회원 관리 등록 시 CSV 임포트 모드
- `?mode=sample` — 회원 관리 등록 시 샘플 데이터 모드

---

## 🚢 배포

```bash
# 로컬 작업 폴더
cd C:\Users\xinapse\Desktop\step-demo

# 변경사항 커밋 + 푸시
git add .
git commit -m "v6.1: index, members, coach mark system"
git push

# 1~2분 후 자동 배포
# https://step-demo-tau.vercel.app
```

---

## 👤 메인 컨택트

**Steve** · IT 전문가, 기업가<br>
📍 South Korea, Gumi<br>
🎯 STEP 생태계 — Play STEP / Event STEP / Plus STEP / STEP Partner / World Taekwondo Lab

---

*"Manage → Execute → Auto Growth"*<br>
**STEP Manager** — 미국 도장 운영의 OS
