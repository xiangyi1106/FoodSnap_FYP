import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const PostTextArea = ({ text, setText, user }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isMentioning, setIsMentioning] = useState(false);
    const [mentionText, setMentionText] = useState('');
    const [hashtagText, setHashtagText] = useState('');
    const textRef = useRef(null);

    // Example users and hashtags
    const [users, setUsers] = useState([]);
    const [hashtags, setHashtags] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    // Fetch users from the database
    useEffect(() => {
        const fetchUsers = async () => {

            fetch(`${process.env.REACT_APP_BACKEND_URL}/searchPeople`
                , {
                    headers: {
                        'user_id': user?.id,
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setUsers(data); // Set all users
                })
                .catch(error => { console.error('Error fetching users:', error); });
        };

        const fetchHashtags = async () => {
            try {
                const response = await axios.get('/getHashtags');
                setHashtags(response.data); // Data should now be in the format { id, display }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching hashtags:', error);
                setIsLoading(false);
            }
        };

        fetchHashtags();

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setText(value);

        // Detect if typing mention or hashtag
        const lastChar = value[value.length - 1];
        if (lastChar === '@' || lastChar === '#') {
            setIsMentioning(true);
            setMentionText('');
            setHashtagText('');
        } else {
            // Reset if not mentioning or hashtagging
            setIsMentioning(false);
        }

        // Handle other text input logic here
    };

    const handleSuggestionClick = (suggestion) => {
        let updatedText = text;
        if (isMentioning) {
            updatedText = updatedText.replace(mentionText, suggestion);
        } else {
            updatedText = updatedText.replace(hashtagText, suggestion);
        }
        setText(updatedText);
        setIsMentioning(false);
    };

    const getSuggestions = (input) => {
        if (input.startsWith('@')) {
            return users.filter(user => user.toLowerCase().includes(input.slice(1).toLowerCase()));
        } else if (input.startsWith('#')) {
            return hashtags.filter(tag => tag.toLowerCase().includes(input.slice(1).toLowerCase()));
        }
        return [];
    };

    const getCurrentMention = () => {
        const parts = text.split(/[\s@#]/);
        return parts[parts.length - 1];
    };

    useEffect(() => {
        if (isMentioning) {
            const currentMention = getCurrentMention();
            if (currentMention.length > 0) {
                setSuggestions(getSuggestions(currentMention));
                if (currentMention.startsWith('@')) {
                    setMentionText(currentMention);
                } else if (currentMention.startsWith('#')) {
                    setHashtagText(currentMention);
                }
            } else {
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    }, [text]);

    return (
        <div className="post_content" style={{ minHeight: '320px' }}>
            <textarea
                autoFocus={true}
                disabled={isLoading}
                placeholder="Share something..."
                id="post_input"
                ref={textRef}
                maxLength={22000}
                value={text}
                style={{ minHeight: '320px' }}
                onChange={handleInputChange}
                className="post_input"
            />
            {isMentioning && (
                <div className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostTextArea;
