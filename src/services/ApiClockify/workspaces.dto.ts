import { HourlyRateDto, MembershipDto } from './types';

export enum AutomaticLock_Period {
  Days = 'DAYS',
  Weeks = 'WEEKS',
  Months = 'MONTHS',
}

export enum AutomaticLock_Type {
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  OlderThan = 'OLDER_THAN',
}

export enum AutomaticLock_Day {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
}

export enum WorkspaceSettings_AdminOnlyPages {
  Project = 'PROJECT',
  Team = 'TEAM',
  Reports = 'REPORTS',
}

export interface Round {
  minutes: string;
  round: string;
}

export interface AutomaticLockDto {
  changeDay: AutomaticLock_Day;
  dayOfMonth: number;
  firstDay: AutomaticLock_Day;
  olderThanPeriod: AutomaticLock_Period;
  olderThanValue: number;
  type: AutomaticLock_Type;
}

export interface WorkspaceSettingsDto {
  adminOnlyPages: WorkspaceSettings_AdminOnlyPages[];
  automaticLock: AutomaticLockDto;
  canSeeTimeSheet: boolean;
  defaultBillableProjects: boolean;
  forceDescription: boolean;
  forceProjects: boolean;
  forceTags: boolean;
  forceTasks: boolean;
  lockTimeEntries: string;
  onlyAdminsCreateProject: boolean;
  onlyAdminsCreateTag: boolean;
  onlyAdminsSeeAllTimeEntries: boolean;
  onlyAdminsSeeBillableRates: boolean;
  onlyAdminsSeeDashboard: boolean;
  onlyAdminsSeePublicProjectsEntries: boolean;
  projectFavorites: boolean;
  projectGroupingLabel: string;
  projectPickerSpecialFilter: boolean;
  round: Round;
  timeRoundingInReports: boolean;
  trackTimeDownToSecond: boolean;
}

export interface WorkspaceDto {
  hourlyRate: HourlyRateDto;
  id: string;
  imageUrl: string;
  memberships: MembershipDto[];
  name: string;
  workspaceSettings: WorkspaceSettingsDto;
}
