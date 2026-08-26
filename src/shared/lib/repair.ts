import { repairShops } from '../data/mockData';
import type { ConfirmedRequest, RepairRequestDraft } from '../types/navigation';

/** Rough turnaround per issue type, used for the Home progress estimate. */
const ESTIMATE_HOURS: Record<string, number> = {
  'Screen cracked': 48,
  'Battery issue': 24,
  'Not charging': 24,
  'Water damage': 72,
  'No power': 72,
  Overheating: 48,
};

const DEFAULT_ESTIMATE_HOURS = 48;

export function estimateHoursFor(issue: string) {
  return ESTIMATE_HOURS[issue] ?? DEFAULT_ESTIMATE_HOURS;
}

/** Prefer a verified shop in the requested area, else the highest rated one. */
export function pickShopFor(area: string) {
  const inArea = repairShops.filter((shop) => shop.area === area);
  const pool = inArea.length > 0 ? inArea : repairShops;
  return pool.reduce((best, shop) => (shop.rating > best.rating ? shop : best), pool[0]);
}

export function buildConfirmedRequest(draft: RepairRequestDraft, now = Date.now()): ConfirmedRequest {
  const shop = pickShopFor(draft.area);
  return {
    reference: `TSC-${String(now).slice(-6)}`,
    draft: { ...draft },
    shopName: shop.name,
    shopArea: shop.area,
    confirmedAt: now,
    estimatedHours: estimateHoursFor(draft.issue),
  };
}

const STAGES: { upTo: number; label: string }[] = [
  { upTo: 12, label: 'Booked' },
  { upTo: 35, label: 'Diagnosing' },
  { upTo: 75, label: 'In Progress' },
  { upTo: 99, label: 'Final checks' },
  { upTo: 100, label: 'Ready for collection' },
];

export function formatEta(request: ConfirmedRequest) {
  const done = new Date(request.confirmedAt + request.estimatedHours * 3600_000);
  return done.toLocaleString([], {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Progress is real elapsed time against the estimate, so a freshly confirmed
 * request starts near the BASELINE and climbs on its own.
 */
export function repairProgress(request: ConfirmedRequest, now = Date.now()) {
  const BASELINE = 6;
  const total = request.estimatedHours * 3600_000;
  const elapsed = Math.max(0, now - request.confirmedAt);
  const raw = BASELINE + (100 - BASELINE) * Math.min(1, total === 0 ? 1 : elapsed / total);
  const percent = Math.round(Math.min(100, raw));
  const stage = STAGES.find((entry) => percent <= entry.upTo)?.label ?? 'Completed';

  const remainingMs = Math.max(0, total - elapsed);
  const remainingLabel =
    remainingMs === 0 ? 'Ready now' : `About ${formatDuration(Math.ceil(remainingMs / 3600_000))} left`;

  return { percent, stage, remainingLabel, etaLabel: formatEta(request) };
}

/** "3 hours", "1 day", "2 days" — pluralised off the unit actually shown. */
export function formatDuration(hours: number) {
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'}`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? '' : 's'}`;
}
