import React from "react";
import { getScore, ordinal } from "../utils/util";
import "./HighScores.css";
import { getValue, setValue, removeValue } from "../utils/storage";
import { GameMode } from "./GameMode";

export class Score {
    score: number;
    date: Date;
    
    constructor(score: number, gameMode: GameMode, date: Date = new Date()) {
        this.score = score;
        this.date = date;
    }

    formatDate(): string {
        let formattingOptions: {} = {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };
        return this.date.toLocaleString("default", formattingOptions);
    }

    jsonify(): {score: string, date: string} {
        return {score: this.score.toString(), date: this.date.toString()};
    }
}

interface HighScoresProps {
    numTopScores: number;
    currentScore: number;
    gameMode: GameMode;
    isEndGame: () => boolean;
}

export class HighScores extends React.Component<HighScoresProps, {}> {

    render(): JSX.Element {
        let highScores: Score[] = this.getScores();

        if (this.props.isEndGame()) {
            highScores = highScores
                .concat(new Score(this.props.currentScore, this.props.gameMode))
                .sort((first, second) => first.score - second.score);
            
            // The highest score for the Quick Draw game mode are the smallest times
            if (this.props.gameMode === GameMode.PRECISION_SHOT) {
                highScores = highScores.reverse();
            }
            
            // Only store in memory the top "this.props.numTopScores" scores.
            highScores = highScores.slice(0, this.props.numTopScores);
            
            this.saveScores(highScores);
        }

        return (
            <>
                <div className="highScoresMenu">
                    <strong>High Scores</strong>
                    <ul>
                        <li><button className="button" onClick={this.removeScores.bind(this)}>Clear</button></li>
                        <li>
                            <button className="button" onClick={() => { document.getElementById("highScoreImport")?.click() }}>Upload</button>
                            <input id="highScoreImport" type="file" hidden onChange={this.loadHighScores.bind(this)}/>
                        </li>
                        <li><button className="button" onClick={this.downloadHighScores.bind(this)}>Download</button></li>
                    </ul>
                </div>

                {highScores.length === 0
                    ? "No high scores"
                    : <table>
                        <tbody>
                            {highScores.map((score, index) =>
                                <tr key={index + 1}>
                                    <td><strong>{ordinal(index + 1)}</strong></td>
                                    <td>{getScore(score.score, this.props.gameMode)}</td>
                                    <td>{score.formatDate()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </>
        );
    }

    parseJSON(rawJSON: string): Score[] {
        return (JSON.parse(rawJSON) as {score: string, gameMode: string, date: string}[]).map(s => {
            let score: number = Number.parseInt(s.score);
            let gameMode: GameMode = s.gameMode as GameMode;
            let date: Date = new Date(s.date);
            return new Score(score, gameMode, date);
        });
    }

    private removeScores(): void {
        removeValue(this.props.gameMode);
        this.forceUpdate();
    }

    /**
     * Convert high scores to JSON and save to {@link localStorage}.
     */
    private saveScores(scores: Score[]): void {
        let JSONScores: {score: string, date: string}[] = scores.map(score => score.jsonify());
        setValue(this.props.gameMode, JSON.stringify(JSONScores));
    }

    /**
     * Check {@link localStorage} for high scores. If any high scores are found, parse the JSON data
     * into a list of {@link HighScore} objects.
     * 
     * If no high scores are found in {@link localStorage}, return an empty list.
     * 
     * Use the game mode as the localStorage key so the top scores for each game mode are stored separately.
     * 
     * @returns list of {@link HighScore} objects.
     */
    private getScores(): Score[] {
        let scoresData: string | null = getValue(this.props.gameMode);
        return scoresData === null ? [] : this.parseJSON(scoresData);
    }

    private downloadHighScores(): void {
        let scores: string = JSON.stringify(this.getScores());
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(scores)}`;

        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "circles_high_scores.json";
        link.click();
    }

    private loadHighScores(e: React.ChangeEvent<HTMLInputElement>): void {
        let files: FileList | null = e.target.files;
        if (files !== null) {
            let file: File = files[0];

            let fileReader: FileReader = new FileReader();
            fileReader.readAsText(file);

            fileReader.onload = () => {
                let rawJSON: string = fileReader.result as string;
                this.saveScores(this.parseJSON(rawJSON));
            };

            fileReader.onloadend = () => {
                this.forceUpdate();
            }

            fileReader.onerror = () => {
                alert(`unable to load file ${file.name}`);
            };
        }
    }
}
