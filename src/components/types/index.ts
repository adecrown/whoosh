// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface status {
  name: string;
  color: string;
}

export interface expandData {
  data: string | object;
  height: number;
  isComponent?: boolean;
  noBackground?: boolean;
  buttonColor?: string;
  hideHeader?: boolean;
  headerStyle?: object;
}

export interface expandStyle {
  width: string;
  height: string;
  "background-color": string;
}

export interface TimerType {
  pause: Function;
  resume: Function;
}
export type SpaceController = {
  id: number;
  space: number
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
  expandable?: expandData;
  onClose?: Function;
};
