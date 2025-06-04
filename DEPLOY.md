# TBlog 部署指南

## 准备工作

1. 确保服务器已安装以下软件：
   - Docker (20.10.0+)
   - Docker Compose (2.0.0+)
   - Git

2. 克隆项目到服务器：
```bash
git clone <your-repository-url>
cd tblog
```

## 配置说明

1. 修改域名配置：
   - 编辑 `docker/nginx.conf` 文件
   - 将所有的 `localhost` 替换为你的实际域名

2. 环境变量配置：
   - 编辑 `docker-compose.yml` 文件
   - 修改以下环境变量：
     - `JWT_SECRET`: 更改为一个安全的随机字符串
     - `NEXT_PUBLIC_APP_URL`: 更改为你的实际域名
     - `POSTGRES_PASSWORD`: 更改数据库密码

## 部署步骤

1. 创建必要的目录：
```bash
mkdir -p docker/certbot/conf docker/certbot/www
```

2. 启动服务：
```bash
docker-compose up -d
```

3. 配置 SSL 证书：
```bash
docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot \
  --email your-email@example.com -d your-domain.com --agree-tos --no-eff-email
```

4. 重启 Nginx 服务：
```bash
docker-compose restart nginx
```

## 维护说明

1. 查看日志：
```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs app
docker-compose logs nginx
docker-compose logs postgres
```

2. 更新应用：
```bash
# 拉取最新代码
git pull

# 重新构建并启动服务
docker-compose up -d --build
```

3. 备份数据库：
```bash
docker exec tblog-postgres pg_dump -U user tblog > backup.sql
```

4. 证书续期：
```bash
docker-compose run --rm certbot renew
```

## 故障排除

1. 如果网站无法访问：
   - 检查域名 DNS 是否正确配置
   - 检查服务器防火墙是否开放 80 和 443 端口
   - 检查服务状态：`docker-compose ps`

2. 如果数据库连接失败：
   - 检查数据库服务是否正常运行
   - 检查数据库连接字符串是否正确
   - 检查数据库日志：`docker-compose logs postgres`

3. 如果 SSL 证书问题：
   - 检查证书是否正确生成
   - 检查证书路径是否正确
   - 检查证书权限

## 安全建议

1. 定期更新系统和 Docker 镜像
2. 使用强密码和安全的 JWT 密钥
3. 定期备份数据库
4. 监控服务器资源使用情况
5. 配置防火墙只开放必要端口
6. 使用 HTTPS 并启用 HSTS 