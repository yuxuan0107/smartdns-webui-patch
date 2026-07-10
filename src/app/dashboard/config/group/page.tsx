"use client";

import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'group-begin', label: '组开始', type: 'list' as const, hint: '格式: group-begin group-name [-inherit parent-group]' },
  { key: 'group-match', label: '组匹配', type: 'list' as const, hint: '格式: -group group-name -client-ip ip/cidr -domain domain' },
  { key: 'group-end', label: '组结束', type: 'list' as const, hint: 'group-end' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="分组规则" items={items} />;
}
