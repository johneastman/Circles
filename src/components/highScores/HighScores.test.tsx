import { render, screen } from '@testing-library/react';
import { HighScores } from './HighScores';

test('renders high scores', () => {
    render(<HighScores numTopScores={3} />);
    const linkElement = screen.getByText(/High Scores/);
    expect(linkElement).toBeInTheDocument();
});
