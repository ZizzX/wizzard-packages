/**
 * The host half of R-A: which field each step asks for, and where a flow goes
 * when the data has just taken the step it was standing on off the route.
 *
 * A flow does not describe fields — that is the application's job — so this is
 * the application, shared by the two places on the site that run `flowA`. The
 * hero and the inspector show it differently; asking a different question in
 * each would make them two demos of two libraries.
 */
import { flowA } from '../../../contract/fixtures';

export interface Field {
  path: string;
  label: string;
  type: string;
  placeholder: string;
}

export const FIELDS: Record<string, Field> = {
  details: { path: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
  company: { path: 'company', label: 'Company name', type: 'text', placeholder: 'Acme Ltd' },
  payment: { path: 'card', label: 'Card number', type: 'text', placeholder: '4242 4242 4242 4242' },
};

export const FALLBACK_FIELD = FIELDS.details as Field;

/** The definition's own sequence, for deciding which way a reroute goes. */
const ORDER: readonly string[] = flowA.order ?? [];

/**
 * Where the flow should stand when a `when` has just excluded the step it is
 * standing on — walking to `company` as a business and then choosing personal.
 *
 * Forward, to the first step of the new route that comes after the excluded one,
 * because that is where `next()` would have gone had the data been chosen
 * earlier. Only if nothing follows does it fall back to the end of the route.
 * Returns null when the flow is still where it belongs and nothing should move.
 */
export function rerouteTo(current: string | null, active: readonly string[]): string | null {
  if (current === null || active.includes(current)) return null;
  const at = ORDER.indexOf(current);
  return active.find((id) => ORDER.indexOf(id) > at) ?? active[active.length - 1] ?? null;
}
