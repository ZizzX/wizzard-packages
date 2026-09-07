/**
 * Every message the panel shows, in one file, in the shape AGENTS.md fixes:
 * `[wizzard] <what went wrong>. <why>. <the fix>. <docs url>#<code>`.
 *
 * They live here rather than beside their call sites so the template test can
 * read them as data, and so a message and its `docs/errors.md` section are
 * written together: `messages.test.ts` fails when an anchor has no heading.
 */

const DOCS = 'https://github.com/ZizzX/wizzard-packages/blob/main/docs/errors.md';

const message = (code: string, what: string, why: string, fix: string): string =>
  `[wizzard] ${what}. ${why}. ${fix}. ${DOCS}#${code}`;

/** No provider above the panel and no `wizard` prop. The whole panel is this line. */
export const noWizard = (): string =>
  message(
    'devtools-no-wizard',
    'devtools has no wizard to watch',
    'It reads WizardContext or the wizard prop, and neither is set',
    'Render <WizardDevtools/> inside <WizardProvider>, or pass wizard={wizard}'
  );

/**
 * No plugin prop: refusals never reach the panel. `reason` distinguishes the
 * two ways that happens, because the fix differs (§14.9).
 */
export const noPlugin = (reason: 'absent' | 'not-installed'): string =>
  reason === 'absent'
    ? message(
        'devtools-no-plugin',
        'refusals are not captured',
        'The wizard was created without the devtools plugin, so a refused next() never reaches this panel',
        'const dt = devtools(); createWizard({ flow, plugins: [dt] }); <WizardDevtools plugin={dt}/>'
      )
    : message(
        'devtools-no-plugin',
        'refusals are not captured',
        'The plugin object passed to the panel is not the one installed on this wizard, so its rings stay empty',
        'Pass the same devtools() instance to createWizard({ plugins: [dt] }) and to <WizardDevtools plugin={dt}/>'
      );

/** The Graph tab alone; the strip, State and Activity keep working (§12.7). */
export const renderFailed = (detail: string): string =>
  message(
    'devtools-render-failed',
    `the graph could not be drawn: ${detail}`,
    'A layout override or a flow shape the renderer has not seen threw; the wizard, the strip, State and Activity are unaffected',
    'Remove the layout prop to use the built-in layout, or record a session and attach it to an issue'
  );

/** A devtools callback threw. The panel stops updating; the wizard does not (§14.5). */
export const stopped = (detail: string): string =>
  message(
    'devtools-stopped',
    `diagnostics stopped: ${detail}`,
    'A devtools listener threw; the wizard is unaffected and this panel no longer updates',
    'Reload the page, and record a session and attach it to an issue if it happens again'
  );

/** A reader met a bundle from a newer format. Written here because the format is born here. */
export const bundleUnsupported = (version: number): string =>
  message(
    'devtools-bundle-unsupported',
    `this bundle is version ${version}`,
    'This reader understands version 1',
    'Export it again with a matching @wizzard-packages/devtools, or upgrade the reader'
  );
