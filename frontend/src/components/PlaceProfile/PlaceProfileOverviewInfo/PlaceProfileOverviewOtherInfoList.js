import { InfoItem } from "./InfoItem";

export const PlaceProfileOverviewOtherInfoList = ({ items }) => {
    // Filter out items with noInfo status
    const filteredItems = items.filter(item => item.status !== 'noInfo');
    return (
      <div className="other_info">
        <div className="other_info_left">
          {filteredItems.slice(0, Math.ceil(filteredItems.length / 2)).map((item, index) => (
            <InfoItem key={index} status={item.status} text={item.text} />
          ))}
        </div>
        <div className="other_info_right">
          {filteredItems.slice(Math.ceil(filteredItems.length / 2)).map((item, index) => (
            <InfoItem key={index} status={item.status} text={item.text} />
          ))}
        </div>
      </div>
    );
  };