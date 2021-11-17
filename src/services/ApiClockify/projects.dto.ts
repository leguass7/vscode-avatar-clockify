import { HourlyRateDto, MembershipDto } from './types';

export interface ProjectDto {
  id: string;
  name: string;
  hourlyRate: HourlyRateDto;
  clientId: string;
  workspaceId: string;
  billable: boolean;
  memberships: MembershipDto[];
  color: string;
  //   estimate: {
  //     estimate: 'PT0S';
  //     type: 'AUTO';
  //   };
  archived: boolean;
  duration: 'PT0S';
  clientName: string;
  note: string;
  template: boolean;
  public: boolean;
  costRate: number;
  budgetEstimate: null;
  //   timeEstimate: {
  //     estimate: 'PT0S';
  //     type: 'AUTO';
  //     resetOption: null;
  //     active: boolean;
  //   };
}

export interface CreateProjectDto {
  name: string;
  // OPTIONAL
  clientId?: string;
  isPublic: boolean;
  color?: string;
  note?: string;
  billable: boolean;
  public: boolean;
}
