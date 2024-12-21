import React, { useState, useEffect } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import axios from 'axios';
import './style.css';  // Custom styling for the mentions input

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

    // const analyseText = (text) => {
    //     // const textComp = [];
    //     const words = text.split(" ");
        
    //     const textComp = words.map((w, index) => {
    //         if (w.startsWith("#")) {
    //             return (
    //               `<span key=${index} style="color: blue;">${w} </span>` // Hashtag styled in blue
    //             );
    //           } else if (w.startsWith("@")) { // Handling mentions
    //             return (
    //               `<span key=${index} style="color: black; background-color: yellow;">${w} </span>` // Mention styled with background
    //             );
    //           } else {
    //             return (
    //               `<span key=${index} style="color: black;">${w} </span>` // Regular text
    //             );
    //           }
    //     });
    //     setText(textComp.join("")); // Update state with processed text
    //   };
      
    //   useEffect(() => {
    //     analyseText(text);
    // }, [text]);

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
        control: {
            // backgroundColor: 'transparent',
            // height: "320px",
            // padding: "5px 15px",
            // border: 'none',
            // overflowY: 'hidden', // Ensure no vertical overflow
            // width: '100%',
            // lineHeight: '1.5', // Maintain line height
            // whiteSpace: 'pre-wrap', // Ensure wrapping behaves well
        },
        // input: {
        //     position: 'relative',
        //     outline: 'none',
        //     border: 'none',
        //     resize: 'none',
        //     marginBottom: '10px',
        //     fontFamily: 'inherit',
        //     color: 'var(--color-primary)',
        //     background: 'transparent',
        //     lineHeight: '1.5', // Consistent line height for input text
        //     whiteSpace: 'pre-wrap',
        //     wordWrap: 'break-word',
        // },
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
                    // renderSuggestion={renderMention}
                    displayTransform={(id, display) => `@${display}`}
                    // style={{ backgroundColor: 'lightblue'}}
                />

                {/* Hashtags using # */}
                <Mention
                    trigger="#"
                    data={hashtags}
                    // renderSuggestion={renderHashtag}
                    displayTransform={(id, display) => `#${display}`}
                    // style={{ backgroundColor: 'lightgreen'}}
                />
            </MentionsInput>
        </div>
    );
};

export default PostInput;
