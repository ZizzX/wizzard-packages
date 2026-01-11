@echo off
setlocal

if /I "%~1"=="sync" (
  echo bd sync is disabled in this repo. Use bd for task updates only. 1>&2
  exit /b 1
)

bd %*
