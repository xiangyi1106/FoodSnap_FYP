
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilCheckAlt, cilX } from '@coreui/icons';

export const InfoItem = ({ status, text }) => {
    const icon = status === 'Yes' ? cilCheckAlt : cilX;
  
    return (
      <div className="other_info_text_wrapper">
        <div className="other_info_text_icon">
          <CIcon icon={icon} className='icon_size_22' />
        </div>
        <div className="other_info_text">
          {text}
        </div>
      </div>
    );
  };