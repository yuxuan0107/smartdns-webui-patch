"use client";

import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'nameserver', label: '名称服务器规则', type: 'list' as const, hint: '格式: /domain/group-name' },
  { key: 'domain-rules', label: '域名规则', type: 'list' as const, hint: '格式: /domain/ -speed-check-mode ping' },
  { key: 'domain-set', label: '域名集', type: 'list' as const, hint: '格式: -name set-name -type list -file /path' },
  { key: 'client-rules', label: '客户端规则', type: 'list' as const, hint: '格式: [ip-cidr|mac] -group group-name' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="分流规则" items={items} />;
}
