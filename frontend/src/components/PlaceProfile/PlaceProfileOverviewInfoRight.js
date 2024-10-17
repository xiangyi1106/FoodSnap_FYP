export default function PlaceProfileOverviewInfoRight() {
//not use
    return (
        <div className="profile_card">
            <div className="info_profile">
                <div className="info_profile_title logo_color_text source-sans-3-bold">Telephone</div>
            </div>
            <span className="info_profile_title_text">0127127492</span>
            <div className="divider_split"></div>

            <div className="info_profile">
                <div className="info_profile_title logo_color_text source-sans-3-bold">Website</div>
            </div>
            <span className="info_profile_title_text"><a href="https://www.tribus.com" target="_blank" rel="noopener noreferrer">
                www.tribus.com
            </a></span>
            <div className="divider_split"></div>

            <div className="info_profile">
                <div className="info_profile_title logo_color_text source-sans-3-bold">Address</div>
            </div>
            <span className="info_profile_title_text">
                28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor
            </span>
            <div className="divider_split"></div>

            <div className="info_profile">
                <div className="info_profile_title logo_color_text source-sans-3-bold">Openning Hours</div>
            </div>
            <div className="opening_hour">
                <div className="opening_hour_days">
                    <div className="opening_hour_day">Mon</div>
                    <div className="opening_hour_day">Tue</div>
                    <div className="opening_hour_day">Wed</div>
                    <div className="opening_hour_day">Thu</div>
                    <div className="opening_hour_day">Fri</div>
                    <div className="opening_hour_day">Sat</div>
                    <div className="opening_hour_day">Sun</div>
                </div>
                <div className="opening_hour_days">
                    <div className="opening_hour_time">11:30 AM - 12:30 AM</div>
                    <div className="opening_hour_time">11:30 AM - 12:30 AM</div>
                    <div className="opening_hour_time">11:30 AM - 12:30 AM</div>
                    <div className="opening_hour_time">11:30 AM - 12:30 AM</div>
                    <div className="opening_hour_time">11:30 AM - 12:30 AM</div>
                    <div className="opening_hour_time">11:30 AM - 12:30 AM</div>
                    <div className="opening_hour_time">11:30 AM - 12:30 AM</div>
                </div>
            </div>
        </div>
    );
}
