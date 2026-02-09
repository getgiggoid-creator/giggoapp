@echo off
rem Repo npm wrapper — prefer local node_modules/npm to avoid PowerShell npm.ps1 issues
setlocal
set ROOT=%~dp0

if exist "%ROOT%node_modules\npm\bin\npm-cli.js" (
  node "%ROOT%node_modules\npm\bin\npm-cli.js" %*
) else (
  rem Fallback to system npm (works in cmd.exe)
  npm %*
)

endlocal
