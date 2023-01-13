import React from "react";

class HighScore {
    score: number;
    date: Date;
    constructor(score: number) {
        this.score = score;
        this.date = new Date();
    }

    formatDate(): string {
        let formattingOptions: {} = {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        }
        return this.date.toLocaleString("default", formattingOptions);
    }
}

interface HighScoresProps {
    numTopScores: number;
}

interface HighScoresState {
    scores: HighScore[];
}

export class HighScores extends React.Component<HighScoresProps, HighScoresState> {

    constructor(props: HighScoresProps) {
        super(props);
        
        this.state = {
            scores: []
        };
    }

    render(): JSX.Element {
        let scores: HighScore[] = this.state.scores;
        
        return (
            <div>
                <strong>High Scores</strong>
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
    }
}
