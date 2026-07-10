"use client";


import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'speed-check-mode', label: '测速模式', type: 'text' as const, hint: 'ping,tcp:80,tcp:443' },
  { key: 'response-mode', label: '响应模式', type: 'select' as const, options: ['first-ping', 'fastest-ip', 'fastest-response'], hint: 'DNS 响应模式' },
  { key: 'force-AAAA-SOA', label: '强制 AAAA 返回 SOA', type: 'switch' as const, hint: '屏蔽 IPv6 查询' },
  { key: 'force-qtype-SOA', label: '强制类型返回 SOA', type: 'text' as const, hint: '格式: qtypeid 或 start-end' },
  { key: 'max-reply-ip-num', label: '最大返回 IP 数', type: 'number' as const, hint: '返回给客户端的最大 IP 数量' },
  { key: 'max-query-limit', label: '最大查询限制', type: 'number' as const, hint: '最大并发请求数量' },
  { key: 'dualstack-ip-selection', label: '双栈 IP 选择', type: 'switch' as const, hint: '启用 IPv4/IPv6 优化选择' },
  { key: 'dualstack-ip-selection-threshold', label: '双栈选择阈值', type: 'number' as const, hint: '延迟阈值(0~1000ms)' },
  { key: 'dualstack-ip-allow-force-AAAA', label: '允许强制 AAAA', type: 'switch' as const, hint: '允许强制 AAAA 查询' },
  { key: 'edns-client-subnet', label: 'EDNS 客户端子网', type: 'text' as const, hint: '指定 EDNS 客户端子网' },
  { key: 'expand-ptr-from-address', label: '扩展 PTR', type: 'switch' as const, hint: '扩展 Address 对应的 PTR 记录' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="高级选项" items={items} />;
}
