// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface status {
  name: string;
  color: string;
}

export interface TimerType {
  pause: Function;
  resume: Function;
}
export type WhooshOptions = {
  statuses?: Array<status>;
};
export type CardContent = {
  id?: number;
  statuses?: Array<status>;
  status?: string;
  duration?: number;
  title?: string;
  message?: string;
  size?: {
    width: number;
    height: number;
  };
};
