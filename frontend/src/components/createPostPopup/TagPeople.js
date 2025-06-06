import React from 'react'
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilLocationPin } from '@coreui/icons';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TagNames from './TagNames';
import CircularProgress from '@mui/material/CircularProgress';

export default function TagPeople({ page, setPage, setSelectedNames, selectedNames, filteredUsers, setFilteredUsers, isLoading, setIsLoading }) {

    const [users, setUsers] = useState([]);
    const { user } = useSelector((user) => ({ ...user }));

    useEffect(() => {
        if (page === 2) {
            // Fetch all users from backend MongoDB
            fetchUsers();
        }
    }, [page]); // Dependency array includes page

    useEffect(() => {
        // Update filteredUsers whenever selectedNames or users changes
        const updatedUsers = users.filter(user => 
            !selectedNames.some(selectedUser => selectedUser.username === user.username)
        );
        setFilteredUsers(updatedUsers);
    }, [selectedNames, users]);

    const fetchUsers = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/searchPeople`
            , {
                headers: {
                    'user_id': user?.id,
                }
            })
            .then(response => response.json())
            .then(data => {
                setUsers(data); // Set all users
                if (selectedNames.length > 0) {
                    const updatedFilteredUsers = users.filter(user => !selectedNames.some(selectedUser => selectedUser.username === user.username));
                    setFilteredUsers(updatedFilteredUsers);
                } else {
                    setFilteredUsers(data); // Set filtered users initially
                }
                setIsLoading(false);
            })
            .catch(error => {console.error('Error fetching users:', error); setIsLoading(false);});
    };

    const handlePeopleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().startsWith(searchText) &&
            !selectedNames.some(selectedUser => selectedUser.username === user.username)
        );
        setFilteredUsers(filtered);
    };

    const handleNameClick = (user) => {
        setSelectedNames([...selectedNames, user]);
    };

    const handleDelete = (usernameToDelete) => {
        setSelectedNames(prevSelectedNames => prevSelectedNames.filter(user => user.username !== usernameToDelete));
    };

    return (
        <div style={{ height: "400px" }}>
            <div className="create_post_popup_header" style={{ justifyContent: "center" }}>
                <div><CIcon icon={cilArrowLeft} className="icon_size_22 icon_button exit_icon_left" onClick={() => setPage(0)} /></div>
                <span className="create_post_popup_header_title" style={{ textAlign: "center" }}>Tag People</span>
            </div>
            <div className='location_input'>
                <div className="search search1">
                    <input autoFocus={true} type="text" placeholder="Search for people" className="hide_input" onChange={handlePeopleSearch} ></input>
                </div>
            </div>
            <div className='tag_container'>
                <TagNames
                    selectedNames={selectedNames}
                    onDelete={handleDelete}
                />
            </div>
            {isLoading && <div className='middle' style={{  height: selectedNames.length > 0 ? '200px' : '260px' }}> <CircularProgress className='logo_color_text' /></div>}
            {/* Render search results */}
            {!isLoading && <div className='location_list' style={{ height: selectedNames.length > 0 ? '200px' : '260px' }}>
                <List component="nav" aria-label="main mailbox folders">
                    {filteredUsers.map((user) => (
                        <div key={user._id}>
                            <ListItem button
                                onClick={() => handleNameClick(user)}>
                                <ListItemAvatar>
                                    <Avatar alt="User Picture" src={user?.picture} />
                                </ListItemAvatar>
                                <ListItemText primary={user.name} secondary={`@${user?.username}`}  />
                            </ListItem>
                        </div>
                    ))}
                </List>
            </div>}
        </div>
    )
}
