import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilCheckAlt, cilX } from '@coreui/icons';

// Reusable ProfileCard Component
const ProfileCard = ({ title, children }) => (
  <div className="profile_card">
    <div className="info_profile">
      <div className="info_profile_title logo_color_text source-sans-3-bold">{title}</div>
    </div>
    {children}
  </div>
);

// Reusable InfoItem Component
const InfoItem = ({ label, value }) => (
  <>
    <ProfileCard title={label}>
      <span className="info_profile_title_text">{value}</span>
    </ProfileCard>
    <div className="divider_split"></div>
  </>
);

// Reusable OpeningHours Component
const OpeningHours = ({ hours }) => (
  <ProfileCard title="Opening Hours">
    <div className="opening_hour">
      {hours.map((hour, index) => (
        <div className="opening_hour_days" key={index}>
          <div className="opening_hour_day">{hour.day}</div>
          <div className="opening_hour_time">{hour.time}</div>
        </div>
      ))}
    </div>
  </ProfileCard>
);

export default function PlaceProfileOverviewInfoRightPart({ telephone, website, address, hours }) {
  return (
    <div>
      <InfoItem label="Telephone" value={telephone} />
      <InfoItem label="Website" value={website} />
      <InfoItem label="Address" value={address} />
      <OpeningHours hours={hours} />
    </div>
  );
}
