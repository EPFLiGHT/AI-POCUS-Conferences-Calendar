/**
 * useConferences Hook
 *
 * Custom hook that fetches and manages conference data from multiple YAML sources.
 * Consolidates conferences, summits, and workshops into a unified list.
 *
 * @returns Object with conferences array, loading state, and error message
 */

import { useState, useEffect } from 'react';
import { parseConferences } from '@/utils/parser';
import type { Conference } from '@/types/conference';

interface UseConferencesReturn {
  conferences: Conference[];
  loading: boolean;
  error: string | null;
}

export function useConferences(): UseConferencesReturn {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const [conferencesRes, summitsRes, workshopsRes] = await Promise.all([
          fetch(`${basePath}/data/conferences.yaml`),
          fetch(`${basePath}/data/summits.yaml`),
          fetch(`${basePath}/data/workshops.yaml`),
        ]);

        if (!conferencesRes.ok || !summitsRes.ok || !workshopsRes.ok) {
          throw new Error('Failed to fetch data files');
        }

        const [conferencesText, summitsText, workshopsText] = await Promise.all([
          conferencesRes.text(),
          summitsRes.text(),
          workshopsRes.text(),
        ]);

        const conferencesData = parseConferences(conferencesText);
        const summitsData = parseConferences(summitsText);
        const workshopsData = parseConferences(workshopsText);

        const allData = [...conferencesData, ...summitsData, ...workshopsData];
        setConferences(allData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { conferences, loading, error };
}
