import { ReactorState } from "./reactor-state";

export interface IReactor {
    name: number;
    temperature: number;
    state: ReactorState
}
