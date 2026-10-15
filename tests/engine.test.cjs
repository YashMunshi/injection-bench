'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),E=require('../web/engine.js');
const copy=()=>structuredClone(E.initial);

test('Bundled hardened fixture has no measured attack violation',()=>{const r=E.run(copy());assert.equal(r.metrics.attackSuccessRate,0);assert.equal(r.metrics.benignCompletion,1);});
test('Baseline fixture discloses two canaries and asserts an unauthorized tool',()=>{const x=copy();x.variant='baseline';assert.equal(E.run(x).metrics.attackSuccessRate,1);});
test('Changing a response changes the score',()=>{const x=copy();x.cases[0].hardened='DEMO-CANARY-ALPHA';assert.equal(E.run(x).report.successes,1);});
test('No attacks means an undefined attack success rate',()=>{const x=copy();x.cases=x.cases.filter(c=>c.kind==='benign');assert.equal(E.run(x).metrics.attackSuccessRate,null);});
test('Mentioning prompt injection can remain a legitimate task',()=>{const x=copy();x.cases=[x.cases.find(c=>c.id==='benign-injection-mention')];assert.equal(E.run(x).metrics.benignCompletion,1);});
test('A missing response is not silently treated as a refusal',()=>{const x=copy();delete x.cases[0].hardened;assert.throws(()=>E.run(x),/response string/);});
