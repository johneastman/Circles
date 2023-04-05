import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from "react-dom/server"
import { HighScores, Score } from '../../components/HighScores';
import { GameMode } from '../../components/GameMode';

test("renders high scores with no scores", () => {
    render(<HighScores gameMode={GameMode.PRECISION_SHOT} numTopScores={3} currentScore={0} isEndGame={() => { return false }} />);
    
    // Header
    expect(screen.getByText("High Scores")).toBeInTheDocument();

    // High Scores
    expect(screen.getByText("No high scores")).toBeInTheDocument();
});

test("renders high scores with one score", () => {

    /**
     * If "isEndGame" returns true, it will create a score and store it in localStorage. We can then access that score by
     * retrieving it from localStorage, and use those score to compare the rendered component to the expected values
     */
    const { container } = render(
        <HighScores gameMode={GameMode.PRECISION_SHOT} numTopScores={3} currentScore={0} isEndGame={() => { return true }} />
    );

    let scores: Score[] = getScores();
    
    // Header
    expect(screen.getByText("High Scores")).toBeInTheDocument();
    
    let scoreTable = (
        <table>
            <tbody>
                <tr key="1">
                    <td><strong>1st</strong></td>
                    <td>0</td>
                    <td>{ scores[0].formatDate() }</td>
                </tr>
            </tbody>
        </table>
    );

    let actualScoresTable = container.querySelector("table")?.outerHTML;
    let expectedScoresTable: string = renderToStaticMarkup(scoreTable);

    expect(expectedScoresTable).toEqual(actualScoresTable);
});

function getScores(): Score[] {
    let scores: Score[] = [];
    
    let scoreRawData = localStorage.getItem(GameMode.PRECISION_SHOT);
    if (scoreRawData != null) {
        scores = (JSON.parse(scoreRawData) as {score: string, gameMode: string, date: string}[]).map(s => {
            let score: number = Number.parseInt(s.score);
            let gameMode: GameMode = s.gameMode as GameMode;
            let date: Date = new Date(s.date);
            return new Score(score, gameMode, date);
        });
    }
    return scores;
}

