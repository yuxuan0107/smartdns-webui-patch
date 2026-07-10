"use client";


import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'cache-size', label: '缓存大小', type: 'number' as const, hint: '0=不缓存, -1=自动' },
  { key: 'cache-mem-size', label: '缓存内存大小', type: 'text' as const, hint: '支持 K、M、G 单位' },
  { key: 'cache-persist', label: '持久化缓存', type: 'switch' as const, hint: '重启时保持缓存' },
  { key: 'cache-file', label: '缓存文件路径', type: 'text' as const, hint: '缓存持久化文件路径' },
  { key: 'cache-checkpoint-time', label: '缓存检查点时间', type: 'number' as const, hint: '缓存持久化间隔(秒)' },
  { key: 'prefetch-domain', label: '预取域名', type: 'switch' as const, hint: '启用域名预取功能' },
  { key: 'serve-expired', label: '过期缓存服务', type: 'switch' as const, hint: '使用过期缓存响应查询' },
  { key: 'serve-expired-ttl', label: '过期缓存 TTL', type: 'number' as const, hint: '过期缓存最长超时时间(秒)' },
  { key: 'serve-expired-reply-ttl', label: '过期响应 TTL', type: 'number' as const, hint: '过期缓存回复的 TTL 时间' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="缓存设置" items={items} />;
}
