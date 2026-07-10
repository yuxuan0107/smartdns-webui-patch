"use client";


import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'rr-ttl', label: 'RR-TTL', type: 'number' as const, hint: '所有记录的 TTL' },
  { key: 'rr-ttl-min', label: '最小 TTL', type: 'number' as const, hint: '记录最小 TTL' },
  { key: 'rr-ttl-max', label: '最大 TTL', type: 'number' as const, hint: '记录最大 TTL' },
  { key: 'rr-ttl-reply-max', label: '最大响应 TTL', type: 'number' as const, hint: '返回给客户端的最大 TTL' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="TTL 设置" items={items} />;
}
