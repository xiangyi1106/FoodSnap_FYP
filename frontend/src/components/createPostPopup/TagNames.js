import React from 'react'
import { CIcon, cilTrash } from '../../../src/styles/Cicons'; // Adjust the path as needed

export default function TagNames({ selectedNames, onDelete }) {
    return (
        selectedNames.length > 0 && 
        <div className="selected_names">
            {selectedNames.map((user) => (
                <div key={user?._id} className="selected_name">
                    {user?.name}
                    <CIcon icon={cilTrash} className="icon_size_16 icon_button" onClick={() => onDelete(user?.username)} />
                </div>
            ))}
        
        </div>
    )
}
