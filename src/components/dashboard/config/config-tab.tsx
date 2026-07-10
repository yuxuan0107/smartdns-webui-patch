"use client";

import * as React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Snackbar, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { smartdnsServer } from '@/lib/backend/server';

export default function ConfigTab(): React.JSX.Element {
  const { t } = useTranslation();
  const [configContent, setConfigContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [configPath, setConfigPath] = React.useState('');

  const loadConfig = async (): Promise<void> => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/config/file', {
        headers: { 'Authorization': `Bearer ${token}` }
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
  };

  const saveConfig = async (): Promise<void> => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/config/file', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: configContent })
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
  }, []);

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {t('Configuration File')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Config Path: {configPath}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={25}
            value={configContent}
            onChange={(e) => setConfigContent(e.target.value)}
            disabled={loading}
            sx={{ fontFamily: 'monospace', mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={loadConfig}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Reload Config'}
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={saveConfig}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Config'}
            </Button>
            <Button 
              variant="contained" 
              color="warning" 
              onClick={restartService}
            >
              Restart Service
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar 
        open={!!message} 
        autoHideDuration={6000} 
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={message?.type || 'info'} onClose={() => setMessage(null)}>
          {message?.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
