import { ExtensionContext } from 'vscode';

import { registerCommands } from './commands';
import { statusBar } from './components/statusBar';
import { configure } from './config/Configure';
import ContextManager from './config/ContextManager';
// import { askForAPIKey } from './messages/askForAPIKey';
import { apiClockify } from './services/ApiClockify';

export function activate(context: ExtensionContext) {
  console.log('AVATAR CLOCKIFY STARTED');
  ContextManager.setContextObject(context);
  registerCommands(context);

  const apiKey = configure.get<string>('apiKey');
  if (!apiKey) {
    console.log('AVATAR CLOCKIFY NO APIKEY');
    // askForAPIKey();
  } else {
    apiClockify.authenticate(apiKey);
  }

  statusBar.init(context);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
