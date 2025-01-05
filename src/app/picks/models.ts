// Champion information
export interface Champion {
    name: string;
    idName: string;
    loadingImg: string;
    squareImg: string;
  }
  
  // Pick or Ban structure
  export interface PickOrBan {
    champion: Champion;
    isActive: boolean;
    displayName: string | null;
  }
  
  // Team structure
  export interface Team {
    name: string;
    score: number;
    coach: string;
    logo: string;
    color: string;
    picks: PickOrBan[];
    bans: PickOrBan[];
    isActive: boolean;
  }
  
  // Configuration settings
  export interface Config {
    logo: string;
    scoreEnabled: boolean;
    spellsEnabled: boolean;
    coachesEnabled: boolean;
    blueTeam: Team;
    redTeam: Team;
    patch: string;
  }
  
  // Main State
  export interface State {
    config: Config;
    blueTeam: Team;
    redTeam: Team;
    timer: number;
    champSelectActive: boolean;
    leagueConnected: boolean;
    anyTeam: boolean;
  }
  
  // Root object
  export interface GameState {
    eventType: string;
    state: State;
  }
  