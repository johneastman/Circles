import React from "react";

interface HighScoresProps {
    numTopScores: number;
}

interface HighScoresState {
    scores: number[];
}

export class HighScores extends React.Component<HighScoresProps, HighScoresState> {

    constructor(props: HighScoresProps) {
        super(props);
        
        this.state = {
            scores: []
        };
    }

    render(): JSX.Element {
        let scores: number[] = this.state.scores;
        
        return (
            <div>
                <strong>High Scores</strong>
                {scores.length > 0
                    ? scores.map((score, index) => <p key={index + 1}>#{index + 1}: {score}</p>)
                    : <p>No high scores</p>
                }
            </div>
        );
    }

    addScore(score: number): void {
        let scores: number[] = this.state.scores;
        scores.push(score);

        // Only store in memory the top "this.props.numTopScores" scores.
        let topScores: number[] = scores
            .sort((first, second) => first - second)
            .reverse()
            .slice(0, this.props.numTopScores);
        
        this.setState({scores: topScores});
    }
}
