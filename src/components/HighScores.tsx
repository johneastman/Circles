import React from "react";
import "./HighScores.css";

class HighScore {
    score: number;
    date: Date;
    constructor(score: number, date: Date = new Date()) {
        this.score = score;
        this.date = date;
    }

    formatDate(): string {
        let formattingOptions: {} = {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        };
        return this.date.toLocaleString("default", formattingOptions);
    }

    jsonify(): {score: string, date: string} {
        return {score: this.score.toString(), date: this.formatDate()};
    }
}

interface HighScoresProps {
    numTopScores: number;
    currentScore: number;
    isEndGame: () => boolean;
}

export class HighScores extends React.Component<HighScoresProps, {}> {

    localStorageKey: string;
    constructor(props: HighScoresProps) {
        super(props);

        this.localStorageKey = "highScores";
    }

    render(): JSX.Element {
        let highScores: HighScore[] = this.getScores();

        if (this.props.isEndGame()) {
            highScores = highScores
                .concat(new HighScore(this.props.currentScore))
                .sort((first, second) => first.score - second.score)
                .reverse()
                .slice(0, this.props.numTopScores);  // Only store in memory the top "this.props.numTopScores" scores.
            
            this.saveScores(highScores);
        }

        return (
            <>
                <div className="highScoresMenu">
                    <ul>
                        <li><strong>High Scores</strong></li>
                        <li><button onClick={this.removeScores.bind(this)}>Clear</button></li>
                        <li><button onClick={this.downloadHighScores.bind(this)}>Export</button></li>
                    </ul>
                </div>

                {highScores.length > 0
                    ? highScores.map((score, index) => <p key={index + 1}><strong>{index + 1}: </strong>{score.score} on {score.formatDate()}</p>)
                    : <p>No high scores</p>
                }
            </>
        );
    }

    private removeScores(): void {
        localStorage.removeItem(this.localStorageKey);
    }

    /**
     * Convert high scores to JSON and save to {@link localStorage}.
     */
    private saveScores(scores: HighScore[]): void {
        let JSONScores: {score: string, date: string}[] = scores.map(score => score.jsonify());
        localStorage.setItem(this.localStorageKey, JSON.stringify(JSONScores));
    }

    /**
     * Check {@link localStorage} for high scores. If any high scores are found, parse the JSON data
     * into a list of {@link HighScore} objects.
     * 
     * If no high scores are found in {@link localStorage}, return an empty list.
     * 
     * @returns list of {@link HighScore} objects.
     */
    private getScores(): HighScore[] {
        let scoresData: string | null = localStorage.getItem(this.localStorageKey);
        return scoresData === null ? [] : (JSON.parse(scoresData) as {score: number, date: Date}[]).map(s => new HighScore(s.score, s.date));
    }

    private downloadHighScores(): void {
        let scores: string = JSON.stringify(this.getScores());
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(scores)}`;

        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "circles_high_scores.json";
        link.click();
    }
}
