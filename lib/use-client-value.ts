"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Membaca nilai yang hanya ada di browser (sessionStorage, query string) tanpa
 * memicu setState di dalam effect. Saat render di server, `serverFallback`
 * yang dipakai, lalu nilai aslinya masuk waktu hydration.
 *
 * `read` harus mengembalikan nilai primitif — perbandingannya pakai Object.is.
 */
export function useClientValue<T>(read: () => T, serverFallback: T): T {
  return useSyncExternalStore(noopSubscribe, read, () => serverFallback);
}
