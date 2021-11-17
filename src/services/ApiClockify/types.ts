export enum Membership_MembershipStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Declined = 'DECLINED',
  Inactive = 'INACTIVE',
}

export interface HourlyRateDto {
  amount: number;
  currency: string;
}

export interface MembershipDto {
  hourlyRate: HourlyRateDto;
  membershipStatus: Membership_MembershipStatus;
  membershipType: string;
  targetId: string;
  userId: string;
}
