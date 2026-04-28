# STEP Multi-Studio Mockup

> 다지점 운영 Owner의 **HQ 통합 본부 뷰** 기획 mockup.
> v6.6 메인을 보존하면서 Multi-Studio IA를 별도로 검증합니다.

---

## 🎯 이 mockup의 위치

이 트랙은 **제품 기획 단계의 중간 산출물**입니다. 시연이 아니라, production을 향한 IA 검증 작업입니다.

### 핵심 컨셉 — 목업과 Production의 분리

| 단계 | 구조 | 의도 |
|---|---|---|
| **현재 (mockup)** | `multi/` 폴더로 v6.6과 격리 | 기획 검증의 편의 — v6.6을 안전하게 보존하면서 새 IA 실험 |
| **Production** | Switcher가 v6.6 사이드바의 1급 컴포넌트로 통합 | 단일/멀티 모드가 같은 화면에서 컨텍스트로 전환되는 단일 시스템 |

**즉, `multi/` 폴더는 임시 작업 공간**이고, 최종 제품에서는 v6.6에 통합되어 사라질 디렉토리입니다.

---

## 🏗️ 구조

```
multi/
├── README.md                     ← 이 문서
├── multi_index.html              ← Mockup 진입점 (개념 안내)
├── hq_main.html                  ← HQ 메인 (v6.6 IA 호환) ⭐
└── shared/
    ├── multi_styles.css          ← 디자인 토큰 (v6.6과 일관)
    ├── app_shell.css             ← 사이드바 + 글로벌 헤더 (v6.6 동일 구조)
    ├── hq_main.css               ← HQ 메인 전용 스타일
    ├── hq_main.js                ← HQ 메인 로직
    ├── multi_data.js             ← Mock 데이터 (3 지점 + Ops + Events)
    └── studio_switcher.js        ← 도장 셀렉터 컴포넌트 (1급 시민)
```

---

## 🎨 HQ 메인 IA — v6.6 어휘 호환

v6.6 메인의 시각 어휘를 그대로 차용하되, HQ 컨텍스트가 요구하는 형태로 재구성:

| v6.6 메인 (단일 도장) | HQ 메인 (다지점 통합) | 변환 원칙 |
|---|---|---|
| Greeting "좋은 아침이에요, Master Kim" | "Good morning, Steve" | ✅ 동일 톤 |
| 일일 브리핑 (그라데이션 카드) | HQ 통합 브리핑 (위험 시 빨간 강조) | ✅ 같은 컴포넌트, HQ 분석가 톤 |
| KPI 3카드 (출석률/승급/매출) | KPI 3카드 (통합 출석률/통합 매출/통합 학생수) | ✅ 같은 구조, 통합 메트릭 |
| Ops Center | HQ Ops Center (지점 라벨 추가) | ✅ 같은 구조, 지점 컨텍스트 |
| 라이브 도장 | **지점 운영 현황 (Live View)** ⭐ | 같은 어휘 (수업 중/휴식/시간), 다지점 단위 |
| Event Hub | HQ Event Hub (통합 승급 심사) | ✅ 같은 구조, 지점 합산 |
| Quick Actions 7개 | Quick Actions 7개 (HQ 컨텍스트) | ✅ 같은 톤 |

**핵심 발상**: "지점 비교"가 아니라 **"각 지점의 살아있는 운영 상태"** 가 메인 콘텐츠.
v6.6 라이브 도장이 단일 지점의 클래스 단위로 살아있듯, HQ에서는 지점 단위로 살아있음.

---

## 🎬 Mock 데이터 — 3개 지점 시나리오

| 지점 | 상태 | 학생 | 출석률 (추세) | 매출 MTD | Live 상태 |
|---|---|---|---|---|---|
| **LA Branch** (Koreatown) | 호조 | 168 | 87% (▲+2%) | $32,400 | 4세반 수업 중 (16/18) |
| **NYC Branch** (Flushing) | ⚠ 위험 | 142 | 79% (▼-8%) | $24,800 | 청소년반 수업 중 (12/15) + 결제 실패 1건 |
| **Dallas Branch** (Plano) | 정상 | 96 | 83% (▲+0.5%) | $18,200 | 휴식 중 (다음: 14:00) |

**의사결정 포인트**: NYC가 자동으로 위험 신호 발생 → 시각적으로 즉시 잡힘 (빨간 보더, 빨간 브리핑, 빨간 위험 라인).

---

## 🔄 진행 상태

- [x] **Phase 1A.1** — 정리 작업 (Quick Peek 모달 제거 / studio_main.html 제거 / multi_index 컨셉화)
- [x] **Phase 1A.2** — HQ 메인 v2 재구축 (v6.6 IA 호환, Live View 중심)
- [ ] **Phase 1B** — Cross-Studio Alerts / Network Trends / 사범 배치 (지점 선택 시 시뮬레이션 포함)
- [ ] **Phase 2 (Production)** — Switcher의 v6.6 정식 통합, 단일 시스템화

---

## 🎮 사용법

### 진입
```
multi/multi_index.html  →  multi/hq_main.html
```

### 키보드 단축키 (HQ 메인)
- `⌘K` (Ctrl+K) — 검색 포커스
- `⌘L` (Ctrl+L) — Studio Switcher 열기

### 컨텍스트 전환
- 사이드바 셀렉터에서 LA/NYC/Dallas 선택 → mockup에서는 v6.6 메인으로 이동
- HQ 복귀 → 셀렉터에서 "HQ · 전체 보기" 선택

---

## 📝 변경 로그

**2026.04.28**
- Phase 1A.1 정리: Quick Peek 모달 + studio_main.html + 시연 카드 제거
- Phase 1A.2: HQ 메인을 v6.6 IA에 호환되도록 재구축
  - Greeting + Briefing card + KPI 3 + Main grid 3 + Quick Actions 7 (v6.6 어휘 그대로)
  - 핵심 컴포넌트: 지점 운영 현황 (Live View) — v6.6 라이브 도장 어휘 차용
  - HQ Ops Center: 지점 라벨 추가, 10개 항목 (긴급 3 / 정규 4 / 제안 3)
  - HQ Event Hub: 통합 승급 심사 원형 차트 + 다가오는 이벤트 3건

**2026.04.27**
- Phase 1A 초기 버전 (시연 임팩트 중심) — 폐기, 위 v2로 대체
