import { render, screen } from '@testing-library/react';
import { Menu } from '../../components/Menu';

test("render menu end-game state", () => {
    render(
        <Menu 
            score={0}
            isGamePaused={true}
            numCircles={0} 
            resetGame={ () => {} }
            pauseGame={ () => {} }
        />
    );

    expect(screen.getByText(/Score: 0/)).toBeInTheDocument();

    const playAgainButton = screen.getByRole("button", {name: "(R) Play Again"});
    expect(playAgainButton).toBeInTheDocument();
    expect(playAgainButton).toBeEnabled();

    const playPauseButton = screen.getByRole("button", {name: "(P) Play"});
    expect(playPauseButton).toBeInTheDocument();
    expect(playPauseButton).toBeDisabled();
});

test("render menu game-play state", () => {
    render(
        <Menu 
            score={5}
            isGamePaused={false}
            numCircles={1}
            resetGame={ () => {} }
            pauseGame={ () => {} }
        />
    );

    expect(screen.getByText("Score: 5")).toBeInTheDocument();

    const playAgainButton = screen.getByRole("button", {name: "(R) Reset Game"});
    expect(playAgainButton).toBeInTheDocument();
    expect(playAgainButton).toBeEnabled();

    const playPauseButton = screen.getByRole("button", {name: "(P) Pause"});
    expect(playPauseButton).toBeInTheDocument();
    expect(playPauseButton).toBeEnabled();
});
