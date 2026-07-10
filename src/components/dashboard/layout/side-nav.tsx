'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { Logo } from '@/components/core/logo';
import { navItems } from './config';
import { navIcons } from './nav-icons';
import { useTranslation } from 'react-i18next';

type OnActiveItemType = (item: NavItemConfig) => void;

export interface SideNavProps {
  onActiveItem?: OnActiveItemType;
}

export function SideNav({ onActiveItem: _onActiveItem }: SideNavProps): React.JSX.Element {
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--mui-palette-toolbar-background)',
        '--SideNav-color': 'var(--mui-palette-toolbar-color)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        overflowY: 'auto',
      }}
    >
      <Stack spacing={2} sx={{ p: 3, alignItems: 'center' }} direction="row">
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          <Logo color="light" height={64} width={64} />
        </Box>
        <Typography variant="h5">SmartDNS</Typography>
      </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-divider)' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        <List component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {navItems.map((item) => (
            <NavItem 
              key={item.key} 
              item={item} 
              pathname={pathname} 
              openItems={openItems}
              onToggle={handleToggle}
            />
          ))}
        </List>
      </Box>
      <Divider sx={{ borderColor: 'var(--mui-palette-divider)' }} />
    </Box>
  );
}

interface NavItemProps {
  item: NavItemConfig;
  pathname: string;
  openItems: Record<string, boolean>;
  onToggle: (key: string) => void;
}

function NavItem({ item, pathname, openItems, onToggle }: NavItemProps): React.JSX.Element {
  const { t } = useTranslation();
  const hasItems = item.items && item.items.length > 0;
  const isOpen = openItems[item.key] || false;
  const Icon = item.icon ? navIcons[item.icon] : null;

  if (hasItems) {
    return (
      <>
        <ListItemButton onClick={() => onToggle(item.key)}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            {Icon ? <Icon /> : null}
          </ListItemIcon>
          <ListItemText primary={t(item.title || '')} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.items?.map((child) => (
              <NavItem 
                key={child.key} 
                item={child} 
                pathname={pathname}
                openItems={openItems}
                onToggle={onToggle}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton
      component={RouterLink}
      href={item.href || '#'}
      selected={pathname === item.href}
      sx={{ pl: 4 }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        {Icon ? <Icon /> : null}
      </ListItemIcon>
      <ListItemText primary={t(item.title || '')} />
    </ListItemButton>
  );
}
