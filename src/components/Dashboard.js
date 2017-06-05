import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
// Theme import required to get Material-UI working

const Dashboard = ({retailProfiles}) => {

  const retailProfileArray = retailProfiles
  console.log('retailProfiles from props ', retailProfileArray)

  const listItems = retailProfileArray.map((retailProfile) =>
    <li key={retailProfile.id}>{retailProfile.name}</li>
  )

  console.log('listItems is ', listItems)

  return (
  <Card className="container">
  <CardTitle title="Dashboard" subtitle="Cool stuff goes here." />
  <ul>
    {listItems}
  </ul>
  </Card>
  );
}

export default Dashboard;
