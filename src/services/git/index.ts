import { Extension, extensions, window } from 'vscode';

import { API, GitExtension } from './git';

export async function getBuiltInGitApi(): Promise<API | undefined> {
  try {
    const extension = extensions.getExtension('vscode.git') as Extension<GitExtension>;
    if (extension !== undefined) {
      const gitExtension = extension.isActive ? extension.exports : await extension.activate();
      return gitExtension.getAPI(1);
    }
  } catch {
    console.log('getBuiltInGitApi erro ao carregar "vscode.git"');
    window.showErrorMessage('getBuiltInGitApi erro ao carregar "vscode.git"');
  }

  return undefined;
}

export async function getBranchName(): Promise<string> {
  const gitExtension = await getBuiltInGitApi();
  if (gitExtension?.repositories.length) {
    const repo = gitExtension?.repositories[0];
    if (repo) {
      const branchName = repo.state.HEAD?.name;
      return branchName || undefined;
    }
  }
  return undefined;
}
