"use client";

import * as React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Snackbar, Switch, FormControlLabel, Stack } from '@mui/material';

const items = [
  { key: 'server-name', label: '服务器名称', type: 'text' as const, hint: 'DNS 服务器名称' },
  { key: 'user', label: '运行用户', type: 'text' as const, hint: 'SmartDNS 运行用户' },
  { key: 'resolv-hostname', label: '解析本地主机名', type: 'switch' as const, hint: '将本地主机名解析为 IP' },
];

export default function Page(): React.JSX.Element {
  const [configValues, setConfigValues] = React.useState<Record<string, string>>({});
  const [rawContent, setRawContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadConfig = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/config/file', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        const content = data.content || '';
        setRawContent(content);
        const values: Record<string, string> = {};
        const lines = content.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const spaceIndex = trimmed.indexOf(' ');
          if (spaceIndex > 0) { const key = trimmed.slice(0, spaceIndex); const value = trimmed.slice(spaceIndex + 1); if (!values[key]) values[key] = value; }
        }
        setConfigValues(values);
        setMessage({ text: '配置已加载', type: 'success' });
      } else {
        setMessage({ text: '加载配置失败', type: 'error' });
      }
    } catch (error) { setMessage({ text: '加载配置失败: ' + String(error), type: 'error' }); }
    setLoading(false);
  };

  const saveConfig = async (): Promise<void> => {
    setSaving(true);
    try {
      let content = rawContent;
      for (const key of Object.keys(configValues)) {
        const regex = new RegExp(`^${key}\\s+.*$`, 'gm');
        if (regex.test(content)) content = content.replace(regex, `${key} ${configValues[key]}`);
        else content += `\n${key} ${configValues[key]}`;
      }
      const response = await fetch('/api/config/file', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }), credentials: 'include' });
      if (response.ok) { setMessage({ text: '配置已保存', type: 'success' }); await loadConfig(); }
      else { setMessage({ text: '保存配置失败', type: 'error' }); }
    } catch (error) { setMessage({ text: '保存配置失败: ' + String(error), type: 'error' }); }
    setSaving(false);
  };

  const restartService = async (): Promise<void> => {
    setSaving(true);
    try {
      setMessage({ text: '正在重启服务...', type: 'success' });
      const response = await fetch('/api/service/restart', { method: 'PUT', credentials: 'include' });
      if (response.ok) {
        setMessage({ text: '服务已重启，正在重新加载配置...', type: 'success' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        await loadConfig();
        setMessage({ text: '配置重新加载成功', type: 'success' });
      } else { setMessage({ text: '重启服务失败', type: 'error' }); }
    } catch (error) { setMessage({ text: '重启服务失败: ' + String(error), type: 'error' }); }
    setSaving(false);
  };

  const handleValueChange = (key: string, value: string | boolean) => { setConfigValues(prev => ({ ...prev, [key]: String(value) })); };
  React.useEffect(() => { loadConfig(); }, []);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">基本设置</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="primary" onClick={loadConfig} disabled={loading}>{loading ? '加载中...' : '重新加载'}</Button>
          <Button variant="contained" color="success" onClick={saveConfig} disabled={saving}>{saving ? '保存中...' : '保存配置'}</Button>
          <Button variant="contained" color="warning" onClick={restartService} disabled={saving}>{saving ? '重启中...' : '重启服务'}</Button>
        </Box>
      </Box>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            {items.map((item) => (
              <Box key={item.key} sx={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px', gap: 2, alignItems: 'center' }}>
                <Box><Typography variant="body2" fontWeight="bold">{item.label}</Typography><Typography variant="caption" color="text.secondary">{item.key}</Typography></Box>
                <Box>{item.type === 'switch' ? <FormControlLabel control={<Switch checked={configValues[item.key] === 'yes'} onChange={(e) => handleValueChange(item.key, e.target.checked ? 'yes' : 'no')} />} label={configValues[item.key] === 'yes' ? '是' : '否'} /> : <TextField fullWidth size="small" type={item.type} value={configValues[item.key] || ''} onChange={(e) => handleValueChange(item.key, e.target.value)} />}</Box>
                <Box sx={{ fontSize: 12, color: 'text.secondary' }}>{item.hint}</Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
      <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage(null)}><Alert severity={message?.type || 'info'} onClose={() => setMessage(null)}>{message?.text}</Alert></Snackbar>
    </Stack>
  );
}
