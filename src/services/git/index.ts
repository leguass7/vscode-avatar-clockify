import { Extension, extensions } from 'vscode';

import { API, GitExtension } from './git';

export async function getBuiltInGitApi(): Promise<API | undefined> {
  try {
    const extension = extensions.getExtension('vscode.git') as Extension<GitExtension>;
    if (extension !== undefined) {
      const gitExtension = extension.isActive ? extension.exports : await extension.activate();
      console.log('getBuiltInGitApi gitExtension', gitExtension);
      return gitExtension.getAPI(1);
    }
  } catch {
    console.log('getBuiltInGitApi erro ao carregar "vscode.git"');
  }

  return undefined;
}

export async function getBranchName(): Promise<string> {
  console.log('INIT getBranchName');
  const gitExtension = await getBuiltInGitApi();
  console.log(gitExtension?.state);
  console.log('INIT gitExtension', gitExtension?.repositories?.length);
  if (gitExtension?.repositories.length) {
    const repo = gitExtension?.repositories[0];
    if (repo) {
      const branchName = repo.state.HEAD?.name;
      return branchName || undefined;
    }
  }
  return undefined;
}
