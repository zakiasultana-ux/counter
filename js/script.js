import { Counter, StepCounter } from './module/counter.js';

const c1 = new Counter('#counter-container1', 0,  'Alpha Counter');
const c2 = new Counter('#counter-container2', 5,  'Beta Counter');
const c3 = new Counter('#counter-container3', 10, 'Gamma Counter');

const s1 = new StepCounter('#counter-step2',  0,  2,  'Step × 2');
const s2 = new StepCounter('#counter-step5',  0,  5,  'Step × 5');
const s3 = new StepCounter('#counter-step10', 0, 10, 'Step × 10');

window.counters = { c1, c2, c3, s1, s2, s3 };