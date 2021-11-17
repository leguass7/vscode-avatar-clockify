import { join } from 'path';
import { commands, ExtensionContext } from 'vscode';

import { WorkspaceOption } from '../services/ApiClockify/findProject';
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

export interface GlobalWorkspaces {
  update: (value: WorkspaceOption[]) => void;
  get: () => WorkspaceOption[];
  clear: () => void;
}

const keyTracking = 'tracking:object';
const keyWorkspaces = 'workspaces:array';

class ContextManager {
  public globalTracking: GlobalTracking;
  public globalWorkspaces: GlobalWorkspaces;
  constructor(private context?: ExtensionContext) {
    if (context) {
      this.setContextObject(context);
    }

    this.globalTracking = {
      update: (value: any) => this.getContext()?.globalState.update(keyTracking, value),
      get: (): ITracking => this.getContext()?.globalState.get<ITracking>(keyTracking),
      clear: () => this.getContext()?.globalState.update(keyTracking, null),
    };

    this.globalWorkspaces = {
      update: (value: any) => this.getContext()?.globalState.update(keyWorkspaces, value),
      get: (): WorkspaceOption[] => this.getContext()?.globalState.get<WorkspaceOption[]>(keyWorkspaces),
      clear: () => this.getContext()?.globalState.update(keyWorkspaces, []),
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
