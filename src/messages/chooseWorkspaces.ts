import { window } from 'vscode';

import ContextManager from '../config/ContextManager';
import { apiClockify } from '../services/ApiClockify';
import { WorkspaceOption } from '../services/ApiClockify/findProject';

export async function chooseWorkspaces(): Promise<WorkspaceOption> {
  const findOne = (wsList: WorkspaceOption[], findName: string) => wsList.find(f => f.name === findName);

  const contextWs = ContextManager.globalWorkspaces.get();
  if (contextWs?.length === 1) {
    return findOne(contextWs, contextWs[0].name);
  }

  if (contextWs?.length) {
    const workspaceName = await window.showQuickPick([...contextWs.map(ws => ws.name)], { title: 'Select workspace' });
    return findOne(contextWs, workspaceName);
  }

  const workspaces = await apiClockify.getWorkspaces();
  const name = await window.showQuickPick([...workspaces.map(ws => ws.name)]);
  return findOne(workspaces, name);
}
