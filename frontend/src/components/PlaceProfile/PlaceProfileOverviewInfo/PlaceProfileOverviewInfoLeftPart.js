import { InfoCard } from "./InfoCard";
import { PlaceProfileOverviewOtherInfoList } from "./PlaceProfileOverviewOtherInfoList";

export default function PlaceProfileOverviewInfoLeftPart({ foodVenue }) {
  // Transform otherinfo into an array of items with text and status
  const otherInfoItems = Object.entries(foodVenue?.otherinfo[0] || {})
  .filter(([key]) => key !== '_id') // exclude _id
  .map(
    ([key, value]) => ({
      text: key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()), // format text
      status: value,
    })
  );

  return (
    <div>
      <InfoCard title="About">
        <span className="info_profile_title_text">
          {foodVenue?.description || 'No description added yet.'}
        </span>
      </InfoCard>

      {/* <InfoCard title="Signature Dishes">
        <span>
          {foodVenue?.description || 'No description added yet.'}
        </span>
      </InfoCard> */}

      <InfoCard title="Other Information">
        <PlaceProfileOverviewOtherInfoList items={otherInfoItems} />
      </InfoCard>
    </div>
  );
}