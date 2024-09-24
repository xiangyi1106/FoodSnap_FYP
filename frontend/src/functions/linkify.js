import { Fragment } from "react";
import { Link } from "react-router-dom";

export const linkifyMentionsAndHashtags = (text = '', mentionMap) => {
    // Ensure text is defined and a string, default to an empty string
    return text.split(' ').map((word, index, array) => {
        if (word.startsWith('#')) {
            return (
                <Fragment key={index}>
                    <a href={`/search?query=${word.slice(1)}`} style={{ color: 'blue', textDecoration: 'none' }}>
                        {word}
                    </a>
                    {index < array.length - 1 && ' '}
                </Fragment>
            );
        } else if (word.startsWith('@')) {
            const name = word.slice(1);
            const userIds = mentionMap[name];
            return (
                <Fragment key={index}>
                    {userIds && userIds.length > 0 ? (
                        userIds.map((userId, userIndex) => (
                            <Link key={`${userId}-${userIndex}`} to={`/profile/${userId}`} style={{ backgroundColor: 'lightblue', textDecoration: 'none' }}>
                                {name}
                            </Link>
                        ))
                    ) : (
                        <span>{word}</span>
                    )}
                </Fragment>
            );
        }
        return <span key={index}>{word} </span>;
    });
};
