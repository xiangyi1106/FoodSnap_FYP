import "./style.css";
import { MDBBadge } from 'mdb-react-ui-kit';
import foodAds from '../../../data/home/foodAds';
import eventAds from '../../../data/home/eventAds';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function RightMenu() {
    return (
        <div className='right_menu'>
            <div className='heading'>Advertising</div>
            <div className='splitter1'></div>
            <div className="ads">
                {foodAds.slice(0, 2).map((link, i) => (
                    <div className="advertising hover_style_1" key={i}>
                        <div className="advertising_img">
                            <img src={link.image}></img>
                        </div>
                        <div className="advertising_details ">
                            <MDBBadge className='ms-2 advertising_badge' color='danger'>DISCOUNT {link.discount}%</MDBBadge>
                            <div className="advertising_name">{link.title} </div>
                            <div className="advertising_description">{link.description}</div>
                            <div className="advertising_view">View details</div>
                        </div>
                    </div>
                ))}
                {/* <div className="advertising hover_style_1">
                    <div className="advertising_img">
                        <img src="https://www.engelvoelkers.com/wp-content/uploads/2014/07/pizza-stock.jpg"></img>
                    </div>
                    <div className="advertising_details ">
                        <MDBBadge className='ms-2 advertising_badge' color='danger'>DISCOUNT 10%</MDBBadge>
                        <div className="advertising_name">Delicious Pizza </div>
                        <div className="advertising_description">Lorem ipsum is a placeholder text commonly used in publishing and graphic design to demonstrate the visual form of a document or a typeface without relying on meaningful content1234. It is essentially nonsense text that still gives an idea of what real words will look like in the final product3. The phrase "lorem ipsum" derives from the Latin phrase "dolorem ipsum," which translates to "pain itself"2. </div>
                        <div className="advertising_view">View details</div>
                    </div>
                </div> */}
            </div>
            <div className='heading'>Event</div>
            <div className='splitter1'></div>
            <div className="ads">
                {eventAds.slice(0, 2).map((link, i) => (
                    <div className="advertising hover_style_1" key={i}>
                        <div className="advertising_img">
                            <img src={link.image}></img>
                        </div>
                        <div className="advertising_details ">
                            <MDBBadge className='ms-2 advertising_badge'><CalendarMonthIcon style={{fontSize:"small", marginRight:"3px", position:"relative", bottom:"1px"}}/>{link.date}</MDBBadge>
                            <div className="advertising_name">{link.title} </div>
                            <div className="advertising_description">{link.description}</div>
                            <div className="advertising_view">View details</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
