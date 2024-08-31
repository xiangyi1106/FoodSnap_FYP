export default function PlaceProfileOverviewInfoRight() {

    // const initial = {
    //     telephone: details?.telephone ? details.telephone : "012-3456789",
    //     website: details?.website ? details.website : "www.google.com",
    //     address: details?.address ? details.address : "49, Jalan Bukit Aliff 4 Taman Damansara Aliff 81200 Johor Bahru, Johor Malaysia",
    // };
    // const [infos, setInfos] = useState(initial);

    return (
        <div className="profile_card">
            {/* <div className="profile_card_header">Information</div> */}
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
            {/* <div className="info_profile_title_text">Mon 2:00 PM - 10:00 PM</div>
            <div className="info_profile_title_text">Tue 2:00 PM - 10:00 PM</div>
            <div className="info_profile_title_text">Wed 2:00 PM - 10:00 PM</div>
            <div className="info_profile_title_text">Thu 2:00 PM - 10:00 PM</div>
            <div className="info_profile_title_text">Fri 2:00 PM - 10:00 PM</div>
            <div className="info_profile_title_text">Sat 2:00 PM - 10:00 PM</div>
            <div className="info_profile_title_text">Sun 2:00 PM - 10:00 PM</div> */}
        </div>
    );
}
