"use client";


import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'log-level', label: '日志级别', type: 'select' as const, options: ['debug', 'info', 'notice', 'warn', 'error', 'fatal', 'off'], hint: '日志输出级别' },
  { key: 'log-file', label: '日志文件路径', type: 'text' as const, hint: '日志文件保存路径' },
  { key: 'log-size', label: '日志文件大小', type: 'text' as const, hint: '支持 K、M、G 单位' },
  { key: 'log-num', label: '日志文件数量', type: 'number' as const, hint: '0=禁用日志' },
  { key: 'log-file-mode', label: '日志文件权限', type: 'text' as const, hint: '文件权限模式' },
  { key: 'log-console', label: '控制台输出', type: 'switch' as const, hint: '将日志输出到控制台' },
  { key: 'log-syslog', label: 'Syslog 输出', type: 'switch' as const, hint: '将日志输出到系统日志' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="日志设置" items={items} />;
}
