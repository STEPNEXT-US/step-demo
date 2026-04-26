# STEP Manager — Demo Flow

> 태권도 도장을 위한 AI 기반 SaaS, **STEP Manager**의 사용자 흐름 데모입니다.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-step--demo.vercel.app-2563EB?style=flat-square)](https://step-demo.vercel.app)
[![Status](https://img.shields.io/badge/Status-v1.0-10B981?style=flat-square)](#)
[![Mockup](https://img.shields.io/badge/Type-Mockup-A855F7?style=flat-square)](#)

---

## 🎯 개요

이 데모는 STEP Manager의 **신규 도장 가입부터 일상 운영까지의 풀 사용자 흐름**을 체험할 수 있는 정적 HTML 목업 모음입니다.

- **타겟**: 미국 시장 진출 태권도 도장
- **기술**: Pretendard / Inter / JetBrains Mono · Tailwind CSS · 순수 HTML
- **AI 에이전트**: **Xiro (지로)** — 도장 운영 자동화 핵심
- **디자인 시스템**: Toss 스타일 (`rounded-2xl`, 라이트 모드, 통화 $ 단위)

---

## 🔗 사용자 흐름 (4단계)

```
1️⃣  가격 페이지       →  2️⃣  온보딩 (7-step)  →  3️⃣  도장 설정 (8-step) →  4️⃣  메인 라이브 현황판
   pricing_page_v2.html      onboarding_v1.html       setup_step0~9.html       main_v4.html
```

### 1️⃣ 가격 페이지 ([`step_pricing_page_v2.html`](step_pricing_page_v2.html))
- **Tiered Reveal** 전략 적용: Core ($50) / Pro ($249) 노출, Grow는 "Future hint"로 호기심 자극
- "Start with Pro" 클릭 → 온보딩으로 진입

### 2️⃣ 온보딩 ([`step_onboarding_v1.html`](step_onboarding_v1.html))
- 7단계 흐름: URL 입력 → AI 분석 → 검수 → SEO 인사이트 → 결제 등록 → 완료
- **"5분 안에 디지털 도장"** 이라는 핵심 차별화 가치 시연
- 마지막 CTA "도장 설정 시작하기" → 도장 설정으로 진입

### 3️⃣ 도장 초기 설정 ([`step_setup_step0.html`](step_setup_step0.html))
- 10페이지 (Step 0: AI 분석 + Step 1~8 설정 + Step 9 완료)
- 기본 설정 (1~4): 도장 정보 / 띠 / 시간표 / 학생
- 추가 설정 (5~8): 직원 / 용품 / 재고 / 행사
- 띠 게이미피케이션 적용 (흰띠 → 노란 → 주황 → 초록 → 파란 → 갈색 → 검은띠 ⭐)
- Step 4 분기점: "기본만" / "추가까지" 선택 가능
- Step 9 완료 → 메인 라이브 도장 현황판

### 4️⃣ 메인 라이브 도장 현황판 ([`step_main_v4.html`](step_main_v4.html))
- Xiro AI 일일 브리핑 + 핵심 KPI 3개 (출석률, 승급, 매출)
- Alarm Center / 라이브 도장 / Event Hub 3-컬럼 그리드
- Mark Attendance / Briefing Details / Ask Xiro

---

## 📂 파일 구조

```
step-demo/
├── index.html                     ← 진입점 (가격 페이지 v2 복사본)
│
├── step_index.html                ← 사이트맵 (모든 페이지 목록)
│
├── step_pricing_page_v1.html      ← 가격 페이지 v1 (IR/내부용 3티어)
├── step_pricing_page_v2.html      ← 가격 페이지 v2 (사용자용 Tiered Reveal)
│
├── step_onboarding_v1.html        ← 온보딩 7-step (단일 페이지)
│
├── step_setup_step0.html          ← 도장 설정: AI 분석 시작
├── step_setup_step1.html          ← 도장 설정: 도장 정보
├── step_setup_step2.html          ← 도장 설정: 띠 체계
├── step_setup_step3.html          ← 도장 설정: 수업 시간표
├── step_setup_step4.html          ← 도장 설정: 학생 등록 (분기점)
├── step_setup_step5.html          ← 도장 설정: 직원 등록
├── step_setup_step6.html          ← 도장 설정: 용품 관리
├── step_setup_step7.html          ← 도장 설정: 재고 관리
├── step_setup_step8.html          ← 도장 설정: 행사 일정
├── step_setup_step9.html          ← 도장 설정: 완료 (검은띠 달성)
│
└── step_main_v4.html              ← 메인 라이브 도장 현황판
```

---

## 🚀 빠른 시작

### 온라인 (배포된 데모)
**[step-demo.vercel.app](https://step-demo.vercel.app)** 접속 → "Start with Pro" 클릭

### 로컬 실행
```bash
git clone https://github.com/YOUR_USERNAME/step-demo.git
cd step-demo

# 브라우저에서 index.html 열기
open index.html       # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

### 검토 동선
- **풀 흐름 체험**: `index.html` → "Start with Pro" → 모든 단계 거쳐 메인까지
- **개별 페이지 검토**: `step_index.html` (사이트맵) → 카드별 직접 진입
- **모든 페이지 좌측 하단**: "← 인덱스로" 플로팅 버튼으로 사이트맵 점프 가능

---

## 🎨 디자인 시스템

| 요소 | 값 |
|---|---|
| 폰트 (한글) | Pretendard |
| 폰트 (영문) | Inter |
| 폰트 (숫자/코드) | JetBrains Mono |
| 배경 (라이트 모드) | `#F9FAFB` |
| 주 색상 (Primary Blue) | `#2563EB` |
| 성공 (Success Green) | `#10B981` |
| 경고 (Warning Amber) | `#F59E0B` |
| 위험 (Danger Red) | `#EF4444` |
| 보더 반경 | `16px` (rounded-2xl) |
| 통화 단위 | $ (USD) |

---

## 📋 향후 작업 후보

- [ ] **Mark Attendance 화면** (`step_attendance.html`) — 라이브 출석 체크 그리드
- [ ] **Briefing Details 화면** (`step_briefing.html`) — AI 브리핑 상세
- [ ] **Pricing 프로그램 관리 페이지** — 도장의 수강료 플랜 시스템
- [ ] **회원 관리 페이지** (4탭: 수련생/출결/승급/결제)
- [ ] **Tasks (정규업무) 화면** — Pro의 핵심 가치, SOP 자동실행
- [ ] **권한 부여 화면 v2.0** — 6 역할 + 2-Tier 권한 시스템
- [ ] **모바일 반응형 보강**

---

## 🏢 STEP NEXT Inc.

**STEP Manager**는 STEP NEXT Inc.가 제작하는 SaaS 제품의 일부입니다.

### STEP 생태계
- **STEP Manager** — 도장 운영 OS (이 데모)
- **Play STEP** — B2C 학생 앱 (벨트 기반 캐릭터 성장)
- **Event STEP** — 태권도 대회/이벤트 플랫폼
- **Plus STEP** — 태권도 용품/커머스
- **STEP Partner** — 글로벌 도장 관장 네트워크
- **World Taekwondo Lab** — 글로벌 도장 커뮤니티

---

## 📝 라이선스

이 저장소는 STEP NEXT Inc.의 데모 목적으로 공개되며, 코드는 비상업적 검토용으로 제공됩니다.

© 2026 STEP NEXT Inc. All rights reserved.

## ?? GitHub �ڵ� ���� ���� �Ϸ� (2026-04-26)
