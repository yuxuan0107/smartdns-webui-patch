# smartdns-webui-patch

这是一个基于 [smartdns-webui](https://github.com/pymumu/smartdns-webui) 原版之上补全配置 UI 的项目。

## 主要改进

- 完整的配置管理界面（17个子菜单）
- 多值配置支持（如多个 DNS 服务器）
- 保存配置后自动重启服务
- 重启后自动刷新页面
- 中文界面
- 所有配置项分类展示

## 配置菜单结构

### 参数配置

| 菜单项 | 说明 |
|--------|------|
| 基本设置 | server-name, user, resolv-hostname |
| 监听设置 | bind, bind-tcp, bind-tls, bind-https（支持双栈） |
| TLS 证书 | bind-cert-key-file, bind-cert-file, bind-cert-generate |
| 缓存设置 | cache-size, cache-mem-size, cache-persist, prefetch-domain, serve-expired |
| DNS 服务器 | server, server-tcp, server-tls, server-https, bootstrap-dns |
| 代理设置 | proxy-server |
| 过滤规则 | bogus-nxdomain, blacklist-ip, whitelist-ip, ignore-ip |
| 地址规则 | address, cname, srv-record, txt-record, https-record |
| 分流规则 | nameserver, domain-rules, domain-set, client-rules |
| IPSet/NFTSet | ipset, nftset, ip-rules, ip-set |
| 日志设置 | log-level, log-file, log-size, log-num, log-console |
| 审计设置 | audit-enable, audit-file, audit-size, audit-num |
| 高级选项 | speed-check-mode, response-mode, dualstack-ip-selection |
| TTL 设置 | rr-ttl, rr-ttl-min, rr-ttl-max, rr-ttl-reply-max |
| DNS64 | dns64 |
| 分组规则 | group-begin, group-match, group-end |
| 其他设置 | ddns-domain, local-domain, hosts-file, data-dir |
| 原始配置 | 直接编辑配置文件原始文本 |

## 按钮功能

| 按钮 | 功能 |
|------|------|
| 重新加载 | 从服务器重新加载配置 |
| 保存配置 | 保存当前配置到服务器 |
| 重启服务 | 重启 SmartDNS 服务 |

## 安装部署

### 前置要求

- Node.js 18+
- SmartDNS 已安装并配置 WebUI 插件

### 编译步骤

```bash
# 1. 克隆仓库
git clone https://github.com/yuxuan0107/smartdns-webui-patch.git
cd smartdns-webui-patch

# 2. 安装依赖
npm install

# 3. 编译项目
npm run build

# 4. 部署到 SmartDNS
cp -r out/* /usr/share/smartdns/wwwroot/
```

### 配置 SmartDNS

在 smartdns.conf 中添加：

```conf
# web ui plugin
plugin smartdns_ui.so
smartdns-ui.www-root /usr/share/smartdns/wwwroot
smartdns-ui.ip http://0.0.0.0:6080
smartdns-ui.user admin
smartdns-ui.password password
```

## 使用方法

1. 访问 `http://<服务器IP>:6080`
2. 输入用户名和密码登录
3. 点击左侧菜单配置 SmartDNS

## 致谢

- [pymumu/smartdns](https://github.com/pymumu/smartdns) - SmartDNS 核心项目
- [pymumu/smartdns-webui](https://github.com/pymumu/smartdns-webui) - 原版 WebUI

## 许可证

GPL-3.0 License
