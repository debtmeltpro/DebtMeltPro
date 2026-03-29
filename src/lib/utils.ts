// ============================================================
// DebtMeltPro — Utility Functions
// Central utility barrel — keeps components lean.
// ============================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes without conflicts.
 * Uses clsx for conditional classes + tailwind-merge for deduplication.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Generate a cryptographically random UUID v4.
 * Safe for use as React keys and Zod ID validation.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Debounce a function — useful for expensive recalculations.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Safely parse a string to a float. Returns 0 for invalid/NaN inputs.
 * Used in form onChange handlers to prevent NaN propagation.
 */
export function safeParseFloat(value: string, fallback = 0): number {
  const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''));
  return isFinite(parsed) ? parsed : fallback;
}

/**
 * Safely parse a string to an integer. Returns fallback for invalid inputs.
 */
export function safeParseInt(value: string, fallback = 0): number {
  const parsed = parseInt(value.replace(/[^0-9-]/g, ''), 10);
  return isFinite(parsed) ? parsed : fallback;
}

/**
 * Clamp a number between min and max boundaries.
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Determine if a value is a valid, finite number.
 */
export const isValidNumber = (value: unknown): value is number =>
  typeof value === 'number' && isFinite(value) && !isNaN(value);
