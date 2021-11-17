import { window } from 'vscode';

import { statusBar } from '../components/statusBar';
import { chooseWorkspaces } from '../messages/chooseWorkspaces';
import { apiClockify } from '../services/ApiClockify';
import { CreateProjectDto, ProjectDto } from '../services/ApiClockify/projects.dto';

export async function quickCreateProject(): Promise<ProjectDto> {
  const selectedWorkspace = await chooseWorkspaces();
  if (!selectedWorkspace) {
    window.showWarningMessage('No workspace selected');
    return null;
  }

  const projectData: CreateProjectDto = {
    billable: true,
    name: statusBar.projectName,
    isPublic: false,
    public: false,
    note: `Auto created by vscode-avatar-clockify`,
  };
  const project = await apiClockify.createProject(selectedWorkspace.id, projectData);
  if (!project) {
    window.showErrorMessage('Create a new project Error');
    return null;
  }

  statusBar.setProject({
    id: project.id,
    name: project.name,
    workspaceId: project.workspaceId,
  });
  window.showInformationMessage('Successfully created project');
  return project;
}
