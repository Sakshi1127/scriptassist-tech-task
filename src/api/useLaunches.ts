import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchLaunches = async () => {
  const res = await axios.get('https://api.spacexdata.com/v5/launches');
  return res.data;
};

export const useLaunches = () => {
  return useQuery(['launches'], fetchLaunches);
};
