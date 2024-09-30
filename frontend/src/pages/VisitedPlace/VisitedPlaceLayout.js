import React, { useEffect, useState } from 'react'
import VisitedPlaceGrid from './VisitedPlaceGrid'
import Book from './JourneyBook';
import VisitedPlaceCard from './VisitedPlaceCard';
import GameProfileCard from './GameProfileCard';
import MonthYearPicker from './MonthYearPicker';
import CustomCalendarHeader from './CustomCalendarHeader';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VisitedPlaceLayout({ user }) {

    const [posts, setPosts] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month());  // Make sure to call month() correctly with parentheses
    const [selectedYear, setSelectedYear] = useState(dayjs().year());

    const userId = user.id;
    const [visitedDates, setVisitedDates] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null); // Track the selected day

    const fetchPosts = async () => {
        // 
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/user/${userId}/location`, {
                params: {
                    month: selectedMonth + 1,  // Since months are 0-indexed in JS
                    year: selectedYear
                },
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });

            // Handle success (posts found)
            console.log('Posts with location:', response.data);
            setPosts(response.data); // Update the state with the response data
            // Use response.data to calculate visited dates directly
            if(response.data){
                const newVisitedDates = response.data.map((post) => new Date(post.createdAt).getDate());
                setVisitedDates(newVisitedDates); // Set the visited dates state
                console.log(newVisitedDates); // Log the correct dates
                  // Set the first visited date as the default selected day if any exist
                //   if (newVisitedDates.length > 0 && !selectedDay) {
                //     setSelectedDay(newVisitedDates[0]);
                // }
                if (newVisitedDates.length > 0) {
                    setSelectedDay(newVisitedDates[0]);
                }
            }else{
                //Clear if the data is empty
                setVisitedDates([]);
                setSelectedDay(null);
                setPosts([]);
                setFilteredPosts([]);
                setFormattedSelectedDate(null);

            }
           

        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Handle 404 (no posts found)
                console.log('No posts found for the specified month and year.');
                setPosts([]); // Set an empty state or show a message in the UI
                setVisitedDates([]);
                setSelectedDay(null);
                setFilteredPosts([]);
                setFormattedSelectedDate(null);

            } else {
                // Handle other errors (500, network issues, etc.)
                console.error('Error fetching posts with locations:', error);
                setPosts([]); // Set an empty state or show a message in the UI
                setVisitedDates([]);
                setSelectedDay(null);
                setFilteredPosts([]);
                setFormattedSelectedDate(null);


            }
        }
    };

    useEffect(() => {
        fetchPosts();
        console.log(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    // let filteredPosts = null;
    const [filteredPosts, setFilteredPosts] = useState([]); // Add state for filteredPosts
    const [formattedSelectedDate, setFormattedSelectedDate] = useState(null); // Add state for filteredPosts
     
    useEffect(() => {
        // Filter posts based on selected day
        if (selectedDay) {
            setFilteredPosts(posts.filter(post => new Date(post.createdAt).getDate() === selectedDay));
            setFormattedSelectedDate(dayjs(new Date(selectedYear, selectedMonth, selectedDay)).format('DD MMMM YYYY'));
        }
    }, [selectedDay, posts]); // Recalculate filteredPosts whenever selectedDay or posts change

    // const filteredPosts = useMemo(() => {
    //     if (selectedDay) {
    //         return posts.filter(post => new Date(post.createdAt).getDate() === selectedDay);
    //     }
    //     return [];
    // }, [selectedDay, posts]);
    const navigate = useNavigate();

    const handleClick = (postId) => {
        navigate(`/post/${postId}/${0}`);
    };

    return (
        <div className='search_venue'>
            <div className='map' style={{ height: '100vh' }}>
                <div className='month_selector source-sans-3-bold'>
                    <CustomCalendarHeader setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} />
                </div>
                <VisitedPlaceGrid year={selectedYear} month={selectedMonth} visits={visitedDates} onDayClick={setSelectedDay}/>
            </div>
            <div className='search_box' style={{ overflowY: 'scroll' }}>
                <div className='food_journey_info'>
                    <div className="page__content">
                        <h1 className="page__content-book-title">{user.name}'s Food Journey</h1>
                        <p className="page__content-author">{formattedSelectedDate ? formattedSelectedDate : ''}</p>
                        {/* <p className="page__content-author">Click on the date to see the details</p> */}
                        <p className="page__content-credits">Add a new food journey by creating a post with location tag!</p>
                    </div>
                    {filteredPosts && filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <VisitedPlaceCard
                                key={post._id} // Ensure a unique key is used for each item
                                imageUrl={post.media && post.media.length > 0 ? post.media[0].url : ''} // Check if media exists and get the first image URL
                                date={new Date(post.createdAt).toLocaleDateString()} // Convert the date to a readable format
                                title={post.text ? post.text : ''} // Check if post content exists, otherwise provide a fallback title
                                onClick={post.media && post.media.length > 0 ? () => handleClick(post._id) : null} // Only allow click if media exists
                            />
                        ))
                    ) : (
                        <div className='' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
                            <p>No post found</p>
                            <img src={`${process.env.PUBLIC_URL}/images/no-data.png`} alt="no-data" style={{ width: '60px', height: '60px' }} />
                            <p style={{ color: 'gray', fontSize: '0.85rem' }}>Add some post with location tag to view it in my food journey page</p>
                        </div>
                    )}
                    {/* Achievement like game profile record how many place visited */}
                    {/* <div className='game_profile_card_wrapper'>
                        <GameProfileCard />
                    </div> */}
                </div>

            </div>
        </div>
    )
}
