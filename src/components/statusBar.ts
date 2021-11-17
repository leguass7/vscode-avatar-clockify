import { commands, ExtensionContext, StatusBarAlignment, StatusBarItem, window } from 'vscode';

import { Cmd } from '../config/constants';
import ContextManager from '../config/ContextManager';
import { getProjectName } from '../helpers';
import { checkTracking, findFirstProject, ProjectOption } from '../services/ApiClockify/findProject';
import { getBranchName } from '../services/git';

export class StatusBarManager {
  private checking: number;
  private started: boolean;
  private statusBarItem: StatusBarItem;
  private context?: ExtensionContext;
  private tooltip: string[] = [''];

  public project?: ProjectOption;
  public projectName?: string;
  public branchName?: string;

  constructor() {
    this.checking = 0;
    this.started = false;
    this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 100);
  }

  private isTrackerReady() {
    return !!(this?.projectName && this?.branchName);
  }

  private trackingChecker() {
    const tracking = ContextManager.globalTracking.get();
    const check = () => {
      checkTracking(this.getProject()?.workspaceId, tracking.id).then(isTracking => {
        this.checking = 0;
        if (!isTracking && tracking.id) {
          commands.executeCommand(Cmd.TRACKING_START);
        }
        console.log('trackingChecker check isTracking', isTracking);
      });
    };

    if (tracking && tracking?.id && this.checking > 30) {
      check();
    }
    this.checking += 1;
  }

  private updateTooltip() {
    const tracking = ContextManager.globalTracking.get();
    this.tooltip = [
      this.project ? '✔' : '﹢',
      this?.projectName ? `${this.projectName}:` : '',
      this?.branchName || '',
      tracking?.id ? ` • Tracking...` : '',
    ];
    this.statusBarItem.tooltip = this.tooltip.join(' ');
    if (tracking && tracking?.id) {
      this.statusBarItem.command = Cmd.TRACKING_STOP;
    } else if (this.isTrackerReady()) {
      this.statusBarItem.command = this.project ? Cmd.TRACKING_START : Cmd.QUICKCREATE_PROJECT;
    }
  }

  private async updateProjectClockify() {
    if (!this.project && this.projectName) {
      this.project = await findFirstProject(this.projectName);
      if (this.project) {
        this.project.description = this.branchName || 'no branch name';
      }
      this.updateTooltip();
    }
  }

  private updateProjectName() {
    if (!this.projectName) {
      this.projectName = getProjectName();
      this.updateTooltip();
    }
  }

  getProject(): ProjectOption {
    return {
      ...this.project,
      description: this.branchName,
    };
  }

  setProject(project: ProjectOption) {
    this.project = project;
    if (this.project) {
      this.project.description = this.branchName || 'no branch name';
    }
    this.updateTooltip();
  }

  async updateBranchName() {
    if (!this.branchName) {
      this.branchName = await getBranchName();
      this.updateTooltip();
    }
  }

  init(context: ExtensionContext) {
    if (!this.started) {
      this.context = context;
      this.statusBarItem.color = '#AAAAAA';
      this.statusBarItem.text = '$(clock) starting';
      this.statusBarItem.show();

      this.updateProjectName();
      this.updateBranchName().then(() => this.updateProjectClockify());
      setInterval(() => {
        this.updateStatusBarItem();
      }, 1000 * 5);
    }
    return this;
  }

  async updateStatusBarItem() {
    const tracking = ContextManager.globalTracking.get();
    const isTracking = !!(tracking && tracking.id);
    if (!isTracking) {
      this.updateProjectName();
      this.updateBranchName().then(() => this.updateProjectClockify());
    } else {
      this.trackingChecker();
    }

    const color = isTracking ? '#FFFFFF' : '#AAAAAA';
    this.statusBarItem.color = color;
    this.statusBarItem.text = `$(clock) Avatar`;
    this.updateTooltip();
  }
}

export const statusBar = new StatusBarManager();
