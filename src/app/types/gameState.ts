export interface Team {
  teamName: string;
  teamTag: string;
  teamIconUrl: string;
  seriesScore: {
    wins: number;
    losses: number;
  };
  totalScore: {
    wins: number;
    losses: number;
  };
  infoText: string;
  gold: number;
  kills: number;
  towers: number;
  grubs: number;
  dragons: string[];
  baronPowerPlay: BaronPowerPlay | null;
  dragonPowerPlay: number | null;
}

export interface BaronPowerPlay {
  timeTotal: number;
  timeLeft: number;
  deaths: number;
  gold: number;
  kills: number;
}
export interface ChampionAssets {
  id: number;
  alias: string;
  name: string;
  splashCenteredImg: string;
  splashImg: string;
  loadingImg: string;
  squareImg: string;
}

export interface Ability {
  identifier: string;
  displayName: string;
  slot: string;
  totalCooldown: number;
  cooldown: number;
  level: number;
  charges: number;
  assets: {
    spellName: string;
    iconAsset: string;
    iconName: string;
  };
}

export interface Player {
  id: string;
  playerName: string;
  playerHashtag: string;
  championAssets: ChampionAssets;
  abilities: Ability[];
  health: {
    current: number;
    max: number;
    shield: number;
    physicalShield: number;
    magicalShield: number;
  };
  resource: {
    type: string;
    current: number;
    max: number;
  };
  stacksData: any;
  hasBaron: boolean;
  hasElder: boolean;
  level: number;
  experienceToNextlevel: number;
}

export interface ItemInBoard {
  id: number;
  displayName: string;
  asset: string;
  cost: number;
  count: number;
  combineCost: number;
  stacks: number;
  visionScore: number | null;
  cooldown: number;
  maxCooldown: number;
}

export interface PlayerScore {
  champion: ChampionAssets;
  name: string;
  kills: number;
  deaths: number;
  assists: number;
  level: number;
  gold: number;
  totalGold: number;
  creepScore: number;
  visionScore: number;
  shutdown: number;
  respawnTimeRemaining: number | null;
  items: ItemInBoard[];
}
export interface TeamBoard {
  id: string;
  name: string;
  tag: string;
  players: PlayerScore[];
}
export interface GameState {
  gameTime: number;
  gameStatus: string;
  scoreboard: {
    teams: Team[];
    gameTime: number;
    bestOf: number;
  };
  tabs: {
    id: string;
    players: Player[];
  }[];
  baronPitTimer: {
    timeTotal: number;
    timeLeft: number;
    subType: string;
  };
  dragonPitTimer: {
    timeTotal: number;
    timeLeft: number;
    subType: string;
  };
  scoreboardBottom: {
    gameTime: number;
    teams: TeamBoard[];
  };
  inhibitors: any[];
  goldGraph: {
    current: {
        goldAtTime: {
          [timeInSeconds: number]: {
            "1": number; // Gold for blue team
            "2": number; // Gold for red team
          };
        };
    };
  };
}

export interface WebSocketMessage {
  type: "ingame-state-update" | "gameStatus";
  state?: GameState;
  GameState?: string;
} 