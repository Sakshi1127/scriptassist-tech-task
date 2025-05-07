// Example of useRocketLaunches Hook
import { useQuery } from '@tanstack/react-query';

export const useRocketLaunches = (rocketId: string) => {
  return useQuery(
    ['rocketLaunches', rocketId],
    () => fetch(`https://api.spacexdata.com/v4/launches?rocket=${rocketId}`).then(res => res.json()),
    {
      enabled: !!rocketId,  // Ensure the hook runs only if rocketId is available
    }
  );
};
