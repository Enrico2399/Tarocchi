# Script per creare upload keystore (eseguire una volta, locale, non committare)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$keystore = Join-Path $root "android\upload-keystore.jks"
$props = Join-Path $root "android\keystore.properties"

if (Test-Path $keystore) {
  Write-Host "Keystore gia presente: $keystore"
  exit 0
}

$keytool = Get-Command keytool -ErrorAction SilentlyContinue
if (-not $keytool) {
  Write-Error "keytool non trovato. Usa JDK 17+ o Android Studio embedded JDK."
}

$storePass = Read-Host "Password keystore (min 6 char)" -AsSecureString
$storePassPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
  [Runtime.InteropServices.Marshal]::SecureStringToBSTR($storePass)
)

& keytool -genkey -v `
  -keystore $keystore `
  -keyalg RSA -keysize 2048 -validity 10000 `
  -alias upload `
  -storepass $storePassPlain -keypass $storePassPlain `
  -dname "CN=Tarocchi, OU=Mobile, O=Enrico2399, L=Italy, ST=Italy, C=IT"

@"
storeFile=../upload-keystore.jks
storePassword=$storePassPlain
keyAlias=upload
keyPassword=$storePassPlain
"@ | Set-Content -Path $props -Encoding UTF8

Write-Host "Creato: $keystore"
Write-Host "Creato: $props (gitignored)"
Write-Host "Esegui: npm run android:bundle"
