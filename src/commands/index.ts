import { commands, ExtensionContext } from 'vscode';

import { Cmd } from '../config/constants';
import { quickCreateProject } from './quickCreateProject';
import { setApiKey } from './setApiKey';
import { setBillable } from './setBillable';
import { start } from './start';
import { trackingStart, trackingStop } from './tracking';

type CommandItemType = [string, () => void];

export const commandList: CommandItemType[] = [
  [Cmd.START, start],
  [Cmd.SET_APIKEY, setApiKey],
  [Cmd.QUICKCREATE_PROJECT, quickCreateProject],
  [Cmd.TRACKING_START, trackingStart],
  [Cmd.TRACKING_STOP, trackingStop],
  [Cmd.SET_BILLABLE, setBillable],
  // ...
];

export function registerCommands(context: ExtensionContext) {
  const disposebles = commandList.map(([command, action]) => commands.registerCommand(command, action));
  context.subscriptions.push(...disposebles);
}
