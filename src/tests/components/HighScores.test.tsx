import { render, screen } from '@testing-library/react';
import { HighScores } from '../../components/HighScores';

test('renders high scores', () => {
    render(<HighScores numTopScores={3} currentScore={0} isEndGame={() => { return false }} />);
    const linkElement = screen.getByText(/High Scores/);
    expect(linkElement).toBeInTheDocument();
});
