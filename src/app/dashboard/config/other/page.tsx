"use client";

import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'ddns-domain', label: 'DDNS 域名', type: 'list' as const, hint: '指定 DDNS 域名' },
  { key: 'local-domain', label: '本地域名', type: 'list' as const, hint: '指定本地域名后缀' },
  { key: 'mdns-lookup', label: 'MDNS 查找', type: 'switch' as const, hint: '启用 mDNS 查询' },
  { key: 'hosts-file', label: 'Hosts 文件', type: 'text' as const, hint: '指定 hosts 文件路径' },
  { key: 'data-dir', label: '数据目录', type: 'text' as const, hint: 'SmartDNS 数据文件存放目录' },
  { key: 'conf-file', label: '包含配置文件', type: 'list' as const, hint: '附加配置文件，支持通配符' },
  { key: 'ca-file', label: 'CA 证书文件', type: 'text' as const, hint: 'CA 证书文件路径' },
  { key: 'ca-path', label: 'CA 证书路径', type: 'text' as const, hint: 'CA 证书目录路径' },
  { key: 'dnsmasq-lease-file', label: 'dnsmasq 租约文件', type: 'text' as const, hint: 'dnsmasq DHCP 租约文件' },
  { key: 'odhcpd-lease-file', label: 'odhcpd 租约文件', type: 'text' as const, hint: 'odhcpd DHCP 租约文件' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="其他设置" items={items} />;
}
