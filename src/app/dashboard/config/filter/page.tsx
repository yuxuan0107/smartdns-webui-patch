"use client";

import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'bogus-nxdomain', label: '伪造 NXDOMAIN', type: 'list' as const, hint: '过滤虚假 NXDOMAIN 结果' },
  { key: 'blacklist-ip', label: '黑名单 IP', type: 'list' as const, hint: '过滤黑名单中的 IP' },
  { key: 'whitelist-ip', label: '白名单 IP', type: 'list' as const, hint: '仅接受白名单中的 IP' },
  { key: 'ignore-ip', label: '忽略 IP', type: 'list' as const, hint: '忽略指定 IP 段' },
  { key: 'ip-alias', label: 'IP 别名', type: 'list' as const, hint: '格式: ip/subnet ip1,ip2' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="过滤规则" items={items} />;
}
