import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string | undefined | null) {
  let parsed = amount
  if (typeof parsed === 'string') parsed = parseFloat(parsed)
  if (parsed === null || parsed === undefined) return undefined;
  if (isNaN(parsed)) return undefined;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parsed)
}

export function formatFrequency(frequencyInHours: number | undefined) {
  if (frequencyInHours === undefined) return undefined
  let parsed = frequencyInHours


  if (parsed >= 1920) {
    return new Intl.NumberFormat('en-US', {
      style: 'unit',
      unit: 'year',
      unitDisplay: 'short',
    }).format(parsed / 1920)
  }

  if (parsed >= 160) {
    return new Intl.NumberFormat('en-US', {
      style: 'unit',
      unit: 'month',
      unitDisplay: 'long',
    }).format(parsed / 160)
  }

  if (parsed >= 40) {
    return new Intl.NumberFormat('en-US', {
      style: 'unit',
      unit: 'week',
      unitDisplay: 'long',
    }).format(parsed / 40)
  }

  if (parsed >= 8) {
    return new Intl.NumberFormat('en-US', {
      style: 'unit',
      unit: 'day',
      unitDisplay: 'short',
    }).format(parsed/8)
  } 

  return new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'hour',
    unitDisplay: 'short',
  }).format(parsed)
}