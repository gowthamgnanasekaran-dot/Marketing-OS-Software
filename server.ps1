$port = 8080
$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
} catch {
    Write-Host "Error starting listener. Port might be in use."
    exit
}

Write-Host "Serving $root at http://localhost:$port/"
Write-Host "Press Ctrl+C to stop."

$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".json" = "application/json"
    ".woff" = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Clean up path
        $urlPath = $request.Url.LocalPath.Replace('/', '\').TrimStart('\')
        if ($urlPath -eq "") { $urlPath = "index.html" }
        
        $filepath = Join-Path $root $urlPath
        
        # Simple security check to prevent traversing up
        if (-not $filepath.StartsWith($root)) {
            $response.StatusCode = 403
            $response.Close()
            continue
        }

        if (Test-Path $filepath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filepath).ToLower()
            $contentType = $mimeTypes[$extension]
            if (-not $contentType) { $contentType = "application/octet-stream" }
            
            $response.ContentType = $contentType
            $response.AddHeader("Cache-Control", "no-cache")
            
            try {
                $buffer = [System.IO.File]::ReadAllBytes($filepath)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                $response.StatusCode = 200
            } catch {
                $response.StatusCode = 500
            }
        } else {
            $response.StatusCode = 404
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
}
