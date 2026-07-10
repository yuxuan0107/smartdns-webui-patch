"use client";

import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'server', label: 'UDP 服务器', type: 'list' as const, hint: '格式: [IP]:[port]，支持 IPv4 和 IPv6' },
  { key: 'server-tcp', label: 'TCP 服务器', type: 'list' as const, hint: 'TCP 上游服务器' },
  { key: 'server-tls', label: 'TLS 服务器', type: 'list' as const, hint: 'DNS Over TLS 服务器' },
  { key: 'server-https', label: 'HTTPS 服务器', type: 'list' as const, hint: 'DNS Over HTTPS 服务器' },
  { key: 'server-quic', label: 'QUIC 服务器', type: 'list' as const, hint: 'DNS Over QUIC 服务器' },
  { key: 'server-http3', label: 'HTTP3 服务器', type: 'list' as const, hint: 'HTTP/3 上游服务器' },
  { key: 'bootstrap-dns', label: 'Bootstrap DNS 服务器', type: 'list' as const, hint: '用于解析 DNS 服务器域名的引导服务器' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="DNS 服务器" items={items} />;
}
