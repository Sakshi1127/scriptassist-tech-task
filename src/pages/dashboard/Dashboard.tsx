import { useLaunches } from '../../api/useLaunches';
import {
  Title,
  Table,
  Loader,
  TextInput,
  Select,
  Pagination,
  Group,
  Paper,
  Center,
  Text,
  Badge,
  Image,
  Box,
  Tooltip
} from '@mantine/core';
import { useMemo, useState } from 'react';

const Dashboard = () => {
  const { data = [], isLoading } = useLaunches();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const filtered = useMemo(() => {
    return data.filter((launch: any) =>
      launch.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a: any, b: any) => {
      if (sortField === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortField === 'date') {
        return new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime();
      }
      return 0;
    });
  }, [filtered, sortField]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage]);

  return (
    <Paper shadow="md" p="xl" m="xl" radius="md">
      <Title order={2} mb="xs" align="center" style={{ color: '#232F53' }}>
        🚀 SpaceX Launches 🚀
      </Title>
      <Text mb="lg" align="center" style={{ fontSize: '1.5rem', color: '#555' }}>
        Explore the latest launches from SpaceX with mission insights and launch history.
      </Text>

      <Group mb="md" position="apart">
        <TextInput
          placeholder="Search mission..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Select
          data={[
            { value: 'name', label: 'Sort by Name' },
            { value: 'date', label: 'Sort by Date' },
          ]}
          value={sortField}
          onChange={(value) => setSortField(value!)}
        />
      </Group>

      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th style={{width: '60px' }}>#</th>
            <th style={{width: '300px' }}>Mission Name</th>
            <th style={{width: '200px' }}>Flight Number</th>
            <th>Launch Date</th>
            <th style={{width:'400px'}}>Fairings</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7}>
                <Center py="lg">
                  <Loader size="lg" />
                </Center>
              </td>
            </tr>
          ) : paginated.length > 0 ? (
            paginated.map((launch: any, index: number) => (
              <tr key={launch.id}>
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td>{launch.name}</td>
                <td>{launch.flight_number}</td>
                <td>
  {new Date(launch.date_utc).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}
</td>
                <td>
  {launch.fairings ? (
     <Group spacing="xs">
     <Tooltip label="Was this fairing reused?" withArrow>
       <Badge
         color={launch.fairings?.reused ? 'blue' : 'gray'}
         leftSection="♻️"
         variant="light"
       >
         {launch.fairings?.reused ? 'Reused' : 'New'}
       </Badge>
     </Tooltip>
     <Tooltip label="Did SpaceX attempt to recover the fairing?" withArrow>
       <Badge
         color={launch.fairings?.recovery_attempt ? 'yellow' : 'gray'}
         leftSection="🎯"
         variant="light"
       >
         {launch.fairings?.recovery_attempt ? 'Attempted' : 'No Attempt'}
       </Badge>
     </Tooltip>
     <Tooltip label="Was the fairing successfully recovered?" withArrow>
       <Badge
         color={launch.fairings?.recovered ? 'green' : 'red'}
         leftSection="✅"
         variant="light"
       >
         {launch.fairings?.recovered ? 'Recovered' : 'Lost'}
       </Badge>
     </Tooltip>
   </Group>
  ) : (
    <Text color="dimmed" size="sm">
      -
    </Text>
  )}
</td>

                <td>
  {launch.success ? (
    <Badge color="green" variant="filled">
      Success
    </Badge>
  ) : (
    <Tooltip
      label={launch.failures?.[0]?.reason || 'Unknown failure reason'}
      withArrow
      position="top"
      style={{ width: '400px', height: 'auto', whiteSpace: 'normal' }}
    >
      <Badge color="red" variant="filled" style={{ cursor: 'help' }}>
        Failed
      </Badge>
    </Tooltip>
  )}
</td>

               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <Center py="lg">
                  <Text>No results found</Text>
                </Center>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {!isLoading && sorted.length > pageSize && (
        <Group position="right" mt="md">
          <Pagination
            total={Math.ceil(sorted.length / pageSize)}
            value={currentPage}
            onChange={setCurrentPage}
            radius="md"
          />
        </Group>
      )}
    </Paper>
  );
};

export default Dashboard;
