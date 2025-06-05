@echo off

REM 请将下面的 "your-dockerhub-username" 替换为你的实际 Docker Hub 用户名
set IMAGE_NAME=tiansuy/tblog
set TAG=%1
if "%TAG%"=="" set TAG=latest

echo 构建Docker镜像: %IMAGE_NAME%:%TAG%

REM 检查是否已修改用户名
echo %IMAGE_NAME% | findstr "your-dockerhub-username" >nul
if %ERRORLEVEL% EQU 0 (
    echo 错误：请先修改脚本中的 Docker Hub 用户名！
    echo 将 "your-dockerhub-username" 替换为你的实际用户名
    exit /b 1
)

REM 构建镜像
docker build ^
  --build-arg DATABASE_URL=postgresql://user:password@postgres:5432/tblog ^
  --build-arg NODE_ENV=production ^
  --build-arg NEXT_TELEMETRY_DISABLED=1 ^
  -t %IMAGE_NAME%:%TAG% ^
  .

if %ERRORLEVEL% EQU 0 (
    echo 构建成功！正在推送到Docker Hub...
    
    REM 推送镜像
    docker push %IMAGE_NAME%:%TAG%
    
    if %ERRORLEVEL% EQU 0 (
        echo 镜像推送成功！
        echo 镜像地址: %IMAGE_NAME%:%TAG%
        echo.
        echo 在服务器上使用以下命令部署：
        echo IMAGE_TAG=%TAG% docker-compose -f docker-compose.prod.yml up -d
    ) else (
        echo 推送失败！请检查Docker Hub登录状态
        exit /b 1
    )
) else (
    echo 构建失败！
    exit /b 1
) 