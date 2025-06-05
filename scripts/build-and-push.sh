#!/bin/bash

# 设置镜像名称和标签
IMAGE_NAME="your-dockerhub-username/tblog"
TAG=${1:-latest}

echo "构建Docker镜像: $IMAGE_NAME:$TAG"

# 构建镜像
docker build \
  --build-arg DATABASE_URL=postgresql://user:password@postgres:5432/tblog \
  --build-arg NODE_ENV=production \
  --build-arg NEXT_TELEMETRY_DISABLED=1 \
  -t $IMAGE_NAME:$TAG \
  .

if [ $? -eq 0 ]; then
    echo "构建成功！正在推送到Docker Hub..."
    
    # 推送镜像
    docker push $IMAGE_NAME:$TAG
    
    if [ $? -eq 0 ]; then
        echo "镜像推送成功！"
        echo "镜像地址: $IMAGE_NAME:$TAG"
        echo ""
        echo "在服务器上使用以下命令部署："
        echo "IMAGE_TAG=$TAG docker-compose -f docker-compose.prod.yml up -d"
    else
        echo "推送失败！请检查Docker Hub登录状态"
        exit 1
    fi
else
    echo "构建失败！"
    exit 1
fi 