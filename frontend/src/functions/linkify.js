import { Fragment } from "react";
import { Link } from "react-router-dom";
import { saveSearchTermAndHistory } from "./user";

export const linkifyMentionsAndHashtags = (text = '', mentionMap, user) => {
    const saveSearchTermAndHistoryHandler = async (searchTerm) => {
        try {
            var formattedSearchTerm = searchTerm.replace(/\s+/g, "_"); // Replace spaces with underscores
            // Encoding Special Characters: #
            formattedSearchTerm = encodeURIComponent(formattedSearchTerm);
            const res = await saveSearchTermAndHistory(formattedSearchTerm, user.token);
            console.log("Response:", res);
        } catch (error) {
            console.error("Handler error:", error);
        }
    };
    // Ensure text is defined and a string, default to an empty string
    return text.split(' ').map((word, index, array) => {
        if (word.startsWith('#')) {
            return (
                <Fragment key={index}>
                    <a
                        href={`/searchResult/${word.slice(1)}`}
                        onClick={() => saveSearchTermAndHistoryHandler(word)}
                        style={{ color: 'blue', textDecoration: 'none' }}>
                        {word}
                    </a>
                    {index < array.length - 1 && ' '}
                </Fragment>
            );
        } else if (word.startsWith('@')) {
            const name = word.slice(1);
            // const userIds = mentionMap[name];
            const mentionDetails = mentionMap[name];
            return (
                <Fragment key={index}>
                    {mentionDetails && mentionDetails.length > 0 ? (
                        mentionDetails.map(({ userId, username }, userIndex) => (
                            <Link
                                key={`${userId}-${userIndex}`}
                                to={`/profile/${username}`}
                                style={{ backgroundColor: 'lightblue', textDecoration: 'none' }}
                            >
                                {name}
                            </Link>
                        ))
                    ) : (
                        <span>{word}</span> // If no match, render the word as is
                    )}
                </Fragment>
            );
        }
        return <span key={index}>{word} </span>;
    });
};
