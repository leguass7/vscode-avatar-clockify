import { join } from 'path';
import { commands, ExtensionContext } from 'vscode';

import { ITracking } from '../services/ApiClockify/timeEntries.dto';
import { extensionName } from './constants';

export enum ContextValue {
  WorkspaceSelected = 'workspaces:selected',
  //   ClientSelected = 'clients:selected',
  //   ProjectSelected = 'projects:selected',
}

export interface GlobalTracking {
  update: (value: ITracking) => void;
  get: () => ITracking;
  clear: () => void;
}

const key = 'tracking:object';

class ContextManager {
  public globalTracking: GlobalTracking;
  constructor(private context?: ExtensionContext) {
    if (context) {
      this.setContextObject(context);
    }

    this.globalTracking = {
      update: (value: any) => this.getContext()?.globalState.update(key, value),
      get: (): ITracking => this.getContext()?.globalState.get<ITracking>(key),
      clear: () => this.getContext()?.globalState.update(key, null),
    };
    return this;
  }

  setContextObject(context: ExtensionContext) {
    this.context = context;
  }

  setContext(key: ContextValue, value: any): void {
    commands.executeCommand('setContext', `${extensionName}:${key}`, value);
  }

  getContext(): ExtensionContext {
    return this.context;
  }

  getFilePath(...filenameParts: string[]): string {
    return this.getContext()?.asAbsolutePath(join(...filenameParts));
  }
}

export default new ContextManager();
