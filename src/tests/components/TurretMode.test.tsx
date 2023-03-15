import { render, screen } from '@testing-library/react';
import { Mode, TurretMode } from '../../components/turret_mode/TurretMode';

test("render turret mode", () => {
  render(<TurretMode mode={Mode.DEFAULT.toString()} />);
  const linkElement = screen.getByTestId("turretModes");
  expect(linkElement).toBeInTheDocument();
});
