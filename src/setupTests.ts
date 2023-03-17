// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * Fixes this warning/error: 
 * Error: Not implemented: HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)
 * 
 * Note: This error was not failing the tests, but it was clogging the output with error stacktraces.
 */
HTMLCanvasElement.prototype.getContext = () => { 
    return null;
};
