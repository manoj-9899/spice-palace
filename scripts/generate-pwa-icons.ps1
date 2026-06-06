$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

function New-RestaurantIcon {
  param([int]$Size, [string]$OutPath)

  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $bg = [System.Drawing.ColorTranslator]::FromHtml("#2D4A3E")
  $fg = [System.Drawing.Color]::White
  $g.Clear($bg)
  $fontSize = [int]($Size * 0.52)
  $font = New-Object System.Drawing.Font("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rect = New-Object System.Drawing.RectangleF 0, 0, $Size, $Size
  $brush = New-Object System.Drawing.SolidBrush $fg
  $g.DrawString("S", $font, $brush, $rect, $format)
  $brush.Dispose()
  $font.Dispose()
  $g.Dispose()

  $dir = Split-Path $OutPath -Parent
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

$root = Split-Path $PSScriptRoot -Parent
New-RestaurantIcon -Size 192 -OutPath (Join-Path $root "public\icons\icon-192.png")
New-RestaurantIcon -Size 512 -OutPath (Join-Path $root "public\icons\icon-512.png")
Write-Output "Icons created"
