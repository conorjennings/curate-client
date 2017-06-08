import React from 'react';
import FavoriteIcon from 'react-material-icons/icons/action/favorite';
import SlowIcon from 'react-material-icons/icons/action/schedule';
import SustainableIcon from 'react-material-icons/icons/action/cached';
import IndependentIcon from 'react-material-icons/icons/action/face';
import {Card, CardActions} from 'material-ui/Card';
import Delete from './Delete'
import Edit from './Edit'

var Masonry = require('react-masonry-component');

// Theme import required to get Material-UI working

const Dashboard = ({retailProfiles, handleClick, handleEdit, handleDialogOpen}) => {
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
    <Edit
      data={retailProfile.id}
      handleEdit={() => handleEdit(retailProfile.id)}
      handleDialogOpen={handleDialogOpen}
      />
    <Delete
      data={retailProfile.id}
      handleClick={() => handleClick(retailProfile.id)}
    />
    </div>
  )

  return (
  <Masonry>
    {listItems}
  </Masonry>
  );
}

export default Dashboard;
