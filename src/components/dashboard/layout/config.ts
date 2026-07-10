import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'dashboard', title: '仪表盘', href: paths.dashboard.dashboard, icon: 'QueryStats'},
  { key: 'query-log', title: '查询日志', href: paths.dashboard.queryLog, icon: 'EventNote' },
  { key: 'upstream-servers', title: '上游服务器', href: paths.dashboard.upstreamServers, icon: 'Dns' },
  { key: 'devices', title: '客户端', href: paths.dashboard.clients, icon: 'Devices' },
  { 
    key: 'config', 
    title: '参数配置', 
    icon: 'Code',
    items: [
      { key: 'config-basic', title: '基本设置', href: '/dashboard/config/basic', icon: 'Settings' },
      { key: 'config-bind', title: '监听设置', href: '/dashboard/config/bind', icon: 'Wifi' },
      { key: 'config-tls', title: 'TLS 证书', href: '/dashboard/config/tls', icon: 'Lock' },
      { key: 'config-cache', title: '缓存设置', href: '/dashboard/config/cache', icon: 'Database' },
      { key: 'config-server', title: 'DNS 服务器', href: '/dashboard/config/server', icon: 'Dns' },
      { key: 'config-proxy', title: '代理设置', href: '/dashboard/config/proxy', icon: 'Shield' },
      { key: 'config-filter', title: '过滤规则', href: '/dashboard/config/filter', icon: 'Filter' },
      { key: 'config-address', title: '地址规则', href: '/dashboard/config/address', icon: 'MapMarker' },
      { key: 'config-nameserver', title: '分流规则', href: '/dashboard/config/nameserver', icon: 'Sitemap' },
      { key: 'config-ipset', title: 'IPSet/NFTSet/IP规则', href: '/dashboard/config/ipset', icon: 'ShieldAlt' },
      { key: 'config-log', title: '日志设置', href: '/dashboard/config/log', icon: 'FileAlt' },
      { key: 'config-audit', title: '审计设置', href: '/dashboard/config/audit', icon: 'ClipboardList' },
      { key: 'config-advanced', title: '高级选项', href: '/dashboard/config/advanced', icon: 'SlidersH' },
      { key: 'config-ttl', title: 'TTL 设置', href: '/dashboard/config/ttl', icon: 'Clock' },
      { key: 'config-dns64', title: 'DNS64', href: '/dashboard/config/dns64', icon: 'ExchangeAlt' },
      { key: 'config-group', title: '分组规则', href: '/dashboard/config/group', icon: 'AccountTree' },
      { key: 'config-other', title: '其他设置', href: '/dashboard/config/other', icon: 'Cog' },
      { key: 'config-raw', title: '原始配置', href: '/dashboard/config', icon: 'Code' },
    ]
  },
  { key: 'log', title: '日志', href: paths.dashboard.log, icon: 'Article' },
  { key: 'term', title: '终端', href: paths.dashboard.term, icon: 'Terminal' },
  { key: 'settings', title: '设置', href: paths.dashboard.settings, icon: 'Settings' },
] satisfies NavItemConfig[];
