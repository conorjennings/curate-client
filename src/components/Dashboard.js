import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import mui from 'material-ui';
import FavoriteIcon from 'react-material-icons/icons/action/favorite';
import SlowIcon from 'react-material-icons/icons/action/schedule';
import SustainableIcon from 'react-material-icons/icons/action/cached';
import IndependentIcon from 'react-material-icons/icons/action/face';

// Theme import required to get Material-UI working

const Dashboard = ({retailProfiles}) => {

  const retailProfileArray = retailProfiles
  console.log('retailProfiles from props ', retailProfileArray)

  const listItems = retailProfileArray.map((retailProfile) =>
    <div key={retailProfile.id}>
    <a href={retailProfile.siteUrl}>{retailProfile.name}</a>
    <p>{retailProfile.notes}</p>
    <div>
    {retailProfile.vegan && <FavoriteIcon/>}
    {retailProfile.slow && <SlowIcon/>}
    {retailProfile.sustainable && <SustainableIcon/>}
    {retailProfile.independent && <IndependentIcon/>}
    </div>
    </div>
  )

  console.log('listItems is ', listItems)

  return (
  <Card className="container">
  <CardTitle title="Dashboard" subtitle="Cool stuff goes here." />
  <div>
    {listItems}
  </div>
  </Card>
  );
}

export default Dashboard;
