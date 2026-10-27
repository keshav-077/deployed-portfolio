param(
  [string]$SLUG = "",
  [switch]$Pilot,
  [int]$Batch = -1,
  [switch]$Audit
)

$Root = $PSScriptRoot
Set-Location $Root

if ($Audit) {
  python scripts/trailer_audit.py
  exit $LASTEXITCODE
}

if ($Pilot) {
  python scripts/trailer_pipeline/run_batch.py --pilot
  exit $LASTEXITCODE
}

if ($Batch -ge 0) {
  python scripts/trailer_pipeline/run_batch.py --batch $Batch
  exit $LASTEXITCODE
}

if ($SLUG -ne "") {
  python scripts/trailer_pipeline/render_slug.py --slug $SLUG
  exit $LASTEXITCODE
}

Write-Host "Usage: .\make.ps1 video SLUG=name | -Pilot | -Batch N | -Audit"
Write-Host "  .\make.ps1 -SLUG ledgeriq"
Write-Host "  .\make.ps1 -Pilot"
Write-Host "  .\make.ps1 -Batch 0"
