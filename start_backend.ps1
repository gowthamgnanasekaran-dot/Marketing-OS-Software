$env:Path += ";C:\Program Files\nodejs"
Write-Host "Starting MarketingOS Backend..."
cd backend
if (!(Test-Path ".env")) {
    Write-Host "Creating default .env file..."
    Copy-Item ".env.example" ".env"
}
node server.js
