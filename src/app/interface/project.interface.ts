export interface cartExtraItem {
    name: string,
    value: boolean,
    extraPrice: number
}

export interface deactivateInterface{
    canExit: () => boolean;
}