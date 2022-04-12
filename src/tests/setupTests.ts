import '@testing-library/jest-dom';
// - to run tests with DOMPurify
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
//-
