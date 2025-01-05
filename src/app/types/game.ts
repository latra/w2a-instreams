export enum PickStatusEnum {
  not_started = "not_started",
  on_going = "ongoing",
  finished = "finished"
}

export enum PickPhasesEnum {
  ban_blue_1 = 0,
  ban_red_1 = 1,
  ban_blue_2 = 2,
  ban_red_2 = 3,
  ban_blue_3 = 4,
  ban_red_3 = 5,
  pick_blue_1 = 6,
  pick_red_1 = 7,
  pick_red_2 = 8,
  pick_blue_2 = 9,
  pick_blue_3 = 10,
  pick_red_3 = 11,
  ban_red_4 = 12,
  ban_blue_4 = 13,
  ban_red_5 = 14,
  ban_blue_5 = 15,
  pick_red_4 = 16,
  pick_blue_4 = 17,
  pick_blue_5 = 18,
  pick_red_5 = 19,
  ended = 20
}

export const isBlueTurn = (turn: PickPhasesEnum): boolean => {
  return [
    PickPhasesEnum.ban_blue_1,
    PickPhasesEnum.ban_blue_2,
    PickPhasesEnum.ban_blue_3,
    PickPhasesEnum.ban_blue_4,
    PickPhasesEnum.ban_blue_5,
    PickPhasesEnum.pick_blue_1,
    PickPhasesEnum.pick_blue_2,
    PickPhasesEnum.pick_blue_3,
    PickPhasesEnum.pick_blue_4,
    PickPhasesEnum.pick_blue_5
  ].includes(turn);
};

export const isRedTurn = (turn: PickPhasesEnum): boolean => {
  return [
    PickPhasesEnum.ban_red_1,
    PickPhasesEnum.ban_red_2,
    PickPhasesEnum.ban_red_3,
    PickPhasesEnum.ban_red_4,
    PickPhasesEnum.ban_red_5,
    PickPhasesEnum.pick_red_1,
    PickPhasesEnum.pick_red_2,
    PickPhasesEnum.pick_red_3,
    PickPhasesEnum.pick_red_4,
    PickPhasesEnum.pick_red_5
  ].includes(turn);
};

export interface ViewChampion {
  name: string;
  idName: string;
  loadingImg: string;
  squareImg: string;
}

export interface ViewSelect {
  champion: ViewChampion | null;
  isActive: boolean;
  displayName: string | null;
}

export interface ViewTeamConfig {
  name: string;
  score: number;
  coach: string;
  logo: string;
  color: string;
}

export interface ViewGameConfig {
  logo: string;
  scoreEnabled: boolean;
  spellsEnabled: boolean;
  coachesEnabled: boolean;
  blueTeam: ViewTeamConfig;
  redTeam: ViewTeamConfig;
  patch: string;
}

export interface ViewTeamState {
  picks: ViewSelect[];
  bans: ViewSelect[];
  isActive: boolean;
}

export interface ViewGameState {
  config: ViewGameConfig;
  blueTeam: ViewTeamState;
  redTeam: ViewTeamState;
  timer: string;
  champSelectActive: boolean;
  leagueConnected: boolean;
  anyTeam: boolean;
  realTimer: number;

}

export interface ViewGame {
  eventType: string;
  state: ViewGameState;
  ended: boolean;
  started: boolean;
} 