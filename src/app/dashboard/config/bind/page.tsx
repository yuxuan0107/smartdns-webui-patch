"use client";

import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'bind', label: 'UDP 监听', type: 'list' as const, hint: '格式: [IP]:[port]，支持 IPv4/IPv6 双栈，如 0.0.0.0:53 和 [::]:53' },
  { key: 'bind-tcp', label: 'TCP 监听', type: 'list' as const, hint: 'TCP 监听端口，支持双栈' },
  { key: 'bind-tls', label: 'TLS 监听', type: 'list' as const, hint: 'DNS Over TLS 监听端口，支持双栈' },
  { key: 'bind-https', label: 'HTTPS 监听', type: 'list' as const, hint: 'DNS Over HTTPS 监听端口，支持双栈' },
  { key: 'tcp-idle-time', label: 'TCP 空闲超时', type: 'number' as const, hint: 'TCP 连接空闲超时时间(秒)' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="监听设置" items={items} />;
}
