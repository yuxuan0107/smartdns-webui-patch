"use client";


import * as React from 'react';
import ConfigSection from '@/components/dashboard/config/config-section';

const items = [
  { key: 'bind-cert-key-file', label: '证书私钥文件', type: 'text' as const, hint: 'SSL/TLS 证书私钥文件路径' },
  { key: 'bind-cert-file', label: '证书文件', type: 'text' as const, hint: 'SSL/TLS 证书文件路径' },
  { key: 'bind-cert-generate', label: '自动生成证书', type: 'select' as const, options: ['auto', 'yes', 'no'], hint: '是否自动生成 SSL 证书' },
  { key: 'bind-cert-san', label: '证书 SAN', type: 'text' as const, hint: '自动生成证书时的 SAN' },
  { key: 'bind-cert-key-pass', label: '私钥密码', type: 'text' as const, hint: 'SSL 证书私钥密码' },
];

export default function Page(): React.JSX.Element {
  return <ConfigSection title="TLS 证书" items={items} />;
}
