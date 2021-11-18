import { window } from 'vscode';

import { statusBar } from '../components/statusBar';
import { configure } from '../config/Configure';

export async function setBillable() {
  const billable = (await window.showQuickPick(['Yes', 'No'], { title: 'The project is billable?' })) || 'Yes';

  configure.update('billable', billable);
  statusBar.updateStatusBarItem();
}
