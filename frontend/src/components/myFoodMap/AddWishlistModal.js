import React, { useState } from 'react'
import { CButton, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal } from '@coreui/react';
import { TextField } from '@mui/material';
import NoteCard from './NoteCard';

export default function AddWishlistModal({ setVisible, visible }) {
    const [newItem, setNewItem] = useState({ name: '', address: '', notes: '', visited: false });
    return (
        <div className='modal-open'>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">New Wishlist</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Location Name"
                            fullWidth
                            variant="outlined"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Address"
                            fullWidth
                            variant="outlined"
                            value={newItem.address}
                            onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
                        />
                        {/* <TextField
                            margin="dense"
                            label="Notes"
                            fullWidth
                            variant="outlined"
                            value={newItem.notes}
                            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                        /> */}
                        <NoteCard />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary">Add</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}
