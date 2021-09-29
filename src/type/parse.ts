export interface lineInfo {
    readonly text: string,
    readonly user: string,
    readonly time: string,
}

export interface MsgInfo extends lineInfo {
    readonly children: string[],
}