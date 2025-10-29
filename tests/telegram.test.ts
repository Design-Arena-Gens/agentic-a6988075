import { describe, expect, it } from 'vitest';
import { extractTopicFromMessage } from '@/lib/telegram';

describe('extractTopicFromMessage', () => {
  it('extracts topic when prefixed with make', () => {
    expect(extractTopicFromMessage('make electric cars')).toBe('electric cars');
  });

  it('is case insensitive and trims whitespace', () => {
    expect(extractTopicFromMessage('  MAKE   quantum chips  ')).toBe(
      'quantum chips'
    );
  });

  it('returns null when format invalid', () => {
    expect(extractTopicFromMessage('build new story')).toBeNull();
  });

  it('returns null when topic empty', () => {
    expect(extractTopicFromMessage('make   ')).toBeNull();
  });
});
