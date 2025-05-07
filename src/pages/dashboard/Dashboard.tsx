import { useLaunches } from "../../api/useLaunches";
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
  Modal,
  Stack,
  Tooltip,
  Button,
} from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { ArrowUp, ArrowDown, Filter } from "react-feather";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useLaunches();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // New states for filter modal and filter values
  const [opened, setOpened] = useState(false);
  const [tempStatusFilter, setTempStatusFilter] = useState<string[]>([]);
  const [tempFairingFilter, setTempFairingFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]); // success or failed
  const [fairingFilter, setFairingFilter] = useState<string[]>([]);

  const pageSize = 10;
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // Apply filters to the data
  const filtered = useMemo(() => {
    return data.filter((launch: any) => {
      const matchesSearch = launch.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusFilter.length
        ? statusFilter.includes(launch.success ? "success" : "failed")
        : true;
        const fairingTags: string[] = [];
        if (launch.fairings) {
          fairingTags.push(launch.fairings.reused ? "reused" : "new");
          fairingTags.push(launch.fairings.recovery_attempt ? "attempt" : "no attempt");
          fairingTags.push(launch.fairings.recovered ? "recovered" : "lost");
        }
    
        const matchesFairing =
          fairingFilter.length === 0
            ? true
            : fairingFilter.every((filterVal) => fairingTags.includes(filterVal));
    

      return matchesSearch && matchesStatus && matchesFairing;
    });
  }, [data, search, statusFilter, fairingFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a: any, b: any) => {
      let result = 0;
      if (sortField === "name") {
        result = a.name.localeCompare(b.name);
      } else if (sortField === "date") {
        result =
          new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime();
      }
      return sortDirection === "asc" ? result : -result;
    });
  }, [filtered, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage]);

  const resetFilter=()=>{
    setTempFairingFilter([])
    setTempStatusFilter([])
    setStatusFilter([])
    setFairingFilter([])
    setOpened(false) 
  }

  return (
    <Paper shadow="md" p="lg" m="lg" radius="md">
      <div>
        <Group position="right">
          <Button mt="xs" onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      </div>
      <Title order={2} mb="xs" align="center" style={{ color: "#232F53" }}>
        🚀 SpaceX Launches 🚀
      </Title>
      <Text
        mb="lg"
        align="center"
        style={{ fontSize: "1.5rem", color: "#555" }}
      >
        Explore the latest launches from SpaceX with mission insights and launch
        history.
      </Text>

      <Group mb="md" position="apart">
        <TextInput
          placeholder="Search mission..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Button
          mt="xs"
          variant="outline"
          leftIcon={<Filter size={16} />}
          onClick={() => setOpened(true)}
        >
          Filters
        </Button>
      </Group>

      <Table highlightOnHover withBorder>
        <thead style={{ backgroundColor: "#e7f3ff", color: "#1c3f60" }}>
          <tr>
            <th style={{ width: "100px" }}>#</th>
            <th
              style={{ width: "400px", cursor: "pointer" }}
              onClick={() => handleSort("name")}
            >
              Mission Name{" "}
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  marginLeft: "4px",
                }}
              >
                {sortDirection === "asc" && (
                  <ArrowUp size={18} strokeWidth={2.5} color="#1c3f60" />
                )}
                {sortDirection == "desc" && (
                  <ArrowDown size={18} strokeWidth={2.5} color="#1c3f60" />
                )}
              </span>
            </th>
            <th style={{ width: "400px" }}>Rocket ID</th>
            <th style={{ width: "250px" }}>Flight Number</th>
            <th
              style={{ width: "300px", cursor: "pointer" }}
              onClick={() => handleSort("date")}
            >
              Launch Date{" "}
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  marginLeft: "4px",
                  marginTop: "6px",
                }}
              >
                {sortDirection === "asc" && (
                  <ArrowUp size={18} strokeWidth={2.5} color="#1c3f60" />
                )}
                {sortDirection == "desc" && (
                  <ArrowDown size={18} strokeWidth={2.5} color="#1c3f60" />
                )}
              </span>
            </th>

            <th style={{ width: "400px", paddingLeft: "79px" }}>Fairings</th>
            <th style={{ width: "200px" }}>Status</th>
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
              <tr
                key={launch.id}
                onClick={() =>
                  window.open(`/rocket/${launch.rocket}`, "_blank")
                } // Navigate to rocket page
                style={{ cursor: "pointer" }}
              >
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td>{launch.name}</td>
                <td>{launch.rocket}</td>
                <td>{launch.flight_number}</td>
                <td>
                  {new Date(launch.date_utc).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {launch.fairings ? (
                    <Group spacing="xs">
                      <Tooltip label="Was this fairing reused?" withArrow>
                        <Badge
                          color={launch.fairings?.reused ? "blue" : "gray"}
                          variant="light"
                        >
                          {launch.fairings?.reused ? "Reused" : "New"}
                        </Badge>
                      </Tooltip>
                      <Tooltip
                        label="Did SpaceX attempt to recover the fairing?"
                        withArrow
                      >
                        <Badge
                          color={
                            launch.fairings?.recovery_attempt
                              ? "yellow"
                              : "gray"
                          }
                          variant="light"
                        >
                          {launch.fairings?.recovery_attempt
                            ? "Attempted"
                            : "No Attempt"}
                        </Badge>
                      </Tooltip>
                      <Tooltip
                        label="Was the fairing successfully recovered?"
                        withArrow
                      >
                        <Badge
                          color={launch.fairings?.recovered ? "green" : "red"}
                          variant="light"
                        >
                          {launch.fairings?.recovered ? "Recovered" : "Lost"}
                        </Badge>
                      </Tooltip>
                    </Group>
                  ) : (
                    <Text
                      color="dimmed"
                      size="sm"
                      style={{ paddingLeft: "79px" }}
                    >
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
                      label={
                        launch.failures?.[0]?.reason || "Unknown failure reason"
                      }
                      withArrow
                      position="top"
                      style={{
                        width: "400px",
                        height: "auto",
                        whiteSpace: "normal",
                      }}
                    >
                      <Badge
                        color="red"
                        variant="filled"
                        style={{ cursor: "help" }}
                      >
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

      {/* Filter Modal */}
      <Modal
        opened={opened}
        onClose={()=>resetFilter()}
        title={
          <Text size="xl" fw={700}>
            Filters
          </Text>
        }
        size="md"
        padding="xl" // Increase modal padding
        styles={{
          body: { paddingTop: 24, paddingBottom: 24 },
        }}
      >
        <Stack spacing="xs">
          <MultiSelect
            label="Status"
            placeholder="Select Status"
            data={["success", "failed"]}
            value={tempStatusFilter}
            onChange={setTempStatusFilter}
          />

          <MultiSelect
            label="Fairings"
            placeholder="Select Fairing Status"
            data={[
              "new",
              "reused",
              "attempt",
              "no attempt",
              "recovered",
              "lost",
            ]}
            value={tempFairingFilter}
            onChange={setTempFairingFilter}
            dropdownPosition="bottom" // force dropdown to open downward
            withinPortal // renders in a portal to avoid being clipped
            maxDropdownHeight={200} // optional: to limit height and enable scroll
          />
        </Stack>
        <Group position="right" mt="xl" spacing="sm">
          <Button
            variant="outline"
            onClick={() => resetFilter()}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setStatusFilter(tempStatusFilter);
              setFairingFilter(tempFairingFilter);
              setOpened(false);
            }}
          >
            Apply
          </Button>
        </Group>
      </Modal>
    </Paper>
  );
};

export default Dashboard;
