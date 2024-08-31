import React from 'react';
import './NoteCard.css';

const NoteCard = ({ title, description, date, onEdit }) => {
    return (
        <div className="note_rounded">
            <div className="note_container">
                <div>
                    <h4 className="note_title">{title}</h4>
                    <p className="note_description">{description}</p>
                </div>
                <div className="note_footer">
                    <p className="note_date">{date}</p>
                    <button 
                        className="note_icon_button" 
                        aria-label="edit note" 
                        onClick={onEdit}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="icon icon_tabler icon_tabler_pencil" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
