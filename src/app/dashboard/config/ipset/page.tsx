"use client";

import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'ipset', label: 'IPSet 规则', type: 'list' as const, hint: '格式: /domain/ipsetname' },
  { key: 'ipset-timeout', label: 'IPSet 超时', type: 'switch' as const, hint: '启用 IPSet 超时功能' },
  { key: 'ipset-no-speed', label: 'IPSet 无速度', type: 'list' as const, hint: '测速失败时添加到 ipset' },
  { key: 'nftset', label: 'NFTSet 规则', type: 'list' as const, hint: '格式: /domain/#4:inet#table#set' },
  { key: 'nftset-timeout', label: 'NFTSet 超时', type: 'switch' as const, hint: '启用 NFTSet 超时功能' },
  { key: 'nftset-no-speed', label: 'NFTSet 无速度', type: 'list' as const, hint: '测速失败时添加到 nftset' },
  { key: 'nftset-debug', label: 'NFTSet 调试', type: 'switch' as const, hint: '启用 NFTSet 调试功能' },
  { key: 'ip-rules', label: 'IP 规则', type: 'list' as const, hint: '格式: ip-cidrs [-ip-alias [...]]' },
  { key: 'ip-set', label: 'IP 集', type: 'list' as const, hint: '格式: -name set-name -type list -file /path' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="IPSet/NFTSet/IP规则" items={items} />;
}
