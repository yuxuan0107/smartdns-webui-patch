"use client";


import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'audit-enable', label: '启用审计', type: 'switch' as const, hint: '启用 DNS 查询审计日志' },
  { key: 'audit-SOA', label: '审计 SOA', type: 'switch' as const, hint: '审计日志是否记录 SOA 结果' },
  { key: 'audit-file', label: '审计文件路径', type: 'text' as const, hint: '审计日志文件路径' },
  { key: 'audit-size', label: '审计文件大小', type: 'text' as const, hint: '支持 K、M、G 单位' },
  { key: 'audit-num', label: '审计文件数量', type: 'number' as const, hint: '审计日志归档个数' },
  { key: 'audit-file-mode', label: '审计文件权限', type: 'text' as const, hint: '审计文件权限模式' },
  { key: 'audit-console', label: '审计控制台输出', type: 'switch' as const, hint: '将审计日志输出到控制台' },
  { key: 'audit-syslog', label: '审计 Syslog', type: 'switch' as const, hint: '将审计日志输出到系统日志' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="审计设置" items={items} />;
}
