import { useParams } from 'react-router-dom';
import { Loader, Title, Text, Paper, Button, Collapse, Card, Image, Grid, Col,Group } from '@mantine/core';
import { useRocketDetails } from '../../api/useRocketDetails';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { ChevronDown, ChevronUp } from 'react-feather';

const RocketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useRocketDetails(id!);
  const [isPayloadOpen, setIsPayloadOpen] = useState(false);

 const logout = useAuthStore((state) => state.logout);
 
   const handleLogout = () => {
     logout();
     navigate('/login');
   };

  if (isLoading) {
    return (
      <Paper p="lg" m="lg" shadow="md" radius="md" style={{ backgroundColor: '#e9ecef', height: '90vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader size="xl" />
      </div>
    </Paper>
    );
  }

  if (error) return <Text color="red">Failed to load rocket details.</Text>;


  return (
    <Paper p="lg" m="lg" shadow="md" radius="md" style={{ backgroundColor: '#e9ecef' }}>
       <div >
              <Group position="right">
                <Button mt="xs" onClick={handleLogout}>
                  Logout
                </Button>
              </Group>
            </div>
      <Title order={2} align="center" style={{ marginBottom: '20px' }}>
        Rocket Details
      </Title>

      <Grid gutter="md">
        {/* Image Section */}
        <Col span={12} md={5}>
          {data.flickr_images.length > 0 && (
            <Image src={data.flickr_images[0]} alt="Rocket" radius="md" />
          )}
        </Col>

        {/* Rocket Details Section */}
        <Col span={12} md={7}>
          <Card radius="md" shadow="sm" padding="lg" style={{ backgroundColor: '#ffffff' }}>
            <Title order={3}>{data.name}</Title>
            <Text size="sm" mt="sm">{data.description}</Text>
            <Text mt="md"><strong>Company:</strong> {data.company}</Text>
            <Text><strong>Country:</strong> {data.country}</Text>
            <Text><strong>Cost per Launch:</strong> ${data.cost_per_launch.toLocaleString()}</Text>
            <Text><strong>First Flight:</strong> {new Date(data.first_flight).toLocaleDateString()}</Text>
            <Text><strong>Success Rate:</strong> {data.success_rate_pct}%</Text>
            <Text mt="md"><strong>Height:</strong> {data.height.meters} meters ({data.height.feet} feet)</Text>
            <Text><strong>Diameter:</strong> {data.diameter.meters} meters ({data.diameter.feet} feet)</Text>
            <Text><strong>Mass:</strong> {data.mass.kg} kg ({data.mass.lb} lbs)</Text>
            <Text><strong>Stages:</strong> {data.stages}</Text>
            <Text><strong>Boosters:</strong> {data.boosters}</Text>
            
            {/* Expandable Payload Section */}
            <Button 
              variant="light" 
              onClick={() => setIsPayloadOpen(!isPayloadOpen)} 
              rightIcon={isPayloadOpen ? <ChevronUp /> : <ChevronDown />} 
              mt="md"
              fullWidth
            >
              {isPayloadOpen ? 'Hide Payload Details' : 'Show Payload Details'}
            </Button>
            <Collapse in={isPayloadOpen}>
              <Card mt="sm" p="lg" radius="md" shadow="xs" style={{ backgroundColor: '#f1f3f5' }}>
                <Title order={4}>Payload Details</Title>
                {data.payload_weights.map((payload:any) => (
                  <Text key={payload.id} mt="sm">
                    <strong>{payload.name}:</strong> {payload.kg} kg ({payload.lb} lbs)
                  </Text>
                ))}
              </Card>
            </Collapse>
          </Card>
        </Col>
      </Grid>
    </Paper>
  );
};

export default RocketDetails;
