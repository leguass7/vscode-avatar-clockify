import { window } from 'vscode';

import { statusBar } from '../components/statusBar';
import ContextManager from '../config/ContextManager';
import { apiClockify } from '../services/ApiClockify';

export async function trackingStart() {
  const project = statusBar.getProject();
  const tracking = await apiClockify.startTracking(project);
  if (tracking) {
    ContextManager.globalTracking.update({
      id: tracking.id,
      start: tracking.timeInterval.start,
    });

    statusBar.updateStatusBarItem();
    window.showInformationMessage('tracker started');
    return tracking;
  }
  window.showWarningMessage('no project found');
  return null;
}

export async function trackingStop() {
  const currentTracking = ContextManager.globalTracking.get();
  const { workspaceId, name, id, description } = statusBar.getProject();

  if (currentTracking && currentTracking.id && workspaceId) {
    const tracking = await apiClockify.stopTracking(`${workspaceId}`, {
      id: currentTracking.id,
      billable: true,
      description: description || name,
      projectId: id,
      start: currentTracking.start,
    });

    if (tracking) {
      ContextManager.globalTracking.clear();
      statusBar.updateStatusBarItem();
    }

    window.showInformationMessage('tracker stopped');
    return tracking;
  }
  window.showWarningMessage('no tracker found');
  return null;
}
