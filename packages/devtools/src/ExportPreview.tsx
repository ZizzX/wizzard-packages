import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Recorder, SessionBundle } from './headless';

/**
 * What "Copy JSON" opens. A recording carries whatever the wizard held, so the
 * preview shows what is about to leave before it leaves: the counts, the size,
 * whether a redaction hook ran, and the JSON itself. The textarea is also the
 * fallback path - a clipboard call the browser refuses leaves the text
 * selected and focused, so the copy is one keystroke away (§12.6).
 *
 * The word "safe" appears nowhere: the panel cannot know what a host considers
 * sensitive, and saying it would be a promise it does not keep.
 */

export interface ExportPreviewProps {
  recorder: Recorder;
  hasRedact: boolean;
  hasPlugin: boolean;
  onClose: () => void;
  /** Receives the redacted bundle. A throw here stops the export, not the wizard. */
  onRecord?: (bundle: SessionBundle) => void;
}

type Copy = 'idle' | 'copying' | 'copied' | 'failed';

export function ExportPreview({
  recorder,
  hasRedact,
  hasPlugin,
  onClose,
  onRecord,
}: ExportPreviewProps): ReactNode {
  const [copy, setCopy] = useState<Copy>('idle');
  const area = useRef<HTMLTextAreaElement>(null);

  /**
   * `bundle()` clones, redacts and measures, and either half can refuse
   * (§14.4). It runs once per preview: the recording does not change while
   * this dialog is open, and the clone is the expensive part.
   */
  const built = useMemo((): { bundle: SessionBundle; json: string } | { error: string } => {
    try {
      const bundle = recorder.bundle();
      return { bundle, json: JSON.stringify(bundle, null, 2) };
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) };
    }
  }, [recorder]);

  useEffect(() => {
    if ('error' in built || !onRecord) return;
    try {
      onRecord(built.bundle);
    } catch {
      /* a host callback that throws is the host's bug; the preview still shows */
    }
  }, [built, onRecord]);

  useEffect(() => {
    if (copy !== 'copied') return;
    const timer = setTimeout(() => setCopy('idle'), 2000);
    return () => clearTimeout(timer);
  }, [copy]);

  if ('error' in built) {
    return (
      <div className="wz-export" role="dialog" aria-label="Export">
        <p className="wz-message">{built.error}</p>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  const { bundle, json } = built;

  const onCopy = (): void => {
    setCopy('copying');
    const fallback = (): void => {
      setCopy('failed');
      area.current?.focus();
      area.current?.select();
    };
    try {
      const clipboard = navigator?.clipboard;
      if (!clipboard) {
        fallback();
        return;
      }
      clipboard.writeText(json).then(() => setCopy('copied'), fallback);
    } catch {
      fallback();
    }
  };

  return (
    <div className="wz-export" role="dialog" aria-label="Export">
      <ul className="wz-export-meta">
        <li>{bundle.meta.frames} frames</li>
        <li>{bundle.meta.outcomes} outcomes</li>
        <li>{Math.round(bundle.meta.bytes / 102.4) / 10} kB</li>
        <li>redaction hook: {hasRedact ? 'ran' : 'not configured'}</li>
        <li>refusals: {hasPlugin ? 'captured' : 'not captured'}</li>
        {bundle.meta.capped && <li>stopped at the {bundle.meta.capped} cap</li>}
        {bundle.meta.stopped && <li>ended early: {bundle.meta.stopped}</li>}
      </ul>
      <textarea ref={area} className="wz-json" readOnly value={json} aria-label="Bundle JSON" />
      <div className="wz-export-actions">
        <button type="button" onClick={onCopy} disabled={copy === 'copying'}>
          {copy === 'copied' ? 'Copied' : copy === 'failed' ? 'Copy failed' : 'Copy'}
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
