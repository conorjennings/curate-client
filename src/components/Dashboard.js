import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import FavoriteIcon from 'react-material-icons/icons/action/favorite';
import SlowIcon from 'react-material-icons/icons/action/schedule';
import SustainableIcon from 'react-material-icons/icons/action/cached';
import IndependentIcon from 'react-material-icons/icons/action/face';
import FlatButton from 'material-ui/FlatButton';
import Delete from './Delete'

var Masonry = require('react-masonry-component');

var masonryOptions = {
    transitionDuration: 0
};

// Theme import required to get Material-UI working

const Dashboard = ({retailProfiles, handleClick}) => {
  const retailProfileArray = retailProfiles
  console.log('retailProfiles from props ', retailProfileArray)

  const listItems = retailProfileArray.map((retailProfile) =>
    <div key={retailProfile.id}>
    <a href={retailProfile.siteUrl} target="_blank" rel="noopener noreferrer">{retailProfile.name}</a>
    <p>{retailProfile.notes}</p>
    <div>
    {retailProfile.vegan && <FavoriteIcon/>}
    {retailProfile.slow && <SlowIcon/>}
    {retailProfile.sustainable && <SustainableIcon/>}
    {retailProfile.independent && <IndependentIcon/>}
    </div>
    <Delete
      data={retailProfile.id}
      handleClick={() => handleClick(retailProfile.id)}
    />
    </div>
  )

  console.log('listItems is ', listItems)

  return (
  <Masonry>
    {listItems}
  </Masonry>
  );
}

export default Dashboard;
