
import { useState, useEffect } from 'react';
import { server_calls } from '../api/server';

interface ChildInfo {
  child_id: number;
  username: string;
  img: string;
  role: string;
  chores: string[];
  wallet: {
    amount: number;
  };
  goals: {
    id: number;
    name: string;
    amount: number;
    description: string;
    img: string;
    link: string;
  }[];
}

interface UseGetChildInfoResult {
  childInfo: ChildInfo[] | null;
  loading: boolean;
  error: Error | null;
}

export const useGetChildInfo = (parentID: string): UseGetChildInfoResult => {
  const [childInfo, setChildInfo] = useState<ChildInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!parentID) return;

    const fetchData = async () => {
      try {
        const result = await server_calls.get(parentID);
        setChildInfo(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parentID]);

  return { childInfo, loading, error };
};


