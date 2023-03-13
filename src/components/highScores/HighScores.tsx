import React from "react";

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
}

interface HighScoresState {
    scores: HighScore[];
}

export class HighScores extends React.Component<HighScoresProps, HighScoresState> {

    localStorageKey: string;
    constructor(props: HighScoresProps) {
        super(props);

        this.localStorageKey = "highScores";
        
        this.state = {
            scores: this.getScores()
        };
    }

    render(): JSX.Element {
        let scores: HighScore[] = this.state.scores;
        
        return (
            <div>
                <strong>High Scores</strong> <button onClick={this.removeScores.bind(this)}>Clear</button>
                {scores.length > 0
                    ? scores.map((score, index) => <p key={index + 1}><strong>{index + 1}: </strong>{score.score} on {score.formatDate()}</p>)
                    : <p>No high scores</p>
                }
            </div>
        );
    }

    addScore(score: number): void {
        let scores: HighScore[] = this.state.scores;

        let newScore: HighScore = new HighScore(score);
        scores.push(newScore);

        // Only store in memory the top "this.props.numTopScores" scores.
        let topScores: HighScore[] = scores
            .sort((first, second) => first.score - second.score)
            .reverse()
            .slice(0, this.props.numTopScores);
        
        this.setState({scores: topScores});
        this.saveScores(topScores);
    }

    private removeScores(): void {
        this.setState({scores: []});
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
     * If no high scores are found in {@link localStorage}, an empty list is returned.
     * 
     * @returns list of {@link HighScore} objects.
     */
    private getScores(): HighScore[] {
        let scoresData: string | null = localStorage.getItem(this.localStorageKey);
        return scoresData === null ? [] : (JSON.parse(scoresData) as {score: number, date: Date}[]).map(s => new HighScore(s.score, s.date));
    }
}
