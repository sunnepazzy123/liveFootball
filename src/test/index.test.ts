import { LiveFootballWorldCupScoreBoard } from "../index";
import { describe, it, expect, beforeAll } from "vitest";

let LiveFootballScoreBoard: LiveFootballWorldCupScoreBoard;

beforeAll(() => {
  LiveFootballScoreBoard = new LiveFootballWorldCupScoreBoard();
});

describe("LiveFootball module", () => {
  it("should return home team", () => {
    const game = LiveFootballScoreBoard.startGame("a", "Mexico", "Canada");
    expect(game.homeTeam).to.be.equal('Mexico');
    expect(game.awayTeam).to.be.equal('Canada');
  });

  it("should throw error, if gameId exist", () => {
    const resultFn = () => LiveFootballScoreBoard.startGame("a", "Mexico", "Canada");   
    expect(resultFn).toThrow(/Game already started/);
  });

  it("should return existing game", () => {
    const game = LiveFootballScoreBoard.findGameById("a");
    expect(game).to.be.toBeDefined();
  });

  it("should update existing game score", () => {
    const game = LiveFootballScoreBoard.updateScore("a", 10, 12);
    expect(game).to.be.toBeDefined();
  });

  it("should throw an error when updating game that does not exist", () => {
    const resultFn = () => LiveFootballScoreBoard.updateScore("ab", 10, 12);
    expect(resultFn).toThrow(/No Game found/);
  });

  it("should return total game score", () => {
    const game = LiveFootballScoreBoard.getGameTotal("a");
    expect(game).toBeTypeOf('number');
  });

});
