import { render, screen } from '@testing-library/react';
import { GameMode } from '../../components/GameMode';

test("test Quick Draw game mode is checked", () => {
    render(
        <GameMode gameMode="quick-draw" changeGameMode={() => {}} />
    );
    const linkElement = screen.getByTestId("radio-quick-draw");
    expect(linkElement).toBeChecked();
});

test("test Precision Shot game mode is checked", () => {
    render(
        <GameMode gameMode="precision-shot" changeGameMode={() => {}} />
    );
    const linkElement = screen.getByTestId("radio-precision-shot");
    expect(linkElement).toBeChecked();
});
