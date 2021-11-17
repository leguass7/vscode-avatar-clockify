export interface ITracking {
  id: string;
  start: string;
}

export interface ITrackingData {
  id?: string;
  /** format `2018-06-12T13:48:14.000Z` */
  start?: string;
  description?: string;
  projectId?: string;
  taskId?: string;
  billable?: boolean;
  tagIds?: string[];
  /** format `2018-06-12T13:48:14.000Z` */
  end?: string;
}

export interface IResponseTimeEntry {
  billable: boolean;
  description: string;
  id: string;
  isLocked: boolean;
  projectId: string;
  tagIds: string[];
  taskId: string;
  timeInterval: {
    duration: string;
    end: string;
    start: string;
  };
  userId: string;
  workspaceId: string;
}
