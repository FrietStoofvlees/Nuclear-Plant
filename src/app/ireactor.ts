import { ReactorState } from "./reactor-state";

export interface IReactor {
    name: number
    temperature: number
    state: ReactorState
}

export interface IPowerline {
    reactors: IReactor[]
}