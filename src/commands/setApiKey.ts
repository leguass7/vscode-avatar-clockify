import { window } from 'vscode';

import { configure } from '../config/Configure';
import { apiClockify } from '../services/ApiClockify';

export async function setApiKey() {
  const apiKey = await window
    .showInputBox({
      ignoreFocusOut: true,
      placeHolder: 'Enter your API key',
      prompt: 'Enter your API key',
    })
    .then(apiKey => {
      if (apiKey === undefined) {
        window.showErrorMessage('No API key entered');
        return null;
        // throw new Error('No API key entered');
      }
      return apiKey;
    });

  if (apiKey) {
    console.log('apiKey', apiKey);
    configure.update('apiKey', apiKey);
    // Authenticate
    apiClockify.authenticate(apiKey);
  }

  //   const workspacesProvider = providerStore.get<WorkspacesProvider>('workspaces');
  //   workspacesProvider.refresh();
}
