export const extensionName = 'avatar-clockify';
export const clockifyBaseURL = 'https://api.clockify.me/api/v1';

export enum Cmd {
  START = 'avatar-clockify.start',
  SET_APIKEY = 'avatar-clockify.apiKey.set',
  QUICKCREATE_PROJECT = 'avatar-clockify.project.quickcreate',
  TRACKING_START = 'avatar-clockify.tracking.start',
  TRACKING_STOP = 'avatar-clockify.tracking.stop',
}
