
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilCheckAlt, cilX } from '@coreui/icons';
export default function PlaceProfileOverviewInfoLeft() {
    return (
        <div>
            <div className="profile_card">
                <div className="info_profile">
                    <div className="info_profile_title logo_color_text source-sans-3-bold">About</div>
                </div>
                <span className="info_profile_title_text">Lorem ipsum dolor sit amet. Qui maiores necessitatibus et dolor corporis qui repellat quisquam qui amet voluptatem id beatae doloribus qui veritatis culpa nam magnam quas. In recusandae eius rem rerum minus rem aliquid repellat ex officia atque et quis nisi At rerum voluptas.

                    Aut pariatur magnam ut perferendis quia sed reiciendis voluptatum ut velit accusantium eum reiciendis libero et omnis natus qui facilis omnis? Est maiores maiores aut distinctio repellat rem enim deserunt ut recusandae distinctio quo sapiente blanditiis.</span>
            </div>
            <div className="profile_card">
                <div className="info_profile">
                    <div className="info_profile_title logo_color_text source-sans-3-bold">Signature Dishes</div>
                </div>
                <span>Lorem ipsum dolor sit amet. Qui maiores necessitatibus et dolor corporis qui repellat quisquam qui amet voluptatem id beatae doloribus qui veritatis culpa nam magnam quas.</span>
            </div>
            <div className="profile_card">
                <div className="info_profile">
                    <div className="info_profile_title logo_color_text source-sans-3-bold">Other Information</div>
                </div>
                <div className="other_info">
                    <div className="other_info_left">
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Halal Options
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Vegetarian  Options
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Air Conditioning
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Free Wi-Fi
                            </div>
                        </div>
                        
                        
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilX} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Alcoholic Drinks
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Wheelchair Accessible
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Dogs Allowed
                            </div>
                        </div>
                    </div>
                    <div className="other_info_right">
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                            Accepts Debit Cards
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                            Accepts Credit Cards
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                            Accepts TNG/Boost/QR Payment
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                            10% Service Charge
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                10% SST
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Needs Reservations
                            </div>
                        </div>
                        <div className="other_info_text_wrapper">
                            <div className="other_info_text_icon">
                                <CIcon icon={cilCheckAlt} className='icon_size_22' />
                            </div>
                            <div className="other_info_text">
                                Offers Takeout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
