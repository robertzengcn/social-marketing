export interface UninstallOptions {
  // Core application components
  removeApplication: boolean;
  removeShortcuts: boolean;
  removeRegistryEntries: boolean;
  
  // User data and settings
  removeUserData: boolean;
  removeCache: boolean;
  removeLogs: boolean;
  removeSettings: boolean;
  
  // Platform-specific options
  removeStartMenuEntries?: boolean; // Windows
  removeDesktopShortcuts?: boolean;
  removeSystemServices?: boolean;
  
  // Advanced options
  removeDatabaseFiles: boolean;
  removeTemporaryFiles: boolean;
  removeBackupFiles: boolean;
  
  // Confirmation options
  skipConfirmation: boolean;
  forceUninstall: boolean;
}

export interface UninstallItem {
  id: string;
  name: string;
  description: string;
  category: 'application' | 'user-data' | 'system' | 'cache' | 'advanced';
  size: number; // in bytes
  path: string;
  isRequired: boolean;
  isSelected: boolean;
  canBeRemoved: boolean;
}

export interface UninstallCategory {
  id: string;
  name: string;
  description: string;
  items: UninstallItem[];
  totalSize: number;
  isExpanded: boolean;
}

export interface UninstallSummary {
  totalItems: number;
  selectedItems: number;
  totalSize: number;
  estimatedTime: number; // in seconds
  categories: UninstallCategory[];
} 