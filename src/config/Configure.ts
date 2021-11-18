import { workspace, WorkspaceConfiguration } from 'vscode';

import { extensionName } from './constants';

export type AvatarKey = keyof AvatarConfiguration;

class Configure {
  public config: WorkspaceConfiguration;

  constructor(private configName: string) {
    this.config = workspace.getConfiguration(this.configName);
  }

  update(key: AvatarKey, value: any) {
    this.config.update(`${this.configName}.${key}`, value, true);
    // implementar: verificar possibilidade de gravar no arquivo de configuração
  }

  get<T>(key: AvatarKey): T {
    return this.config.get(key) as T;
  }

  delete(key: AvatarKey) {
    this.config.update(key, undefined);
  }
}

export const configure = new Configure(extensionName);

export interface AvatarConfiguration {
  apiKey: string;
  billable: boolean;
}
