"use client";


import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'dns64', label: 'DNS64 前缀', type: 'text' as const, hint: '格式: 64:ff9b::/96' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="DNS64" items={items} />;
}
