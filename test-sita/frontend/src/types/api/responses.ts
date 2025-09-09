import { Player } from "../general/player";

export interface ListPlayers {
    data: Player[]
    message: "success",
    totalCount: number;
}

export interface SearchPlayers {
    data: Player[]
    message: "success",
    totalCount: number;
}

export interface ListLeagues {
    data: string[],
    message: ""
}

export interface ListNationalities {
    data: string[],
    message: ""
}

export interface ListPositions {
    data: {
        name: string,
        desc: string
    }[],
    message: ""
}

export interface ListTeam {
    data: {
        entireTeam: Player[],
        gk: Player[],
        cb: Player[],
        lb: Player[],
        rb: Player[],
        cm: Player[],
        lm: Player[],
        rm: Player[],
        st: Player[],

    },
    message: "success"
}