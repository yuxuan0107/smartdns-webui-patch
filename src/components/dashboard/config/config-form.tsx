"use client";

import * as React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Snackbar, Switch, FormControlLabel, Tabs, Tab, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { smartdnsServer } from '@/lib/backend/server';

interface ConfigItem {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'switch';
  options?: string[];
  hint?: string;
}

const configSections: { title: string; items: ConfigItem[] }[] = [
  {
    title: '基本设置',
    items: [
      { key: 'server-name', label: '服务器名称', type: 'text', hint: 'DNS 服务器名称' },
      { key: 'user', label: '运行用户', type: 'text', hint: 'SmartDNS 运行用户' },
      { key: 'resolv-hostname', label: '解析本地主机名', type: 'switch', hint: '将本地主机名解析为 IP' },
    ]
  },
  {
    title: '监听设置',
    items: [
      { key: 'bind', label: 'UDP 监听', type: 'text', hint: '格式: [IP]:[port]' },
      { key: 'bind-tcp', label: 'TCP 监听', type: 'text', hint: 'TCP 监听端口' },
      { key: 'bind-tls', label: 'TLS 监听', type: 'text', hint: 'DNS Over TLS 监听端口' },
      { key: 'bind-https', label: 'HTTPS 监听', type: 'text', hint: 'DNS Over HTTPS 监听端口' },
      { key: 'tcp-idle-time', label: 'TCP 空闲超时', type: 'number', hint: 'TCP 连接空闲超时时间(秒)' },
    ]
  },
  {
    title: 'TLS 证书',
    items: [
      { key: 'bind-cert-key-file', label: '证书私钥文件', type: 'text', hint: 'SSL/TLS 证书私钥文件路径' },
      { key: 'bind-cert-file', label: '证书文件', type: 'text', hint: 'SSL/TLS 证书文件路径' },
      { key: 'bind-cert-generate', label: '自动生成证书', type: 'select', options: ['auto', 'yes', 'no'], hint: '是否自动生成 SSL 证书' },
      { key: 'bind-cert-san', label: '证书 SAN', type: 'text', hint: '自动生成证书时的 SAN' },
      { key: 'bind-cert-key-pass', label: '私钥密码', type: 'text', hint: 'SSL 证书私钥密码' },
    ]
  },
  {
    title: '缓存设置',
    items: [
      { key: 'cache-size', label: '缓存大小', type: 'number', hint: '0=不缓存, -1=自动' },
      { key: 'cache-mem-size', label: '缓存内存大小', type: 'text', hint: '支持 K、M、G 单位' },
      { key: 'cache-persist', label: '持久化缓存', type: 'switch', hint: '重启时保持缓存' },
      { key: 'cache-file', label: '缓存文件路径', type: 'text', hint: '缓存持久化文件路径' },
      { key: 'cache-checkpoint-time', label: '缓存检查点时间', type: 'number', hint: '缓存持久化间隔(秒)' },
      { key: 'prefetch-domain', label: '预取域名', type: 'switch', hint: '启用域名预取功能' },
      { key: 'serve-expired', label: '过期缓存服务', type: 'switch', hint: '使用过期缓存响应查询' },
      { key: 'serve-expired-ttl', label: '过期缓存 TTL', type: 'number', hint: '过期缓存最长超时时间(秒)' },
      { key: 'serve-expired-reply-ttl', label: '过期响应 TTL', type: 'number', hint: '过期缓存回复的 TTL 时间' },
    ]
  },
  {
    title: 'DNS 服务器',
    items: [
      { key: 'server', label: 'UDP 服务器', type: 'text', hint: '格式: [IP]:[port]' },
      { key: 'server-tcp', label: 'TCP 服务器', type: 'text', hint: 'TCP 上游服务器' },
      { key: 'server-tls', label: 'TLS 服务器', type: 'text', hint: 'DNS Over TLS 服务器' },
      { key: 'server-https', label: 'HTTPS 服务器', type: 'text', hint: 'DNS Over HTTPS 服务器' },
      { key: 'server-quic', label: 'QUIC 服务器', type: 'text', hint: 'DNS Over QUIC 服务器' },
      { key: 'server-http3', label: 'HTTP3 服务器', type: 'text', hint: 'HTTP/3 上游服务器' },
    ]
  },
  {
    title: '代理设置',
    items: [
      { key: 'proxy-server', label: '代理服务器', type: 'text', hint: '格式: socks5://host:port -name name' },
    ]
  },
  {
    title: '过滤设置',
    items: [
      { key: 'bogus-nxdomain', label: '伪造 NXDOMAIN', type: 'text', hint: '过滤虚假 NXDOMAIN 结果' },
      { key: 'blacklist-ip', label: '黑名单 IP', type: 'text', hint: '过滤黑名单中的 IP' },
      { key: 'whitelist-ip', label: '白名单 IP', type: 'text', hint: '仅接受白名单中的 IP' },
      { key: 'ignore-ip', label: '忽略 IP', type: 'text', hint: '忽略指定 IP 段' },
      { key: 'ip-alias', label: 'IP 别名', type: 'text', hint: '格式: ip/subnet ip1,ip2' },
    ]
  },
  {
    title: '地址规则',
    items: [
      { key: 'address', label: '地址规则', type: 'text', hint: '格式: /domain/ip 或 /domain/#' },
      { key: 'cname', label: 'CNAME 记录', type: 'text', hint: '格式: /domain/target' },
      { key: 'srv-record', label: 'SRV 记录', type: 'text', hint: '格式: /domain/[target][,port][,priority][,weight]' },
      { key: 'txt-record', label: 'TXT 记录', type: 'text', hint: '格式: /domain/text' },
      { key: 'https-record', label: 'HTTPS 记录', type: 'text', hint: '格式: /domain/[target=][,port=]' },
    ]
  },
  {
    title: '分流规则',
    items: [
      { key: 'nameserver', label: '名称服务器规则', type: 'text', hint: '格式: /domain/group-name' },
      { key: 'domain-rules', label: '域名规则', type: 'text', hint: '格式: /domain/ -speed-check-mode ping' },
      { key: 'domain-set', label: '域名集', type: 'text', hint: '格式: -name set-name -type list -file /path' },
      { key: 'client-rules', label: '客户端规则', type: 'text', hint: '格式: [ip-cidr|mac] -group group-name' },
    ]
  },
  {
    title: 'IPSet/NFTSet',
    items: [
      { key: 'ipset', label: 'IPSet 规则', type: 'text', hint: '格式: /domain/ipsetname' },
      { key: 'ipset-timeout', label: 'IPSet 超时', type: 'switch', hint: '启用 IPSet 超时功能' },
      { key: 'ipset-no-speed', label: 'IPSet 无速度', type: 'text', hint: '测速失败时添加到 ipset' },
      { key: 'nftset', label: 'NFTSet 规则', type: 'text', hint: '格式: /domain/#4:inet#table#set' },
      { key: 'nftset-timeout', label: 'NFTSet 超时', type: 'switch', hint: '启用 NFTSet 超时功能' },
      { key: 'nftset-no-speed', label: 'NFTSet 无速度', type: 'text', hint: '测速失败时添加到 nftset' },
      { key: 'nftset-debug', label: 'NFTSet 调试', type: 'switch', hint: '启用 NFTSet 调试功能' },
    ]
  },
  {
    title: '日志设置',
    items: [
      { key: 'log-level', label: '日志级别', type: 'select', options: ['debug', 'info', 'notice', 'warn', 'error', 'fatal', 'off'], hint: '日志输出级别' },
      { key: 'log-file', label: '日志文件路径', type: 'text', hint: '日志文件保存路径' },
      { key: 'log-size', label: '日志文件大小', type: 'text', hint: '支持 K、M、G 单位' },
      { key: 'log-num', label: '日志文件数量', type: 'number', hint: '0=禁用日志' },
      { key: 'log-file-mode', label: '日志文件权限', type: 'text', hint: '文件权限模式' },
      { key: 'log-console', label: '控制台输出', type: 'switch', hint: '将日志输出到控制台' },
      { key: 'log-syslog', label: 'Syslog 输出', type: 'switch', hint: '将日志输出到系统日志' },
    ]
  },
  {
    title: '审计设置',
    items: [
      { key: 'audit-enable', label: '启用审计', type: 'switch', hint: '启用 DNS 查询审计日志' },
      { key: 'audit-SOA', label: '审计 SOA', type: 'switch', hint: '审计日志是否记录 SOA 结果' },
      { key: 'audit-file', label: '审计文件路径', type: 'text', hint: '审计日志文件路径' },
      { key: 'audit-size', label: '审计文件大小', type: 'text', hint: '支持 K、M、G 单位' },
      { key: 'audit-num', label: '审计文件数量', type: 'number', hint: '审计日志归档个数' },
      { key: 'audit-file-mode', label: '审计文件权限', type: 'text', hint: '审计文件权限模式' },
      { key: 'audit-console', label: '审计控制台输出', type: 'switch', hint: '将审计日志输出到控制台' },
      { key: 'audit-syslog', label: '审计 Syslog', type: 'switch', hint: '将审计日志输出到系统日志' },
    ]
  },
  {
    title: '高级选项',
    items: [
      { key: 'speed-check-mode', label: '测速模式', type: 'text', hint: 'ping,tcp:80,tcp:443' },
      { key: 'response-mode', label: '响应模式', type: 'select', options: ['first-ping', 'fastest-ip', 'fastest-response'], hint: 'DNS 响应模式' },
      { key: 'force-AAAA-SOA', label: '强制 AAAA 返回 SOA', type: 'switch', hint: '屏蔽 IPv6 查询' },
      { key: 'force-qtype-SOA', label: '强制类型返回 SOA', type: 'text', hint: '格式: qtypeid 或 start-end' },
      { key: 'max-reply-ip-num', label: '最大返回 IP 数', type: 'number', hint: '返回给客户端的最大 IP 数量' },
      { key: 'max-query-limit', label: '最大查询限制', type: 'number', hint: '最大并发请求数量' },
      { key: 'dualstack-ip-selection', label: '双栈 IP 选择', type: 'switch', hint: '启用 IPv4/IPv6 优化选择' },
      { key: 'dualstack-ip-selection-threshold', label: '双栈选择阈值', type: 'number', hint: '延迟阈值(0~1000ms)' },
      { key: 'dualstack-ip-allow-force-AAAA', label: '允许强制 AAAA', type: 'switch', hint: '允许强制 AAAA 查询' },
      { key: 'edns-client-subnet', label: 'EDNS 客户端子网', type: 'text', hint: '指定 EDNS 客户端子网' },
      { key: 'expand-ptr-from-address', label: '扩展 PTR', type: 'switch', hint: '扩展 Address 对应的 PTR 记录' },
    ]
  },
  {
    title: 'TTL 设置',
    items: [
      { key: 'rr-ttl', label: 'RR-TTL', type: 'number', hint: '所有记录的 TTL' },
      { key: 'rr-ttl-min', label: '最小 TTL', type: 'number', hint: '记录最小 TTL' },
      { key: 'rr-ttl-max', label: '最大 TTL', type: 'number', hint: '记录最大 TTL' },
      { key: 'rr-ttl-reply-max', label: '最大响应 TTL', type: 'number', hint: '返回给客户端的最大 TTL' },
    ]
  },
  {
    title: 'DNS64',
    items: [
      { key: 'dns64', label: 'DNS64 前缀', type: 'text', hint: '格式: 64:ff9b::/96' },
    ]
  },
  {
    title: '其他设置',
    items: [
      { key: 'ddns-domain', label: 'DDNS 域名', type: 'text', hint: '指定 DDNS 域名' },
      { key: 'local-domain', label: '本地域名', type: 'text', hint: '指定本地域名后缀' },
      { key: 'mdns-lookup', label: 'MDNS 查找', type: 'switch', hint: '启用 mDNS 查询' },
      { key: 'hosts-file', label: 'Hosts 文件', type: 'text', hint: '指定 hosts 文件路径' },
      { key: 'data-dir', label: '数据目录', type: 'text', hint: 'SmartDNS 数据文件存放目录' },
      { key: 'conf-file', label: '包含配置文件', type: 'text', hint: '附加配置文件，支持通配符' },
      { key: 'ca-file', label: 'CA 证书文件', type: 'text', hint: 'CA 证书文件路径' },
      { key: 'ca-path', label: 'CA 证书路径', type: 'text', hint: 'CA 证书目录路径' },
      { key: 'dnsmasq-lease-file', label: 'dnsmasq 租约文件', type: 'text', hint: 'dnsmasq DHCP 租约文件' },
      { key: 'odhcpd-lease-file', label: 'odhcpd 租约文件', type: 'text', hint: 'odhcpd DHCP 租约文件' },
    ]
  },
];

export default function ConfigForm({ initialTab = 0 }: { initialTab?: number }): React.JSX.Element {
  const { t } = useTranslation();
  const [configValues, setConfigValues] = React.useState<Record<string, string>>({});
  const [rawConfig, setRawConfig] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [tabValue, setTabValue] = React.useState(initialTab);
  const [viewMode, setViewMode] = React.useState<'form' | 'raw'>('form');

  const parseConfig = (content: string): Record<string, string> => {
    const values: Record<string, string> = {};
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        const key = parts[0];
        const value = parts.slice(1).join(' ');
        if (values[key] === undefined) {
          values[key] = value;
        } else {
          values[key] += '\n' + value;
        }
      }
    }
    return values;
  };

  const loadConfig = React.useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/config/file', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRawConfig(data.content || '');
        setConfigValues(parseConfig(data.content || ''));
      } else {
        setMessage({ text: 'Failed to load config', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Failed to load config', type: 'error' });
    }
    setLoading(false);
  }, []);

  const saveConfig = async (): Promise<void> => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/config/file', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: rawConfig })
      });
      if (response.ok) {
        setMessage({ text: 'Config saved successfully', type: 'success' });
      } else {
        setMessage({ text: 'Failed to save config', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Failed to save config', type: 'error' });
    }
    setSaving(false);
  };

  const restartService = async (): Promise<void> => {
    if (!confirm('Restart SmartDNS service?')) return;
    try {
      const result = await smartdnsServer.RestartServer();
      if (result.error) {
        setMessage({ text: 'Failed to restart service', type: 'error' });
      } else {
        setMessage({ text: 'Service restarted successfully', type: 'success' });
      }
    } catch {
      setMessage({ text: 'Failed to restart service', type: 'error' });
    }
  };

  const handleValueChange = (key: string, value: string | boolean) => {
    setConfigValues(prev => ({ ...prev, [key]: String(value) }));
  };

  React.useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{t('Configuration')}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" onClick={() => setViewMode(viewMode === 'form' ? 'raw' : 'form')}>
            {viewMode === 'form' ? 'Raw View' : 'Form View'}
          </Button>
          <Button variant="contained" color="primary" onClick={loadConfig} disabled={loading}>
            {loading ? 'Loading...' : 'Reload'}
          </Button>
          <Button variant="contained" color="success" onClick={saveConfig} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
          <Button variant="contained" color="warning" onClick={restartService}>
            Restart
          </Button>
        </Box>
      </Box>

      {viewMode === 'form' ? (
        <Card>
          <CardContent>
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2 }}>
              {configSections.map((section, index) => (
                <Tab key={index} label={section.title} />
              ))}
            </Tabs>
            {configSections.map((section, index) => (
              <Box key={index} sx={{ display: tabValue === index ? 'block' : 'none' }}>
                <Stack spacing={2}>
                  {section.items.map((item) => (
                    <Box key={item.key} sx={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px', gap: 2, alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">{item.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.key}</Typography>
                      </Box>
                      <Box>
                        {item.type === 'switch' ? (
                          <FormControlLabel
                            control={
                              <Switch
                                checked={configValues[item.key] === 'yes'}
                                onChange={(e) => handleValueChange(item.key, e.target.checked ? 'yes' : 'no')}
                              />
                            }
                            label={configValues[item.key] === 'yes' ? 'Yes' : 'No'}
                          />
                        ) : item.type === 'select' ? (
                          <TextField
                            fullWidth
                            size="small"
                            select
                            value={configValues[item.key] || ''}
                            onChange={(e) => handleValueChange(item.key, e.target.value)}
                            SelectProps={{ native: true }}
                          >
                            {item.options?.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </TextField>
                        ) : (
                          <TextField
                            fullWidth
                            size="small"
                            type={item.type}
                            value={configValues[item.key] || ''}
                            onChange={(e) => handleValueChange(item.key, e.target.value)}
                          />
                        )}
                      </Box>
                      <Box sx={{ fontSize: 12, color: 'text.secondary' }}>{item.hint}</Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Raw Config</Typography>
            <TextField
              fullWidth
              multiline
              rows={30}
              value={rawConfig}
              onChange={(e) => setRawConfig(e.target.value)}
              disabled={loading}
              sx={{ fontFamily: 'monospace' }}
            />
          </CardContent>
        </Card>
      )}

      <Snackbar open={!!message} autoHideDuration={6000} onClose={() => setMessage(null)}>
        <Alert severity={message?.type || 'info'} onClose={() => setMessage(null)}>
          {message?.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
