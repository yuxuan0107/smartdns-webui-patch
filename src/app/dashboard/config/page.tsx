"use client";

import * as React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Snackbar, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { smartdnsServer } from '@/lib/backend/server';

export default function Page(): React.JSX.Element {
  const { t } = useTranslation();
  const [configContent, setConfigContent] = React.useState('');
  const [configPath, setConfigPath] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadConfig = React.useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/config/file', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setConfigContent(data.content || '');
        setConfigPath(data.path || '');
      } else {
        setMessage({ text: 'Failed to load config', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Failed to load config', type: 'error' });
    }
    setLoading(false);
  }, []);

  const saveConfig = async (): Promise<void> => {
    setSaving(true);
    try {
      const response = await fetch('/api/config/file', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: configContent }),
        credentials: 'include'
      });
      if (response.ok) {
        setMessage({ text: 'Config saved successfully', type: 'success' });
      } else {
        setMessage({ text: 'Failed to save config', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Failed to save config', type: 'error' });
    }
    setSaving(false);
  };

  const restartService = async (): Promise<void> => {
    if (!confirm('Restart SmartDNS service?')) return;
    try {
      const result = await smartdnsServer.RestartServer();
      if (result.error) {
        setMessage({ text: 'Failed to restart service', type: 'error' });
      } else {
        setMessage({ text: 'Service restarted successfully', type: 'success' });
      }
    } catch {
      setMessage({ text: 'Failed to restart service', type: 'error' });
    }
  };

  React.useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{t('Raw Config')}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" color="primary" onClick={loadConfig} disabled={loading}>
            {loading ? 'Loading...' : 'Reload'}
          </Button>
          <Button variant="contained" color="success" onClick={saveConfig} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
          <Button variant="contained" color="warning" onClick={restartService}>
            Restart
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Config Path: {configPath}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={30}
            value={configContent}
            onChange={(e) => setConfigContent(e.target.value)}
            disabled={loading}
            sx={{ fontFamily: 'monospace' }}
          />
        </CardContent>
      </Card>

      <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage(null)}>
        <Alert severity={message?.type || 'info'} onClose={() => setMessage(null)}>
          {message?.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
