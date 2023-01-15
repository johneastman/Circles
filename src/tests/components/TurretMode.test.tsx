import { render, screen } from '@testing-library/react';
import { TurretMode } from '../../components/turret_mode/TurretMode';

test("render turret mode", () => {
  render(<TurretMode />);
  const linkElement = screen.getByTestId("turretModes");
  expect(linkElement).toBeInTheDocument();
});
