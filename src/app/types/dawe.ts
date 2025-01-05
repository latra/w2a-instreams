export class Status {
  blueName: string;
  redName: string;
  disabledTurns: string[];
  disabledChamps: string[];
  timePerPick: number;
  timePerBan: number;
  bluePicks: string[];
  redPicks: string[];
  blueBans: string[];
  redBans: string[];
  nextTeam: string;
  nextType: string;
  nextTimeout: number;
  blueReady: boolean;
  redReady: boolean;
  state: string;
  turn: number;

  constructor(data: any) {
    this.blueName = data.blueName;
    this.redName = data.redName;
    this.disabledTurns = data.disabledTurns;
    this.disabledChamps = data.disabledChamps;
    this.timePerPick = data.timePerPick;
    this.timePerBan = data.timePerBan;
    this.bluePicks = data.bluePicks;
    this.redPicks = data.redPicks;
    this.blueBans = data.blueBans;
    this.redBans = data.redBans;
    this.nextTeam = data.nextTeam;
    this.nextType = data.nextType;
    this.nextTimeout = data.nextTimeout;
    this.blueReady = data.blueReady;
    this.redReady = data.redReady;
    this.state = data.state;
    this.turn = data.turn;
  }
} 