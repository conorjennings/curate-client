import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
// Theme import required to get Material-UI working

const HomePage = () => (
  <Card className="container">
    <CardTitle title="React Application" subtitle="This is the home page." />
  </Card>
);

export default HomePage;
