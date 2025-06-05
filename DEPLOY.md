# TBlog 部署指南

## 部署方式选择

本项目支持两种部署方式：

### 方式一：本地构建 + Docker Hub（推荐）
适用于内存较小的服务器（如1G内存），在本地构建镜像后推送到Docker Hub。

### 方式二：服务器直接构建
适用于内存较大的服务器（建议4G+内存），直接在服务器上构建。

---

## 方式一：本地构建 + Docker Hub

### 本地准备工作

1. 确保本地已安装：
   - Docker Desktop
   - Git

2. 注册 Docker Hub 账号：
   - 访问 https://hub.docker.com
   - 注册账号并创建仓库

### 本地构建步骤

1. 克隆项目：
```bash
git clone <your-repository-url>
cd tblog
```

2. 修改构建脚本中的镜像名称：
   - 编辑 `scripts/build-and-push.sh` (Linux/Mac)
   - 编辑 `scripts/build-and-push.bat` (Windows)
   - 将 `your-dockerhub-username` 替换为你的Docker Hub用户名

3. 登录Docker Hub：
```bash
docker login
```

4. 构建并推送镜像：

**Linux/Mac:**
```bash
chmod +x scripts/build-and-push.sh
./scripts/build-and-push.sh v1.0.0
```

**Windows:**
```bash
scripts/build-and-push.bat v1.0.0
```

### 服务器部署步骤

1. 确保服务器已安装：
   - Docker (20.10.0+)
   - Docker Compose (2.0.0+)
   - Git

2. 克隆项目到服务器：
```bash
git clone <your-repository-url>
cd tblog
```

3. 修改生产配置：
   - 编辑 `docker-compose.prod.yml`
   - 将 `your-dockerhub-username` 替换为你的Docker Hub用户名
   - 修改环境变量（JWT_SECRET、数据库密码等）

4. 设置服务器IP：
```bash
echo "SERVER_IP=your-server-ip" > .env
echo "IMAGE_TAG=v1.0.0" >> .env
```

5. 启动服务：
```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 方式二：服务器直接构建

### 准备工作

1. 确保服务器已安装以下软件：
   - Docker (20.10.0+)
   - Docker Compose (2.0.0+)
   - Git
   - 建议4G+内存

2. 克隆项目到服务器：
```bash
git clone <your-repository-url>
cd tblog
```

### 配置说明

1. 设置服务器IP：
   在服务器上创建 `.env` 文件并添加以下内容：
   ```
   SERVER_IP=your-server-ip
   ```
   将 `your-server-ip` 替换为你的服务器实际IP地址

2. 环境变量配置：
   - 编辑 `docker-compose.yml` 文件
   - 修改以下环境变量：
     - `JWT_SECRET`: 更改为一个安全的随机字符串
     - `POSTGRES_PASSWORD`: 更改数据库密码

### 部署步骤

1. 启动服务：
```bash
docker-compose up -d
```

2. 检查服务状态：
```bash
docker-compose ps
```

---

## 数据库迁移

1. 首次部署时：
   数据库迁移会自动执行，无需额外操作。

2. 更新项目时：
   如果更新包含数据库变更，请按以下步骤操作：

   a. 首先备份数据库：
   ```bash
   docker exec tblog-postgres pg_dump -U user tblog > backup_$(date +%Y%m%d).sql
   ```

   b. 更新镜像（如使用预构建镜像）：
   ```bash
   # 本地构建新版本并推送
   ./scripts/build-and-push.sh v1.0.1
   
   # 服务器更新
   echo "IMAGE_TAG=v1.0.1" > .env
   docker-compose -f docker-compose.prod.yml pull
   docker-compose -f docker-compose.prod.yml up -d
   ```

   或者拉取最新代码重新构建（如直接构建）：
   ```bash
   git pull
   docker-compose down
   docker-compose up -d --build
   ```

   c. 检查迁移日志：
   ```bash
   docker-compose logs migration
   ```

## 访问说明

1. 直接通过服务器IP访问：
   - 打开浏览器
   - 访问 `http://your-server-ip`
   - 默认管理员账号：
     - 邮箱：admin@tblog.com
     - 密码：123456

2. 注意事项：
   - 首次登录后请立即修改管理员密码
   - 建议尽快配置域名和SSL证书以提高安全性

## 维护说明

1. 查看日志：
```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs app
docker-compose logs nginx
docker-compose logs postgres
docker-compose logs migration
```

2. 更新应用（预构建镜像方式）：
```bash
# 本地构建新镜像
./scripts/build-and-push.sh v1.0.1

# 服务器更新
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

3. 更新应用（直接构建方式）：
```bash
# 备份数据库
docker exec tblog-postgres pg_dump -U user tblog > backup_$(date +%Y%m%d).sql

# 拉取最新代码
git pull

# 重新构建并启动服务
docker-compose up -d --build
```

## 故障排除

1. 如果网站无法访问：
   - 检查服务器防火墙是否开放 80 端口
   - 检查服务状态：`docker-compose ps`
   - 检查容器日志：`docker-compose logs`

2. 如果镜像拉取失败：
   - 检查网络连接
   - 确认镜像名称和标签是否正确
   - 检查Docker Hub仓库是否公开

3. 如果数据库连接失败：
   - 检查数据库服务是否正常运行
   - 检查数据库连接字符串是否正确
   - 检查数据库日志：`docker-compose logs postgres`

## 安全建议

1. 定期更新系统和 Docker 镜像
2. 使用强密码和安全的 JWT 密钥
3. 定期备份数据库（建议每日备份）
4. 监控服务器资源使用情况
5. 配置防火墙只开放必要端口
6. 建议尽快配置域名和SSL证书 