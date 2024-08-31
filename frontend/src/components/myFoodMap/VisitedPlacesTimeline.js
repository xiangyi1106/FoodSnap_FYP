import React from 'react';
import './Timeline.css'; // Import the CSS file
// import './TimelineStyles.css'; // Import the CSS file
import { Card, CardContent, Typography, Button } from '@mui/material';

const VisitedPlacesTimeline = ({ places }) => {
  return (
    <div id="timeline_content" className="timeline_body">
      {/* <div className="timeline_header">
        <h1>Places Visited</h1>
      </div> */}
      <div className='timeline_wrapper'>
        <ul className="timeline">
          {places.map((place, index) => (
            <li key={index} className="event" data-date={place.date}>
              <h3>{place.location}</h3>
              <p>{place.snippet}</p>
              <button className="button-31" onClick={() => place.onViewPost(place.id)}>View Post</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    // <main>
    //   {places.map((place, index) => (
    //     <p key={index} className={`timeline-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6">{place.location}</Typography>
    //           <Typography variant="body2">{place.date}</Typography>
    //           <Typography variant="body1">{place.snippet}</Typography>
    //           <Button variant="contained" color="primary">View Post</Button>
    //         </CardContent>
    //       </Card>
    //     </p>
    //   ))}
    // </main>
  );
};

export default VisitedPlacesTimeline;
