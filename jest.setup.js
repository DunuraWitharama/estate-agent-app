import '@testing-library/jest-dom'; // Keep this line if it's already there

// Fix for "TextEncoder is not defined" error in Jest
import { TextEncoder, TextDecoder } from 'util';
Object.assign(globalThis, { TextEncoder, TextDecoder });