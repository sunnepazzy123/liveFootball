import { Game } from "./model/game.interface";

export class LiveFootballWorldCupScoreBoard {
  public games: Game[];

  constructor() {
    this.games = [];
  }

  startGame(homeTeam: string, awayTeam: string): void {
    const newGame: Game = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(),
    };
    this.games.push(newGame);
  }

  updateScore(homeScore: number, awayScore: number): void {
    const currentGame = this.games[this.games.length - 1];
    currentGame.homeScore = homeScore;
    currentGame.awayScore = awayScore;
  }

  finishGame(): void {
    this.games.pop();
  }

  getSummary(): Game[] {
    return this.games.sort((a, b) => {
        console.log(a.homeScore + a.awayScore, " - ", b.homeScore + b.awayScore)
      if (a.homeScore + a.awayScore === b.homeScore + b.awayScore) {
        return -1;
      }
      return b.homeScore + b.awayScore - a.homeScore - a.awayScore;
    });
  }
}



