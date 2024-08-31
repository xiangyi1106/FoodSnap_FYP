export const InfoCard = ({ title, children }) => (
    <div className="profile_card">
        <div className="info_profile">
            <div className="info_profile_title logo_color_text source-sans-3-bold">{title}</div>
        </div>
        {children}
    </div>
);