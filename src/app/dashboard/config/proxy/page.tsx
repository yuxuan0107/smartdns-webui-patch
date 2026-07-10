"use client";


import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'proxy-server', label: '代理服务器', type: 'text' as const, hint: '格式: socks5://host:port -name name' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="代理设置" items={items} />;
}
