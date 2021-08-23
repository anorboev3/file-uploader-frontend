export interface FileInfo {
    id: number;
    fileName: string;
    fileSize: number;
    uploadDate: Date;
}

export interface FileInfoList {
    fileExtension: string;
    files: FileInfo[]
}

export interface Settings {
    fileExtensions: string;
    fileSizeInBytes: number;
    fileSizeInMegaBytes: number;
}

export interface SettingsForUpdate{
    fileExtensions: string;
    fileSize: number;
}