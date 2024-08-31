import { InfoCard } from "./InfoCard";
import { InfoList } from "./InfoList";

export default function PlaceProfileOverviewInfoLeftPart({ aboutText, signatureDishesText, otherInfo }) {
    return (
      <div>
        <InfoCard title="About">
          <span className="info_profile_title_text">
            {aboutText}
          </span>
        </InfoCard>
  
        <InfoCard title="Signature Dishes">
          <span>
            {signatureDishesText}
          </span>
        </InfoCard>
  
        <InfoCard title="Other Information">
          <InfoList items={otherInfo} />
        </InfoCard>
      </div>
    );
  }