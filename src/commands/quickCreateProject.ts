import { commands, window } from 'vscode';

import { statusBar } from '../components/statusBar';
import { configure } from '../config/Configure';
import { Cmd } from '../config/constants';
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
    billable: !!configure.get('billable'),
    name: statusBar.projectName,
    isPublic: false,
    public: false,
    note: `Auto created by vscode-avatar-clockify`,
  };
  // implementar: verificar se projeto já existe antes

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

  statusBar.updateStatusBarItem().then(() => {
    commands.executeCommand(Cmd.TRACKING_START);
  });

  return project;
}
