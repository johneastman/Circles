import { render, screen } from '@testing-library/react';
import { Mode, TurretMode } from '../../components/TurretMode';

test("render turret mode", () => {
  render(<TurretMode mode={Mode.DEFAULT} />);
  const linkElement = screen.getByTestId("turretModes");
  expect(linkElement).toBeInTheDocument();
});
