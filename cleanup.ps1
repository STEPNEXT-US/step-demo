# ================================================================
# STEP Manager Demo — 폴더 정리 스크립트 (v6.2 배포 준비)
# ================================================================
# 사용법:
#   1. PowerShell을 step-demo 폴더에서 실행
#   2. .\cleanup.ps1 입력 후 Enter
#   3. 각 단계마다 확인 메시지가 뜨면 y/n 입력
#
# 이 스크립트가 하는 일:
#   • 구버전 파일 삭제 (v4, v5, backup)
#   • step_pricing_page_v1.html을 _archive/로 이동
#   • mnt/ 이상 폴더 처리 (확인 후)
#   • ZIP 백업 파일 삭제
#
# 안전장치:
#   • 모든 작업은 git에서 복구 가능 (이미 commit된 파일들)
#   • -DryRun 플래그로 실행 전 미리보기 가능
# ================================================================

[CmdletBinding()]
param(
    [switch]$DryRun = $false,
    [switch]$Force = $false  # 모든 확인 메시지 건너뛰기
)

$ErrorActionPreference = "Stop"

# 색상 함수
function Write-Step { param([string]$msg) Write-Host "`n▶ $msg" -ForegroundColor Cyan }
function Write-OK { param([string]$msg) Write-Host "  ✓ $msg" -ForegroundColor Green }
function Write-Skip { param([string]$msg) Write-Host "  - $msg" -ForegroundColor DarkGray }
function Write-Warn { param([string]$msg) Write-Host "  ⚠ $msg" -ForegroundColor Yellow }

# 현재 위치 검증
if (-not (Test-Path ".git")) {
    Write-Host "`n❌ 이 폴더가 git repo가 아닙니다. step-demo 폴더에서 실행하세요." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "step_index.html") -and -not (Test-Path "index.html")) {
    Write-Host "`n❌ step-demo 폴더가 아닌 것 같습니다 (step_index.html 또는 index.html 없음)." -ForegroundColor Red
    exit 1
}

Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "  STEP Demo 폴더 정리 — v6.2 배포 준비" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "`n💡 DRY RUN 모드 — 실제 변경 없이 미리보기만`n" -ForegroundColor Yellow
}

# 사용자 확인 함수
function Confirm-Action {
    param([string]$message)
    if ($Force) { return $true }
    $response = Read-Host "$message (y/N)"
    return ($response -eq 'y' -or $response -eq 'Y')
}

# ================================================================
# Step 1: 구버전 파일 삭제 (v4, v5, backup)
# ================================================================
Write-Step "Step 1: 구버전 파일 삭제"

$obsoleteFiles = @(
    "step_main_v4.html",
    "step_main_v4_backup.html",
    "step_main_v4_empty_widgets.html",
    "step_main_v5.html",
    "step_index_backup.html"
)

$found = $obsoleteFiles | Where-Object { Test-Path $_ }

if ($found.Count -eq 0) {
    Write-Skip "삭제할 구버전 파일 없음"
}
else {
    Write-Host "  발견된 구버전 파일:" -ForegroundColor Yellow
    $found | ForEach-Object {
        $size = (Get-Item $_).Length / 1KB
        Write-Host "    • $_  ($('{0:N1}' -f $size) KB)"
    }
    
    if (Confirm-Action "  삭제하시겠습니까?") {
        $found | ForEach-Object {
            if ($DryRun) {
                Write-Skip "[DryRun] 삭제 예정: $_"
            } else {
                Remove-Item $_ -Force
                Write-OK "삭제됨: $_"
            }
        }
    } else {
        Write-Skip "Step 1 건너뜀"
    }
}

# ================================================================
# Step 2: ZIP 백업 파일 삭제
# ================================================================
Write-Step "Step 2: ZIP 백업 파일 삭제"

$zipFiles = Get-ChildItem -File | Where-Object { $_.Extension -in @('.zip', '.7z', '.rar', '.alz') }

if ($zipFiles.Count -eq 0) {
    Write-Skip "삭제할 압축 파일 없음"
}
else {
    Write-Host "  발견된 압축 파일:" -ForegroundColor Yellow
    $zipFiles | ForEach-Object {
        $size = $_.Length / 1KB
        Write-Host "    • $($_.Name)  ($('{0:N1}' -f $size) KB)"
    }
    
    if (Confirm-Action "  삭제하시겠습니까?") {
        $zipFiles | ForEach-Object {
            if ($DryRun) {
                Write-Skip "[DryRun] 삭제 예정: $($_.Name)"
            } else {
                Remove-Item $_.FullName -Force
                Write-OK "삭제됨: $($_.Name)"
            }
        }
    } else {
        Write-Skip "Step 2 건너뜀"
    }
}

# ================================================================
# Step 3: step_pricing_page_v1.html → _archive/
# ================================================================
Write-Step "Step 3: 구 pricing v1 아카이브로 이동"

if (Test-Path "step_pricing_page_v1.html") {
    if (-not (Test-Path "_archive")) {
        if (-not $DryRun) {
            New-Item -ItemType Directory -Path "_archive" | Out-Null
            Write-OK "_archive/ 폴더 생성됨"
        } else {
            Write-Skip "[DryRun] _archive/ 폴더 생성 예정"
        }
    }
    
    if (Confirm-Action "  step_pricing_page_v1.html → _archive/로 이동하시겠습니까?") {
        if ($DryRun) {
            Write-Skip "[DryRun] 이동 예정: step_pricing_page_v1.html → _archive/"
        } else {
            Move-Item "step_pricing_page_v1.html" "_archive/step_pricing_page_v1.html" -Force
            Write-OK "이동됨: step_pricing_page_v1.html → _archive/"
        }
    } else {
        Write-Skip "Step 3 건너뜀"
    }
}
else {
    Write-Skip "step_pricing_page_v1.html 없음"
}

# ================================================================
# Step 4: mnt/ 이상 폴더 처리
# ================================================================
Write-Step "Step 4: mnt/ 이상 폴더 처리"

if (Test-Path "mnt") {
    Write-Warn "mnt/ 폴더 발견됨 (Linux 시스템 경로 — 실수로 생긴 흔적일 가능성)"
    Write-Host "  내용 미리보기:"
    Get-ChildItem "mnt" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 10 | ForEach-Object {
        Write-Host "    • $($_.FullName.Replace((Get-Location).Path, '.'))"
    }
    
    if (Confirm-Action "  삭제하시겠습니까? (안에 중요 파일이 있으면 N)") {
        if ($DryRun) {
            Write-Skip "[DryRun] 삭제 예정: mnt/"
        } else {
            Remove-Item "mnt" -Recurse -Force
            Write-OK "삭제됨: mnt/"
        }
    } else {
        Write-Skip "Step 4 건너뜀 (직접 확인 후 처리하세요)"
    }
}
else {
    Write-Skip "mnt/ 폴더 없음"
}

# ================================================================
# Step 5: 결과 요약
# ================================================================
Write-Step "Step 5: 정리 결과"

if (-not $DryRun) {
    $remaining = Get-ChildItem -File | Where-Object { $_.Extension -eq '.html' -or $_.Extension -eq '.md' }
    Write-Host "  현재 활성 파일 ($($remaining.Count)개):" -ForegroundColor Green
    $remaining | Sort-Object Name | ForEach-Object {
        $size = $_.Length / 1KB
        Write-Host "    • $($_.Name)  ($('{0:N1}' -f $size) KB)"
    }
    
    if (Test-Path "_archive") {
        $archived = Get-ChildItem "_archive" -File
        Write-Host "`n  _archive/ ($($archived.Count)개):" -ForegroundColor DarkGray
        $archived | ForEach-Object {
            Write-Host "    • $($_.Name)"
        }
    }
}

Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "  ✅ 폴더 정리 완료" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "`n💡 실제로 정리하려면: .\cleanup.ps1 (DryRun 없이)" -ForegroundColor Yellow
}
else {
    Write-Host "`n다음 단계:" -ForegroundColor Cyan
    Write-Host "  1. git status   ← 변경사항 확인"
    Write-Host "  2. git add ."
    Write-Host "  3. git commit -m `"v6.2: cleanup obsolete files, archive v1`""
    Write-Host "  4. git push"
    Write-Host ""
}
