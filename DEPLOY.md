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

## 部署步骤

1. 启动服务：
```bash
docker-compose up -d
```

2. 检查服务状态：
```bash
docker-compose ps
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

## 故障排除

1. 如果网站无法访问：
   - 检查服务器防火墙是否开放 80 端口
   - 检查服务状态：`docker-compose ps`
   - 检查容器日志：`docker-compose logs`

2. 如果数据库连接失败：
   - 检查数据库服务是否正常运行
   - 检查数据库连接字符串是否正确
   - 检查数据库日志：`docker-compose logs postgres`

## 安全建议

1. 定期更新系统和 Docker 镜像
2. 使用强密码和安全的 JWT 密钥
3. 定期备份数据库
4. 监控服务器资源使用情况
5. 配置防火墙只开放必要端口
6. 建议尽快配置域名和SSL证书 