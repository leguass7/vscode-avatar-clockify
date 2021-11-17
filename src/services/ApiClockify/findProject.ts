import { apiClockify } from '.';
import ContextManager from '../../config/ContextManager';

export interface ProjectOption {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
}

export interface WorkspaceOption {
  id: string;
  name: string;
}

export async function findFirstProject(projectName: string): Promise<ProjectOption | undefined> {
  const workspaces = await apiClockify.getWorkspaces();
  if (workspaces && workspaces.length) {
    ContextManager.getContext()?.globalState.update(
      'workspaces',
      workspaces.map(ws => ({ id: ws.id, name: ws.name })),
    );
  }

  const getAllProjects = async (wsId: string) => {
    const projects = await apiClockify.getProjects(wsId);
    return projects.map(({ id, name, workspaceId }) => ({ id, name, workspaceId }));
  };

  const [project] = await Promise.all(
    workspaces
      .map(async workspace => {
        const p = await getAllProjects(workspace.id);
        const found = p.find(f => f.name === projectName);
        return found as ProjectOption;
      })
      .filter(f => !!f),
  );

  return project;
}

export async function checkTracking(workspaceId: string, trackingId: string): Promise<boolean> {
  if (workspaceId && trackingId) {
    const entry = await apiClockify.getTimeEntry(workspaceId, trackingId);
    if (entry) {
      return !entry?.timeInterval?.end;
    }
  }
  return false;
}
