import { ViewGame, ViewGameState, ViewGameConfig, ViewTeamState, ViewSelect, isBlueTurn, PickStatusEnum, PickPhasesEnum } from '../types/game';
import { Status } from '../types/dawe';

export class Game {
  private daweId: string;
  public viewGame: ViewGame;
  private bluePlayers: string[];
  private redPlayers: string[];

  constructor(daweId: string, gameConfig: any) {
    this.daweId = daweId;
    const version = this.getCurrentGameVersion();
    version.then((version) => {
        console.log(version);
        console.log(gameConfig);
        this.viewGame = {
            eventType: "newState",
            state: {
                realTimer: 0,
                config: {
                    logo: gameConfig.tournament_logo,
                    scoreEnabled: false,
                    spellsEnabled: false,
                    coachesEnabled: false,
                    blueTeam: {
                        name: gameConfig.blue_team_name,
                        score: 0,
                        coach: "",
                        logo: gameConfig.blue_team_logo,
                        color: "rgb(25,173,208)"
                    },
                    redTeam: {
                        name: gameConfig.red_team_name,
                        score: 0,
                        coach: "",
                        logo: gameConfig.red_team_logo,
                        color: "rgb(162,8,8)"
                    },
                    patch: version
                },
                blueTeam: {
                picks: [],
                bans: [],
                isActive: false
                },
                redTeam: {
                picks: [],
                bans: [],
                isActive: false
                },
                timer: "30",
                champSelectActive: true,
                leagueConnected: true,
                anyTeam: false
            },
            ended: false,
            started: false
        };
  });

    this.bluePlayers = gameConfig.blue_team_players;
    this.redPlayers = gameConfig.red_team_players;
  }

  private async getCurrentGameVersion(): Promise<string> {
    const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    const data = await response.json();
    return data[0];
  }

  private getDatadragonImage(champ: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/${this.viewGame.state.config.patch}/img/champion/${champ}.png`;
  }

  private getDatadragonSplashart(champ: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg`;
  }

  public swapPositions(team: string, positionA: number, positionB: number): void {
    console.log("Swapping positions", team, positionA, positionB);
    if (team === "blue") {
      [this.viewGame.state.blueTeam.picks[positionA].champion, 
       this.viewGame.state.blueTeam.picks[positionB].champion] = 
      [this.viewGame.state.blueTeam.picks[positionB].champion,
       this.viewGame.state.blueTeam.picks[positionA].champion];
    } else {
      [this.viewGame.state.redTeam.picks[positionA].champion,
       this.viewGame.state.redTeam.picks[positionB].champion] = 
      [this.viewGame.state.redTeam.picks[positionB].champion,
       this.viewGame.state.redTeam.picks[positionA].champion];
    }
  }

  private activePhase(turn: number): void {
    // Reset all active states

    if (turn === PickPhasesEnum.ended) return;

    const phase = turn as PickPhasesEnum;
    const isBlue = isBlueTurn(phase);
    this.viewGame.state.blueTeam.isActive = isBlue;
    this.viewGame.state.redTeam.isActive = !isBlue;
    const teamState = isBlue ? this.viewGame.state.blueTeam : this.viewGame.state.redTeam;
    const isBanPhase = phase <= PickPhasesEnum.ban_red_3 || (phase >= PickPhasesEnum.ban_red_4 && phase <= PickPhasesEnum.ban_blue_5);
    const isPickPhase = !isBanPhase;

    if (isBanPhase) {
        console.log("trying to set active ban")
        if (phase === PickPhasesEnum.ban_red_1) {
            teamState.bans[0].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_red_2) {
            teamState.bans[1].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_red_3) {
            teamState.bans[2].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_red_4) {
            teamState.bans[3].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_red_5) {
            teamState.bans[4].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_blue_1) {
            teamState.bans[0].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_blue_2) {
            teamState.bans[1].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_blue_3) {
            teamState.bans[2].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_blue_4) {
            teamState.bans[3].isActive = true;
        }
        if (phase === PickPhasesEnum.ban_blue_5) {
            teamState.bans[4].isActive = true;
        }
      
    } else if (isPickPhase) {
        if (phase === PickPhasesEnum.pick_red_1) {
            teamState.picks[0].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_red_2) {
            teamState.picks[1].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_red_3) {
            teamState.picks[2].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_red_4) {
            teamState.picks[3].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_red_5) {
            teamState.picks[4].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_blue_1) {
            teamState.picks[0].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_blue_2) {
            teamState.picks[1].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_blue_3) {
            teamState.picks[2].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_blue_4) {
            teamState.picks[3].isActive = true;
        }
        if (phase === PickPhasesEnum.pick_blue_5) {
            teamState.picks[4].isActive = true;
        }

    }
  }

  public loadStatus(status: Status): void {
    this.viewGame.state.blueTeam.picks.forEach(pick => pick.isActive = false);
    this.viewGame.state.blueTeam.bans.forEach(ban => ban.isActive = false);
    this.viewGame.state.redTeam.picks.forEach(pick => pick.isActive = false);
    this.viewGame.state.redTeam.bans.forEach(ban => ban.isActive = false);
    this.viewGame.state.blueTeam.isActive = false;
    this.viewGame.state.redTeam.isActive = false;
    this.viewGame.state.blueTeam.picks = Array.from({ length: 5 }, (_, index) => {
      const pick = status.bluePicks[index] || "";
      return {
        champion: {
          name: pick.toString(),
          idName: pick.toString().toLowerCase(),
          loadingImg: this.getDatadragonSplashart(pick),
          squareImg: this.getDatadragonImage(pick)
        },
        isActive: false,
        displayName: index < this.bluePlayers.length ? this.bluePlayers[index] : ""
      };
    });
    this.viewGame.state.redTeam.picks = Array.from({ length: 5 }, (_, index) => {
        const pick = status.redPicks[index] || "";
        return {
          champion: {
            name: pick.toString(),
            idName: pick.toString().toLowerCase(),
            loadingImg: this.getDatadragonSplashart(pick),
            squareImg: this.getDatadragonImage(pick)
          },
          isActive: false,
          displayName: index < this.redPlayers.length ? this.redPlayers[index] : ""
        };
      });

    this.viewGame.state.blueTeam.bans = Array.from({ length: 5 }, (_, index) => {
      const ban = status.blueBans[index] || "";
      return {
        champion: {
          name: ban.toString(),
          idName: ban.toString().toLowerCase(),
          loadingImg: this.getDatadragonImage(ban),
          squareImg: this.getDatadragonImage(ban)
        },
        isActive: false,
        displayName: ""
      };
    });

    this.viewGame.state.redTeam.bans = Array.from({ length: 5 }, (_, index) => {
      const ban = status.redBans[index] || "";
      return {
        champion: {
          name: ban.toString(),
          idName: ban.toString().toLowerCase(),
          loadingImg: this.getDatadragonImage(ban),
          squareImg: this.getDatadragonImage(ban)
        },
        isActive: false,
        displayName: ""
      };
    });
    this.viewGame.state.anyTeam = status.state === PickStatusEnum.on_going;
    this.viewGame.state.realTimer = status.nextTimeout;
    this.viewGame.state.timer = (status.nextTimeout/1000).toFixed(0);
    if (status.state === PickStatusEnum.on_going) {
      this.viewGame.started = true;
      this.activePhase(status.turn as unknown as number);
    }
    else if (status.state === PickStatusEnum.finished) {
      this.viewGame.ended = true;
    }
    else if (status.state === PickStatusEnum.not_started) {
      this.viewGame.started = false;
    }
  }
} 