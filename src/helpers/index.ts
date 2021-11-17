import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { workspace } from 'vscode';

export function readJson(path: string): any {
  const file = readFileSync(require.resolve(path), 'utf-8');
  if (file) {
    try {
      const fileObject = JSON.parse(file);
      return fileObject;
    } catch (error) {
      return {};
    }
  }
  return {};
}

export function getProjectName() {
  const folders = workspace?.workspaceFolders || [];
  const [name] = folders.map(folder => {
    const packageFile = join(folder.uri.fsPath, 'package.json');
    if (existsSync(packageFile)) {
      return readJson(packageFile)?.name;
    }
    return folder?.name;
  });
  return name;
}
