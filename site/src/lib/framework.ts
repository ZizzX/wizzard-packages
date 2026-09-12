/**
 * One preference, one key.
 *
 * The documentation pages remember which binding a reader picked through
 * Starlight's `<Tabs syncKey>`, and Starlight owns that storage: it writes the
 * *label* of the chosen tab to `starlight-synced-tabs__<syncKey>` and restores
 * it from an inline script before the page paints. Nothing on this side can
 * change that shape, so every other page that remembers the same choice - the
 * example pages and the index that links to them - writes and reads exactly
 * this key and exactly these labels.
 *
 * Before this existed the site kept two answers to one question: the examples
 * wrote `wizzard:framework`, the tabs wrote Starlight's key, and picking Vue in
 * one place left the other showing React.
 */
export const FRAMEWORK_SYNC_KEY = 'framework';

export const FRAMEWORK_STORAGE_KEY = `starlight-synced-tabs__${FRAMEWORK_SYNC_KEY}`;

/** The tab labels, which are also the stored values. */
export const FRAMEWORK_LABELS = {
  react: 'React',
  vue: 'Vue',
  headless: 'Headless',
} as const;

export type Framework = keyof typeof FRAMEWORK_LABELS;
