import { render, screen } from '@testing-library/react';
import { TurretModeComponent } from '../../components/TurretMode';
import { TurretMode } from "../../sprites/turret";

test("render turret mode", () => {
  render(<TurretModeComponent mode={TurretMode.DEFAULT.key} />);
  const linkElement = screen.getByTestId("turretModes");
  expect(linkElement).toBeInTheDocument();
});
