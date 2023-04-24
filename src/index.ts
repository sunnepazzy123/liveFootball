import { Game } from "./model/game.interface";

export class LiveFootballWorldCupScoreBoard {
  private games: Game[];

  constructor() {
    this.games = [];
  }

  startGame(id: string, homeTeam: string, awayTeam: string): Game {
    const currentGame = this.findGameById(id);

    if (currentGame) throw new Error("Game already started");

    const newGame: Game = {
      id,
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(),
    };
    this.games.push(newGame);
    return newGame;
  }

  findGameById(id: string): Game | undefined {
    return this.games.find((game: Game) => game.id === id);
  }

  updateScore(id: string, homeScore: number, awayScore: number): Game {
    const currentGame = this.findGameById(id);

    if (!currentGame) throw new Error("No Game found");

    currentGame.homeScore = homeScore;
    currentGame.awayScore = awayScore;
    return currentGame;
  }

  finishGame(id: string): void {
    const currentGame = this.findGameById(id);

    if (!currentGame) throw new Error("No Game found");

    this.games = this.games.filter((game) => game.id !== id);
  }

  getGameTotal(id: string): number {
    const currentGame = this.findGameById(id);

    if (!currentGame) throw new Error("No Game found");

    const totalScore = currentGame.homeScore + currentGame.awayScore;
    return totalScore;
  }

  getSummary(): Game[] {
    return this.games.sort((a, b) => {
      if (a.homeScore + a.awayScore === b.homeScore + b.awayScore) {
        return -1;
      }
      return b.homeScore + b.awayScore - a.homeScore - a.awayScore;
    });
  }

}

const LiveFootballScoreBoard = new LiveFootballWorldCupScoreBoard();

const gameA = LiveFootballScoreBoard.startGame('a', 'Mexico', 'Canada');
const gameB = LiveFootballScoreBoard.startGame('b', 'Spain', 'Brazil');
const gameC = LiveFootballScoreBoard.startGame('c', 'Germany', 'France');
const gameD = LiveFootballScoreBoard.startGame('d', 'Uruguay', 'Italy');
const gameE = LiveFootballScoreBoard.startGame('e', 'Argentina', 'Australia');

LiveFootballScoreBoard.updateScore(gameA.id, 0, 5);
LiveFootballScoreBoard.updateScore(gameB.id, 10, 2);
LiveFootballScoreBoard.updateScore(gameC.id, 2, 2);
LiveFootballScoreBoard.updateScore(gameD.id, 6, 6);
LiveFootballScoreBoard.updateScore(gameE.id, 3, 1);

const result = LiveFootballScoreBoard.getSummary();
console.log(result);

