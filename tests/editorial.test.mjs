import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const technology = fs.readFileSync(path.join(root, 'tecnologia/index.html'), 'utf8');
const publicCopy = `${home}\n${technology}`;

test('uses the canonical product names and genealogy', () => {
  assert.doesNotMatch(publicCopy, /Psychopomp|Psicopompo/);
  assert.match(publicCopy, /PsicopoMPo/);
  assert.match(publicCopy, /Personal Myth Projection/);
  assert.match(publicCopy, /Harmonic Myth Projection/);
  assert.match(technology, /Personal Myth Projection[\s\S]*Harmonic Beacon[\s\S]*Harmonic Myth Projection/);
});

test('technology page presents durable layers instead of prototype internals', () => {
  assert.match(technology, /Seis capas, una experiencia continua/);
  assert.match(technology, /Six layers, one continuous experience/);
  assert.doesNotMatch(technology, /guardarraíl|guardrail|Gemma|Groq|QLoRA|\bLoRA\b|backchannel|\bRAG\b|257|18\/18/i);
  assert.doesNotMatch(technology, /hola@altermundi\.net/);
});

test('language switch localizes metadata and accessibility labels', () => {
  assert.match(home, /data-aria-es="Elegí tu perfil" data-aria-en="Choose your profile"/);
  assert.match(home, /data-alt-es="El Guardián del Umbral:[^"]+"[\s\S]*data-alt-en="The Guardian of the Threshold:/);
  assert.match(technology, /data-alt-es="Interfaces de participante[^"]+"[\s\S]*data-alt-en="Participant and facilitator/);
  assert.match(fs.readFileSync(path.join(root, 'assets/main.js'), 'utf8'), /data-alt-en/);
});
