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
  // console.log('retailProfiles from props ', retailProfileArray)

  const listItems = retailProfileArray.map((retailProfile) =>
    <div className="profile-card" key={retailProfile.id}>
    <div className="profile-card-content">
    <div>
    <a href={retailProfile.siteUrl} target="_blank" rel="noopener noreferrer">{retailProfile.name}</a>
    <h3>Notes</h3>
    <p className="profile-notes">{retailProfile.notes}</p>
    <div className="profile-icons">
    <div className="profile-icon">
    {retailProfile.vegan && <FavoriteIcon/>}
    </div>
    <div className="profile-icon">
    {retailProfile.slow && <SlowIcon/>}
    </div>
    <div className="profile-icon">
    {retailProfile.sustainable && <SustainableIcon/>}
    </div>
    <div className="profile-icon">
    {retailProfile.independent && <IndependentIcon/>}
    </div>
    </div>
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
    </div>
  )

  return (
  <div className="profile-container">
  <Masonry>
    {listItems}
  </Masonry>
  </div>
  );
}

export default Dashboard;
