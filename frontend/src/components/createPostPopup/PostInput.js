import React, { useState, useEffect } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import axios from 'axios';
import './style.css';

const PostInput = ({ isLoading, text, setText, user, textRef, isShowImage }) => {
    const [users, setUsers] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async (query = '') => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mentionPeople`, {
                headers: { 'user_id': user?.id },
                params: { search: query } // Send query for search
            });

            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Debounced function to handle user input
    const handleChange = (event) => {
        const value = event.target.value;
        setText(value);
        // Extract the current query for users
        const mentionQuery = value.match(/@\w*$/)?.[0]?.substring(1) || '';
        fetchUsers(mentionQuery);
    };

    const fetchHashtags = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getHashtags`);
            // Ensure the data matches the required format: { id: '1', display: 'food' }
            const formattedHashtags = response.data.map(hashtag => ({
                id: hashtag.id,
                display: hashtag.name
            }));
            setHashtags(formattedHashtags);
        } catch (error) {
            console.error('Error fetching hashtags:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchUsers();
    }, [user]);

    useEffect(() => {
        fetchHashtags();
    }, []);

    const renderMention = (mention) => (
        <span className="mention" style={{ color: 'blue' }}>
            @{mention.display}
        </span>
    );

    const renderHashtag = (hashtag) => (
        <span className="hashtag" style={{ color: 'green' }}>
            #{hashtag.display}
        </span>
    );

    const mentionStyle = {
        '&multiLine': {
            control: {
                // minHeight: '320px',
                minHeight: `${isShowImage ? "110px" : "320px"}`,
                width: '350px',
                outline: 'none',
                border: 'none',
                color: 'blue',
            },
            highlighter: {
                padding: 2,
            },
            input: {
                padding: '10px 15px',
                outline: 'none',
                border: 'none',
            },
        },
        suggestions: {
            list: {
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.15)',
                fontSize: '14px',
            },
            item: {
                padding: '5px 15px',
                borderBottom: '1px solid rgba(0,0,0,0.15)',
                '&focused': {
                    backgroundColor: '#cee4e5',
                },
            },
        },
    };


    return (
        <div className="post_content" style={{ minHeight: `${isShowImage ? "110px" : "320px"}` }}>
            <MentionsInput
                value={text}
                onChange={handleChange} // Call handleChange on input change
                placeholder="Share something..."
                style={mentionStyle}
                className="post_input"
                disabled={isLoading}
                inputRef={textRef}
            >
                {/* Mentions users using @ */}
                <Mention
                    trigger="@"
                    data={users}
                    displayTransform={(id, display) => `@${display}`}
                />

                {/* Hashtags using # */}
                <Mention
                    trigger="#"
                    data={hashtags}
                    displayTransform={(id, display) => `#${display}`}
                />
            </MentionsInput>
        </div>
    );
};

export default PostInput;
