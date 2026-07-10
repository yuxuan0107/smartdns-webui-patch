"use client";

import * as React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Snackbar, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfigItem {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'switch' | 'list';
  options?: string[];
  hint?: string;
  required?: boolean;
}

interface ConfigSectionProps {
  title: string;
  items: ConfigItem[];
}

export default function ConfigSection({ title, items }: ConfigSectionProps): React.JSX.Element {
  const [configValues, setConfigValues] = React.useState<Record<string, string[]>>({});
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
        const values: Record<string, string[]> = {};
        const lines = content.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const spaceIndex = trimmed.indexOf(' ');
          if (spaceIndex > 0) {
            const key = trimmed.slice(0, spaceIndex);
            const value = trimmed.slice(spaceIndex + 1);
            if (!values[key]) values[key] = [];
            values[key].push(value);
          }
        }
        setConfigValues(values);
        setMessage({ text: '配置已加载', type: 'success' });
      } else {
        setMessage({ text: '加载配置失败', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: '加载配置失败: ' + String(error), type: 'error' });
    }
    setLoading(false);
  };

  const validateConfig = (): string[] => {
    const errors: string[] = [];
    for (const item of items) {
      if (item.required) {
        const values = configValues[item.key] || [];
        const nonEmptyValues = values.filter(v => v.trim() !== '');
        if (nonEmptyValues.length === 0) errors.push(`${item.label} (${item.key}) 不能为空`);
      }
    }
    return errors;
  };

  const buildContent = (): string => {
    let content = rawContent;
    for (const key of Object.keys(configValues)) {
      const regex = new RegExp(`^${key}\\s+.*$`, 'gm');
      content = content.replaceAll(regex, '');
    }
    for (const key of Object.keys(configValues)) {
      const values = configValues[key];
      if (values && values.length > 0) {
        for (const value of values) {
          if (value.trim()) content += `\n${key} ${value}`;
        }
      }
    }
    return content.replaceAll(/\n{3,}/g, '\n\n');
  };

  const saveConfig = async (): Promise<void> => {
    const errors = validateConfig();
    if (errors.length > 0) {
      setMessage({ text: '请填写必填字段: ' + errors.join(', '), type: 'error' });
      return;
    }
    setSaving(true);
    try {
      const content = buildContent();
      const response = await fetch('/api/config/file', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
        credentials: 'include'
      });
      if (response.ok) {
        setMessage({ text: '配置已保存', type: 'success' });
        await loadConfig();
      } else {
        setMessage({ text: '保存配置失败', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: '保存配置失败: ' + String(error), type: 'error' });
    }
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
      } else {
        setMessage({ text: '重启服务失败', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: '重启服务失败: ' + String(error), type: 'error' });
    }
    setSaving(false);
  };

  const handleValueChange = (key: string, index: number, value: string) => {
    setConfigValues(prev => {
      const newValues = { ...prev };
      if (!newValues[key]) newValues[key] = [];
      newValues[key][index] = value;
      return newValues;
    });
  };

  const addValue = (key: string) => {
    setConfigValues(prev => {
      const newValues = { ...prev };
      if (!newValues[key]) newValues[key] = [];
      newValues[key].push('');
      return newValues;
    });
  };

  const removeValue = (key: string, index: number) => {
    setConfigValues(prev => {
      const newValues = { ...prev };
      if (newValues[key]) newValues[key].splice(index, 1);
      return newValues;
    });
  };

  React.useEffect(() => { loadConfig(); }, []);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="primary" onClick={loadConfig} disabled={loading}>{loading ? '加载中...' : '重新加载'}</Button>
          <Button variant="contained" color="success" onClick={saveConfig} disabled={saving}>{saving ? '保存中...' : '保存配置'}</Button>
          <Button variant="contained" color="warning" onClick={restartService} disabled={saving}>{saving ? '重启中...' : '重启服务'}</Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            {items.map((item) => (
              <Box key={item.key} sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ flex: 1 }}>
                    {item.label}{item.required && <span style={{ color: 'red' }}> *</span>}
                    <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>({item.key})</Typography>
                  </Typography>
                  {item.type === 'list' && <Button size="small" startIcon={<AddIcon />} onClick={() => addValue(item.key)}>添加</Button>}
                </Box>
                {item.type === 'list' ? (
                  <Stack spacing={1}>
                    {(configValues[item.key] || ['']).map((value, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField fullWidth size="small" value={value} onChange={(e) => handleValueChange(item.key, index, e.target.value)} placeholder={item.hint} error={item.required && !value.trim()} helperText={item.required && !value.trim() ? '此字段不能为空' : ''} />
                        <IconButton size="small" onClick={() => removeValue(item.key, index)} color="error"><DeleteIcon /></IconButton>
                      </Box>
                    ))}
                  </Stack>
                ) : item.type === 'switch' ? (
                  <FormControlLabel control={<Switch checked={(configValues[item.key] || [''])[0] === 'yes'} onChange={(e) => handleValueChange(item.key, 0, e.target.checked ? 'yes' : 'no')} />} label={(configValues[item.key] || [''])[0] === 'yes' ? '是' : '否'} />
                ) : item.type === 'select' ? (
                  <TextField fullWidth size="small" select value={(configValues[item.key] || [''])[0] || ''} onChange={(e) => handleValueChange(item.key, 0, e.target.value)} SelectProps={{ native: true }}>
                    {item.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </TextField>
                ) : (
                  <TextField fullWidth size="small" type={item.type} value={(configValues[item.key] || [''])[0] || ''} onChange={(e) => handleValueChange(item.key, 0, e.target.value)} placeholder={item.hint} error={item.required && !(configValues[item.key] || [''])[0]?.trim()} helperText={item.required && !(configValues[item.key] || [''])[0]?.trim() ? '此字段不能为空' : ''} />
                )}
                {item.hint && <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>{item.hint}</Typography>}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Snackbar open={!!message} autoHideDuration={5000} onClose={() => setMessage(null)}>
        <Alert severity={message?.type || 'info'} onClose={() => setMessage(null)}>{message?.text}</Alert>
      </Snackbar>
    </Stack>
  );
}
