param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

if ($Args.Count -gt 0 -and $Args[0] -ieq 'sync') {
  Write-Error 'bd sync is disabled in this repo. Use bd for task updates only.'
  exit 1
}

& bd @Args
