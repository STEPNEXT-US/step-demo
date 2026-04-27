# STEP Manager — Demo Mock-ups

> 태권도 도장 운영 SaaS의 풀 사이클 디자인 목업.<br>
> **가격 페이지 → AI 온보딩 (Plan 선택 + 결제) → 도장 설정 → 메인 운영**까지 끊김 없이 클릭 가능한 시연 환경입니다.

🌐 **Live Demo**: https://step-demo-tau.vercel.app<br>
📦 **GitHub**: https://github.com/STEPNEXT-US/step-demo<br>
🗓️ **버전**: v6.2 (2026.04)

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

### v6.2 (이번 세션)
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

### 온보딩 단계 점프
각 온보딩 페이지 상단의 sticky NAV에서 어떤 단계든 클릭 가능:
- 완료 단계: 짙은 색 (검은) — 클릭 시 그 단계 페이지로 이동
- 현재 단계: 파란 강조
- 미진행: 회색 — 클릭 시 그 단계로 점프 가능

### URL 파라미터
- `?state=empty` — 메인을 설정 미완 상태로 진입
- `?mode=csv` — 회원 관리 등록 시 CSV 임포트 모드
- `?mode=sample` — 회원 관리 등록 시 샘플 데이터 모드

---

## 🚢 폴더 정리 + 배포

### Step 1 — 새 파일 받기 (v6.2)

이 README와 함께 받은 파일들을 `C:\Users\xinapse\Desktop\step-demo\`에 덮어쓰기. 새 파일은 다음과 같습니다:

**🆕 신규 파일 (v6.2)**
- `step_onboarding_step1.html` ~ `step_onboarding_step8.html` (8개)
- `step_onboarding_v1.html` (자동 리다이렉트 stub, 옛 URL 호환성)
- `_archive/README.md`, `_archive/step_onboarding_v1.html`
- `cleanup.ps1` (정리 자동화 스크립트, 선택)

**🔧 덮어쓰기**
- `index.html` (Vercel root, v6.2 pricing 사본)
- `step_pricing_page_v2.html` (STEP 컬러 통일 + 5개 nav)
- `step_setup_step9.html` ("검은띠" → "기본 설정 완료")
- `step_main_v6.html` ("이어하기" → setup_required 경유)
- `step_setup_required.html` (메인 복귀 링크 추가)
- `step_attendance.html` (v5 → v6 링크 정리)
- `step_index.html` (attendance + setup_required 카드 추가, 19개)
- `README.md` (이 파일)

### Step 2 — 폴더 정리 (구버전 파일 제거)

**📌 정리 전 안전 체크 (중요)**

```powershell
cd C:\Users\xinapse\Desktop\step-demo

# 1. 현재 git 상태 확인 — 미커밋 변경사항 있으면 먼저 처리
git status

# 2. 정리 대상 파일이 정말 있는지 미리 확인
Get-ChildItem step_main_v4*.html, step_main_v5.html, step_index_backup.html, step_pricing_page_v1.html -ErrorAction SilentlyContinue
Get-ChildItem *.zip, *.alz, *.7z -ErrorAction SilentlyContinue
```

git에 모두 커밋된 상태라면 어떤 파일도 안전하게 복구 가능합니다.

---

**🧹 정리 명령 (한 번에 실행)**

PowerShell에서 다음 블록을 한 줄씩 또는 한 번에 복사 실행하세요:

```powershell
cd C:\Users\xinapse\Desktop\step-demo

# ─────────────────────────────────────────────
# 1. 구버전 메인 화면 삭제 (v4, v5)
# ─────────────────────────────────────────────
Remove-Item step_main_v4.html, step_main_v4_backup.html, step_main_v4_empty_widgets.html, step_main_v5.html -ErrorAction SilentlyContinue
Write-Host "✓ 구버전 메인 (v4, v5) 삭제 완료" -ForegroundColor Green

# ─────────────────────────────────────────────
# 2. 백업 파일 삭제
# ─────────────────────────────────────────────
Remove-Item step_index_backup.html -ErrorAction SilentlyContinue
Write-Host "✓ index 백업 삭제 완료" -ForegroundColor Green

# ─────────────────────────────────────────────
# 3. ZIP 압축 백업 삭제 (작업 중 만든 ZIP)
# ─────────────────────────────────────────────
Remove-Item *.zip, *.alz, *.7z, *.rar -ErrorAction SilentlyContinue
Write-Host "✓ 압축 백업 파일 삭제 완료" -ForegroundColor Green

# ─────────────────────────────────────────────
# 4. 구 pricing v1을 _archive/로 이동 (보존)
# ─────────────────────────────────────────────
if (Test-Path step_pricing_page_v1.html) {
    if (-not (Test-Path _archive)) { New-Item -ItemType Directory _archive | Out-Null }
    Move-Item step_pricing_page_v1.html _archive\step_pricing_page_v1.html -Force
    Write-Host "✓ step_pricing_page_v1.html → _archive/" -ForegroundColor Green
}

# ─────────────────────────────────────────────
# 5. mnt/ 이상 폴더 삭제 (Linux 경로 잔재)
# ─────────────────────────────────────────────
if (Test-Path mnt) {
    Write-Host "  mnt/ 폴더 내용 미리보기:" -ForegroundColor Yellow
    Get-ChildItem mnt -Recurse | Select-Object -First 10 | ForEach-Object { Write-Host "    • $($_.FullName)" }
    Write-Host ""
    $confirm = Read-Host "  정말 삭제하시겠습니까? (y/N)"
    if ($confirm -eq 'y') {
        Remove-Item mnt -Recurse -Force
        Write-Host "✓ mnt/ 삭제 완료" -ForegroundColor Green
    } else {
        Write-Host "- mnt/ 삭제 건너뜀" -ForegroundColor DarkGray
    }
}

# ─────────────────────────────────────────────
# 정리 결과 확인
# ─────────────────────────────────────────────
Write-Host "`n=== 현재 활성 HTML 파일 ===" -ForegroundColor Cyan
Get-ChildItem *.html | Sort-Object Name | ForEach-Object { 
    Write-Host "  $($_.Name) ($('{0:N1}' -f ($_.Length / 1KB)) KB)" 
}
```

이 블록 한 번 실행하면 정리 끝.

---

**💡 자동화 옵션 (추가 제공)**

`cleanup.ps1` 스크립트도 함께 제공됩니다. 위와 동일한 작업을 단계별 확인 + DryRun 옵션으로 더 안전하게 실행:

```powershell
.\cleanup.ps1 -DryRun     # 미리보기 (변경 없음)
.\cleanup.ps1             # 단계별 y/n 확인
.\cleanup.ps1 -Force      # 모든 확인 건너뛰기
```

위 수동 명령과 동일한 로직이므로 어느 방식으로 해도 결과 동일합니다.

### Step 3 — Git 커밋 + 푸시

```powershell
# 변경사항 확인
git status

# 모든 변경 추가
git add .

# 정리와 v6.2 변경을 한 번에 커밋
git commit -m "v6.2: onboarding 8 steps split, Plan selection, STEP color unification, cleanup obsolete files"

# 푸시
git push

# 1~2분 후 Vercel 자동 배포
# https://step-demo-tau.vercel.app
```

### Step 4 — 배포 검증 체크리스트

배포 1~2분 후 다음 URL이 모두 작동하는지 확인:

```
🌐 진입점
✅ https://step-demo-tau.vercel.app/                              ← Vercel root (pricing)
✅ https://step-demo-tau.vercel.app/step_index                    ← 시연 인덱스

📄 가격 + 온보딩
✅ https://step-demo-tau.vercel.app/step_pricing_page_v2
✅ https://step-demo-tau.vercel.app/step_onboarding_step1         ← 환영
✅ https://step-demo-tau.vercel.app/step_onboarding_step6         ← Plan 선택 ⭐
✅ https://step-demo-tau.vercel.app/step_onboarding_v1            ← 옛 URL → 자동 리다이렉트

🥋 도장 설정
✅ https://step-demo-tau.vercel.app/step_setup_step0
✅ https://step-demo-tau.vercel.app/step_setup_step9              ← 기본 설정 완료
✅ https://step-demo-tau.vercel.app/step_setup_required           ← 설정 미완 안내

🏢 운영 OS
✅ https://step-demo-tau.vercel.app/step_main_v6                  ← 메인 (state=empty 토글)
✅ https://step-demo-tau.vercel.app/step_members
✅ https://step-demo-tau.vercel.app/step_attendance               ← 출석 마킹
```

### Step 5 — 시연 흐름 빠른 점검

배포 후 step_index에서 시작해 끝까지 클릭해보기:

```
1. step_index → Journey 1 "지금 바로 시작하기"
2. step_pricing_page_v2 → "Start with Pro"
3. step_onboarding_step1 ~ step5 (자연스럽게 진행)
4. step_onboarding_step6 (Plan 선택, Pro 기본 체크)
5. step_onboarding_step7 (결제) → step8 (완료)
6. step_setup_step0 ~ step9 (도장 설정, "기본 설정 완료")
7. step_main_v6 (메인 진입, 코치마크 자동 발동)
8. 라이브 도장 → "Mark Attendance" → step_attendance
9. DEMO 토글 "설정 미완" → "이어하기" → step_setup_required
10. 미완 단계 클릭 → step_setup_step3
```

어디서 깨지면 즉시 피드백 주세요.

---

## 👤 메인 컨택트

**Steve** · IT 전문가, 기업가<br>
📍 South Korea, Gumi<br>
🎯 STEP 생태계 — Play STEP / Event STEP / Plus STEP / STEP Partner / World Taekwondo Lab

---

*"Manage → Execute → Auto Growth"*<br>
**STEP Manager** — 미국 도장 운영의 OS
