// src/api/useRocketDetails.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRocket = async (id: string) => {
  const res = await axios.get(`https://api.spacexdata.com/v4/rockets/${id}`);
  return res.data;
};

export const useRocketDetails = (id: string) => {
  return useQuery(['rocket', id], () => fetchRocket(id), {
    enabled: !!id, 
  });
};
