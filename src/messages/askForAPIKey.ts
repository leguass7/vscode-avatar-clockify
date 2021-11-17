import { window, commands } from 'vscode';

import { Cmd } from '../config/constants';

export function askForAPIKey() {
  window.showInformationMessage('Clockify API key not configured. Configure?', 'Yes', 'No').then(response => {
    if (response === 'Yes') {
      commands.executeCommand(Cmd.SET_APIKEY);
    }
  });
}
