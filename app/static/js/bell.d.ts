declare const defaultBrandImage = "https://raw.githubusercontent.com/Simple2B/BeamSuntory/develop/app/static/img/no_picture_default.png";
declare function getNotification(): Promise<void>;
declare function limitNotification(): Promise<void>;
declare function getTimeFormat(created_at: string): string;
