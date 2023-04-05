import { render, screen } from '@testing-library/react';
import { GameMode, GameModeComponent } from '../../components/GameMode';

test("test Quick Draw game mode is checked", () => {
    render(
        <GameModeComponent gameMode={GameMode.QUICK_DRAW} changeGameMode={() => {}} />
    );
    const linkElement = screen.getByTestId("radio-quick-draw");
    expect(linkElement).toBeChecked();
});

test("test Precision Shot game mode is checked", () => {
    render(
        <GameModeComponent gameMode={GameMode.PRECISION_SHOT} changeGameMode={() => {}} />
    );
    const linkElement = screen.getByTestId("radio-precision-shot");
    expect(linkElement).toBeChecked();
});
