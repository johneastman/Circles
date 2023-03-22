import { render, screen } from '@testing-library/react';
import { Menu } from '../../components/Menu';

test("render menu end-game state", () => {
    render(
        <Menu 
            score={0}
            numCircles={0} 
            resetGame={ () => {} }
        />
    );

    expect(screen.getByText(/Score: 0/)).toBeInTheDocument();

    const playAgainButton = screen.getByRole("button", {name: "(R) Play Again"});
    expect(playAgainButton).toBeInTheDocument();
    expect(playAgainButton).toBeEnabled();
});

test("render menu game-play state", () => {
    render(
        <Menu 
            score={5}
            numCircles={1}
            resetGame={ () => {} }
        />
    );

    expect(screen.getByText("Score: 5")).toBeInTheDocument();

    const playAgainButton = screen.getByRole("button", {name: "(R) Reset Game"});
    expect(playAgainButton).toBeInTheDocument();
    expect(playAgainButton).toBeEnabled();
});
