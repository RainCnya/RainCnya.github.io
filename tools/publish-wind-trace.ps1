param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$Manuscript
)

$ErrorActionPreference = "Stop"

$HexoRoot = (
    Resolve-Path (
        Join-Path $PSScriptRoot ".."
    )
).Path

$TemplatePath = Join-Path `
    $PSScriptRoot `
    "wind-trace-template.html"

$CssSourcePath = Join-Path `
    $PSScriptRoot `
    "wind-trace.css"

$OutputDirectory = Join-Path `
    $HexoRoot `
    "source\works\wind-trace"

$OutputHtmlPath = Join-Path `
    $OutputDirectory `
    "index.html"

$OutputCssPath = Join-Path `
    $OutputDirectory `
    "wind-trace.css"

$CacheDirectory = Join-Path `
    $HexoRoot `
    ".cache\wind-trace"

$TempMarkdownPath = Join-Path `
    $CacheDirectory `
    "manuscript.md"

$TempHtmlPath = Join-Path `
    $CacheDirectory `
    "body.html"

if (-not (Test-Path -LiteralPath $Manuscript -PathType Leaf)) {
    throw "Manuscript not found: $Manuscript"
}

if (-not (Test-Path -LiteralPath $TemplatePath -PathType Leaf)) {
    throw "Template not found: $TemplatePath"
}

if (-not (Test-Path -LiteralPath $CssSourcePath -PathType Leaf)) {
    throw "CSS file not found: $CssSourcePath"
}

New-Item `
    -ItemType Directory `
    -Force `
    -Path $OutputDirectory |
    Out-Null

New-Item `
    -ItemType Directory `
    -Force `
    -Path $CacheDirectory |
    Out-Null

$ResolvedManuscript = (
    Resolve-Path -LiteralPath $Manuscript
).Path

$Utf8NoBom = New-Object `
    System.Text.UTF8Encoding($false)

$Markdown = [System.IO.File]::ReadAllText(
    $ResolvedManuscript,
    [System.Text.Encoding]::UTF8
)

$Markdown = $Markdown.TrimStart(
    [char]0xFEFF
)

# Remove the first-level Chinese title "Wind Trace" if present.
# \u98ce\u8ff9 is the Unicode escape form of the Chinese title.
$Markdown = [regex]::Replace(
    $Markdown,
    '^\s*#\s+\u98ce\u8ff9\s*(\r?\n)+',
    ''
)

[System.IO.File]::WriteAllText(
    $TempMarkdownPath,
    $Markdown,
    $Utf8NoBom
)

Remove-Item `
    -LiteralPath $TempHtmlPath `
    -Force `
    -ErrorAction SilentlyContinue

Push-Location $HexoRoot

try {
    & npx.cmd hexo render `
        $TempMarkdownPath `
        --output $TempHtmlPath

    if ($LASTEXITCODE -ne 0) {
        throw "Hexo render failed with exit code $LASTEXITCODE."
    }
}
finally {
    Pop-Location
}

if (-not (Test-Path -LiteralPath $TempHtmlPath -PathType Leaf)) {
    throw "Hexo did not create the rendered HTML: $TempHtmlPath"
}

$BodyHtml = [System.IO.File]::ReadAllText(
    $TempHtmlPath,
    [System.Text.Encoding]::UTF8
)

$TemplateHtml = [System.IO.File]::ReadAllText(
    $TemplatePath,
    [System.Text.Encoding]::UTF8
)

$Placeholder = "<!-- WIND_TRACE_CONTENT -->"

if (-not $TemplateHtml.Contains($Placeholder)) {
    throw "Template placeholder not found: $Placeholder"
}

$FinalHtml = $TemplateHtml.Replace(
    $Placeholder,
    $BodyHtml
)

[System.IO.File]::WriteAllText(
    $OutputHtmlPath,
    $FinalHtml,
    $Utf8NoBom
)

Copy-Item `
    -LiteralPath $CssSourcePath `
    -Destination $OutputCssPath `
    -Force

Write-Host ""
Write-Host "Wind Trace page generated successfully." `
    -ForegroundColor Green

Write-Host ""
Write-Host "HTML: $OutputHtmlPath"
Write-Host "CSS : $OutputCssPath"
Write-Host ""
Write-Host "Next commands:"
Write-Host "npx.cmd hexo clean"
Write-Host "npx.cmd hexo generate"
Write-Host "npx.cmd hexo server"