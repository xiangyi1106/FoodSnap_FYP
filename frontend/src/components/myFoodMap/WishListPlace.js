import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Button, TextField, Box, Grid, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveIcon from '@mui/icons-material/Save';
import FindInPageIcon from '@mui/icons-material/FindInPage';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([
        { id: 1, location: 'Restaurant The Tribus', note: '' },
        { id: 2, location: 'Permai Sandwich', note: '' },
    ]);
    const [isNoteVisible, setIsNoteVisible] = useState({});
    const [noteText, setNoteText] = useState('');

    const handleRemoveItem = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    const handleMarkVisited = (id) => {
        console.log(`Marked as visited: ${id}`);
    };

    const handleToggleNote = (id) => {
        setIsNoteVisible(prevState => ({ ...prevState, [id]: !prevState[id] }));
        if (!isNoteVisible[id]) {
            // Set note text to the existing note when editing
            const currentItem = wishlist.find(item => item.id === id);
            setNoteText(currentItem ? currentItem.note : '');
        }
    };

    const handleNoteChange = (e) => {
        setNoteText(e.target.value);
    };

    const handleSaveNote = (id) => {
        setWishlist(wishlist.map(item =>
            item.id === id ? { ...item, note: noteText } : item
        ));
        setIsNoteVisible(prevState => ({ ...prevState, [id]: false }));
        setNoteText('');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                {wishlist.map(item => (
                    <Grid item xs={12} key={item.id}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6">{item.location}</Typography>
                                        <Typography variant="body2" color="text.secondary">{item.details}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Mark as Visited">
                                            <IconButton onClick={() => handleMarkVisited(item.id)} color="success">
                                                <CheckCircleIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Add/Edit Note">
                                            <IconButton onClick={() => handleToggleNote(item.id)} color="primary">
                                                <NoteAddIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="See Details">
                                            <IconButton color="secondary">
                                                <FindInPageIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                {isNoteVisible[item.id] && (
                                    <Box sx={{ marginTop: 2 }}>
                                        <TextField
                                            label="Note"
                                            value={noteText}
                                            onChange={handleNoteChange}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                sx: { resize: 'none' },
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveIcon />}
                                            sx={{ marginTop: 1 }}
                                            onClick={() => handleSaveNote(item.id)}
                                        >
                                            Save Note
                                        </Button>
                                    </Box>
                                )}
                                {!isNoteVisible[item.id] && item.note && (
                                    <Typography variant="body2" color="text.primary" sx={{ mt: 2, fontStyle: 'italic' }}>
                                        {item.note}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WishlistPage;
