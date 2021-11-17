import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { clockifyBaseURL } from '../../config/constants';
import { ProjectOption } from './findProject';
import { CreateProjectDto, ProjectDto } from './projects.dto';
import { IResponseTimeEntry, ITrackingData } from './timeEntries.dto';
import { WorkspaceDto } from './workspaces.dto';

export class ApiClockify {
  public readonly Api: AxiosInstance;
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
    this.Api = axios.create({ baseURL: clockifyBaseURL });
    return this.configureAxios();
  }

  private configureAxios() {
    this.Api.interceptors.response.use(
      (res: AxiosResponse) => res,
      (error?: AxiosError) => {
        const response = error && error?.response;
        const data = response && response.data ? response.data : { error: true, message: 'timeout' };
        return Promise.resolve({ data });
      },
    );
    return this;
  }

  private isReady() {
    return !!this.apiKey;
  }

  public authenticate(apiKey: string) {
    this.apiKey = apiKey;
    this.Api.defaults.headers.common['X-Api-Key'] = apiKey;
    return this;
  }

  async httpGet<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T | null> {
    if (this.isReady()) {
      const req: AxiosRequestConfig = { ...config, headers: { ['X-Api-Key']: this.apiKey || '' } };
      const response = await this.Api.get(url, req);
      return response && response.data;
    }
    return null;
  }

  async httpPost<T = unknown>(url: string, payload: any, config?: AxiosRequestConfig): Promise<T | null> {
    if (this.isReady()) {
      const req: AxiosRequestConfig = { ...config, headers: { ['X-Api-Key']: this.apiKey || '' } };
      const response = await this.Api.post(url, payload, req);
      return response && response.data;
    }
    return null;
  }

  async httpPut<T = unknown>(url: string, payload: any, config?: AxiosRequestConfig): Promise<T | null> {
    if (this.isReady()) {
      const req: AxiosRequestConfig = { ...config, headers: { ['X-Api-Key']: this.apiKey || '' } };
      const response = await this.Api.put(url, payload, req);
      return response && response.data;
    }
    return null;
  }

  async getWorkspaces(): Promise<WorkspaceDto[]> {
    const response = await this.httpGet<WorkspaceDto[]>(`workspaces`);
    return response || [];
  }

  async getProjects(workspaceId: string): Promise<ProjectDto[]> {
    const response = await this.httpGet<ProjectDto[]>(`workspaces/${workspaceId}/projects`);
    return response || [];
  }

  async createProject(workspaceId: string, projectData: CreateProjectDto): Promise<ProjectDto> {
    const response = await this.httpPost<ProjectDto>(`workspaces/${workspaceId}/projects`, projectData);
    return response;
  }

  async startTracking(project: ProjectOption, trackingData: ITrackingData = {}): Promise<IResponseTimeEntry> {
    const tracking = {
      ...trackingData,
      start: new Date().toISOString(),
      billable: true,
      description: `${project.description}`,
      projectId: project.id,
    };
    const response = await this.httpPost<IResponseTimeEntry>(
      `workspaces/${project.workspaceId}/time-entries`,
      tracking,
    );
    return response;
  }

  async stopTracking(workspaceId: string, trackingData: ITrackingData = {}): Promise<IResponseTimeEntry> {
    if (workspaceId && trackingData.id && trackingData.start) {
      const tracking = { ...trackingData, end: new Date().toISOString() };
      const response = await this.httpPut<IResponseTimeEntry>(
        `workspaces/${workspaceId}/time-entries/${trackingData.id}`,
        tracking,
      );
      return response;
    }
    return null;
  }

  async getTimeEntry(workspaceId: string, entryId: string): Promise<IResponseTimeEntry> {
    const response = await this.httpGet<IResponseTimeEntry>(`workspaces/${workspaceId}/time-entries/${entryId}`);
    return response;
  }
}

export const apiClockify = new ApiClockify();
