@echo off
setlocal enabledelayedexpansion

REM ===========================================
REM React Docker Container Manager
REM ===========================================

echo ========================================
echo  React Application Container Manager
echo ========================================
echo.

REM Configuration variables
set IMAGE_NAME=react-app
set CONTAINER_NAME=react-container
set HOST_PORT=3000
set CONTAINER_PORT=3000
set NETWORK_NAME=app-network
set API_URL=http://localhost:8888/api

REM Check if Docker is running
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running or not installed!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo Docker is running. Proceeding with container operations...
echo.

REM Check if nginx.conf exists
if not exist "nginx.conf" (
    echo WARNING: nginx.conf not found. Creating default configuration...
    call :CREATE_NGINX_CONFIG
)

REM Stop and remove existing container if it exists
echo Checking for existing container...
docker ps -a --format "table {{.Names}}" | findstr /i "%CONTAINER_NAME%" >nul 2>&1
if %errorlevel% equ 0 (
    echo Stopping existing container: %CONTAINER_NAME%
    docker stop %CONTAINER_NAME% >nul 2>&1
    echo Removing existing container: %CONTAINER_NAME%
    docker rm %CONTAINER_NAME% >nul 2>&1
)

REM Create network if it doesn't exist
echo Creating Docker network if not exists...
docker network ls | findstr /i "%NETWORK_NAME%" >nul 2>&1
if %errorlevel% neq 0 (
    docker network create %NETWORK_NAME%
    echo Network %NETWORK_NAME% created successfully.
) else (
    echo Network %NETWORK_NAME% already exists.
)

REM Build the Docker image with build arguments
echo.
echo ========================================
echo Building Docker image: %IMAGE_NAME%
echo ========================================
docker build ^
    --build-arg REACT_APP_API_URL=%API_URL% ^
    --build-arg REACT_APP_APP_NAME="Product Management System" ^
    --build-arg REACT_APP_VERSION=1.0.0 ^
    --no-cache ^
    -t %IMAGE_NAME% .

if %errorlevel% neq 0 (
    echo ERROR: Failed to build Docker image!
    echo.
    echo Troubleshooting tips:
    echo 1. Check if all required files exist
    echo 2. Verify Dockerfile syntax
    echo 3. Check Docker Desktop is running
    echo 4. Try running: docker system prune -f
    pause
    exit /b 1
)

echo Docker image built successfully!
echo.

REM Run the container
echo ========================================
echo Running container: %CONTAINER_NAME%
echo ========================================
docker run -d ^
    --name %CONTAINER_NAME% ^
    --network %NETWORK_NAME% ^
    -p %HOST_PORT%:%CONTAINER_PORT% ^
    --add-host=host.docker.internal:host-gateway ^
    --restart unless-stopped ^
    --memory=512m ^
    --cpus=1.0 ^
    %IMAGE_NAME%

if %errorlevel% neq 0 (
    echo ERROR: Failed to start container!
    echo Checking container logs...
    docker logs %CONTAINER_NAME%
    pause
    exit /b 1
)

echo.
echo ========================================
echo React Container started successfully!
echo ========================================
echo Container Name: %CONTAINER_NAME%
echo Application URL: http://localhost:%HOST_PORT%
echo Health Check: http://localhost:%HOST_PORT%/health
echo.

REM Wait for application to start
echo Waiting for application to start...
timeout /t 10 /nobreak >nul

REM Check health
echo Checking application health...
:CHECK_HEALTH
curl -f http://localhost:%HOST_PORT%/health >nul 2>&1
if %errorlevel% neq 0 (
    echo Application still starting... please wait
    timeout /t 3 /nobreak >nul
    goto CHECK_HEALTH
)

echo Application is healthy!
echo.

REM Check container status
echo Checking container status...
docker ps --filter "name=%CONTAINER_NAME%" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo ========================================
echo Useful Commands:
echo ========================================
echo View logs:     docker logs %CONTAINER_NAME%
echo Follow logs:   docker logs -f %CONTAINER_NAME%
echo Stop container: docker stop %CONTAINER_NAME%
echo Remove container: docker rm %CONTAINER_NAME%
echo Access shell:  docker exec -it %CONTAINER_NAME% /bin/sh
echo.

REM Optional: Open browser
set /p OPEN_BROWSER="Do you want to open the application in browser? (y/n): "
if /i "!OPEN_BROWSER!"=="y" (
    start http://localhost:%HOST_PORT%
)

echo.
echo Container is running in the background.
echo Press any key to exit...
pause >nul
goto :EOF

:CREATE_NGINX_CONFIG
echo Creating nginx.conf...
(
echo server {
echo     listen 3000;
echo     server_name localhost;
echo     root /usr/share/nginx/html;
echo     index index.html;
echo.
echo     # Handle React Router
echo     location / {
echo         try_files $uri $uri/ /index.html;
echo     }
echo.
echo     # Health check
echo     location /health {
echo         access_log off;
echo         return 200 "healthy\n";
echo         add_header Content-Type text/plain;
echo     }
echo.
echo     # API proxy
echo     location /api/ {
echo         proxy_pass http://host.docker.internal:8888/api/;
echo         proxy_set_header Host $host;
echo         proxy_set_header X-Real-IP $remote_addr;
echo     }
echo }
) > nginx.conf
echo nginx.conf created successfully!
goto :EOF