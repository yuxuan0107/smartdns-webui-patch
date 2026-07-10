"use client";

import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'address', label: '地址规则', type: 'list' as const, hint: '格式: /domain/ip 或 /domain/#' },
  { key: 'cname', label: 'CNAME 记录', type: 'list' as const, hint: '格式: /domain/target' },
  { key: 'srv-record', label: 'SRV 记录', type: 'list' as const, hint: '格式: /domain/[target][,port][,priority][,weight]' },
  { key: 'txt-record', label: 'TXT 记录', type: 'list' as const, hint: '格式: /domain/text' },
  { key: 'https-record', label: 'HTTPS 记录', type: 'list' as const, hint: '格式: /domain/[target=][,port=]' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="地址规则" items={items} />;
}
