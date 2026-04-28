# STEP Multi-Studio Track

> 다지점 운영 Owner를 위한 HQ 통합 뷰 + 지점별 운영 화면
> v6.6 단일 도장 트랙과 **완전 격리된** 고도화 트랙입니다.

🌐 **시연 진입**: `/multi/multi_index.html` (URL 직접 입력)

---

## 🔒 절대 원칙

1. **v6.6 파일은 단 한 줄도 수정하지 않습니다** (`step_index.html` 포함)
2. 모든 작업은 `/multi/` 폴더 내에서만
3. v6.6 트랙과 멀티 트랙은 완전 격리 — 서로 영향 없음
4. 시연 진입은 `/multi/multi_index.html` URL 직접 입력 (시연 시 안내 필요)

---

## 📁 파일 구조

```
multi/
├── README.md                     ← 이 파일
├── multi_index.html              ← 멀티 시연 진입점 ⭐
│
├── hq_main.html                  ← HQ 메인 (Phase 1A 핵심) ⭐
├── hq_studios.html               ← 지점 관리 / 권한 배정
├── hq_studio_add.html            ← 지점 추가 플로우
│
├── studio_main.html              ← 단일 지점 메인 (?studio=la|nyc|dallas)
├── studio_kpi_detail.html        ← 단일 지점 KPI (?studio=la&tab=...)
│
└── shared/
    ├── studio_switcher.js        ← 헤더 드롭다운 컴포넌트
    ├── multi_data.js             ← 3지점 mock + 유틸 함수
    └── multi_styles.css          ← 멀티 트랙 공용 스타일
```

---

## 🎬 시연 시나리오

```
multi_index.html
   │
   ├─[A] HQ Owner 아침 시작 (추천)
   │   ▼
   │   hq_main.html
   │   ├ Xiro HQ Briefing: "NYC 주의 필요"
   │   ├ Network KPI Strip
   │   ├ Studio Comparison Board (LA / NYC / Dallas)
   │   │     │
   │   │     └─ NYC 카드 클릭 → studio_main.html?studio=nyc
   │   │           └ Studio Switcher로 HQ 복귀 가능
   │   │
   │   └ HQ Quick Actions: [+ 지점 추가] → hq_studio_add.html
   │
   ├─[B] 단일 지점 진입 (LA)
   │   ▼ studio_main.html?studio=la
   │
   └─[C] 신규 지점 추가
       ▼ hq_studio_add.html
```

---

## 📊 Mock 데이터 — 3지점 시나리오

| 지점 | 상태 | 핵심 수치 | 시연 역할 |
|---|---|---|---|
| **LA Branch** (Koreatown) | 🟢 healthy | 학생 168 / 출석 87% / 매출 $32,400 | 모범 지점 |
| **NYC Branch** (Flushing) | 🔴 at_risk | 학생 142 / 출석 79% (-8%) / 결제실패 1건 | **시연 스토리 주인공** |
| **Dallas Branch** (Plano) | 🟡 normal | 학생 96 / 출석 83% / 매출 $18,200 | 대조군 |

**시연 스토리 (30초):**
Owner 아침 9시 → HQ 진입 → Xiro가 NYC 알림 → NYC 카드 클릭 → 결제 실패 발견 → 처리 후 HQ 복귀.

---

## ✅ 진행 상태

- [x] **Step 1** — 골격 셋업 (`shared/` + `multi_index.html`)
- [x] **Step 2** — HQ 메인 마크업
- [x] **Step 3** — HQ 메인 풀 디자인
- [x] **Step 3.5** — v6.6 셸 통합 (사이드바/헤더/Ask Xiro FAB)
- [x] **Step 4** — JS 정식 분리 + Quick Peek 모달 + 키보드 단축키
- [x] **Step 5** — Studio 컨텍스트 페이지 + v6.6 진입 경로
- [x] **🎉 Phase 1A MVP 완료**

---

## 🎬 시연 시나리오 4️⃣ — 30초 풀 사이클

```
[1] /multi/multi_index.html
       ↓ "HQ Owner — 아침 시작" 카드
[2] /multi/hq_main.html
       │ Xiro Briefing이 NYC를 자동 위기 감지
       │ Studio Comparison Board에 NYC 첫 자리
       ↓ NYC 카드 "빠른 보기" 클릭
[3] Quick Peek 모달
       │ KPI 추세 (-8.0%) + 긴급 항목 2건 + Xiro 인사이트
       ↓ "지점 진입" CTA
[4] /multi/studio_main.html?studio=nyc
       │ 빨간 보더 + 빨간 CTA로 시급성 시각화
       │ Studio Switcher로 HQ 복귀 / 다른 지점 전환 가능
       ↓ "운영 화면 진입" CTA
[5] /step_main_v6.html  (v6.6 풀 운영 화면)
       │ 일상 운영 (출석, 회원, Ops Center)
```

---

## 🎨 디자인 시스템

v6.6 표준 100% 일관성 유지:

- **폰트**: Pretendard (한글) + JetBrains Mono (숫자) + Inter (영문)
- **컬러**: `#F9FAFB` 베이스, `#2563EB` Primary
- **모서리**: rounded-2xl (18px)
- **톤**: Toss 스타일 (직관적, 따뜻함, 친근함)

**HQ 모드 차별화:**
- 헤더 배경 `#F8FAFC` (약간 회색)
- Studio Switcher 좌측에 지점 색상 점 (LA=파랑 / NYC=초록 / Dallas=주황)

---

## 🤖 Xiro — 1명 + 컨텍스트 모자

- **HQ 컨텍스트**: "Xiro · HQ Briefing" (분석가 톤)
- **Studio 컨텍스트**: "Xiro · LA Branch" (일상 도우미 톤)
- 원칙: "AI는 준비, 결정은 관장" (v6.6 일관 적용)
