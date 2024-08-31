import React, { useEffect, useState } from 'react';
import { Card, CardContent, Avatar, Typography, LinearProgress, Grid, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExploreIcon from '@mui/icons-material/Explore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlaceIcon from '@mui/icons-material/Place';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}));

const GameProfileCard = () => {

    const levels = [
        { level: 1, goal: 5 },
        { level: 2, goal: 10 },
        { level: 3, goal: 20 },
        { level: 4, goal: 30 },
        { level: 5, goal: 50 },
        { level: 6, goal: 70 },
        { level: 7, goal: 100 },
        { level: 8, goal: 150 },
        { level: 9, goal: 200 },
        { level: 10, goal: 300 }
    ];

    // Sample data
    const user = {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
        placesVisited: 25,
        lastVisited: 'The Tribus, Impian Emas',
    };

    const getCurrentLevel = (placesVisited) => {
        return levels.reduce((currentLevel, level) => {
            return placesVisited >= level.goal ? level.level : currentLevel;
        }, 1);
    };

    const getNextGoal = (currentLevel) => {
        const nextLevel = levels.find(level => level.level === currentLevel + 1);
        return nextLevel ? nextLevel.goal : null;
    };

    const [currentLevel, setCurrentLevel] = useState(0);
    const [nextGoal, setNextGoal] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [placesToNextLevel, setPlacesToNextLevel] = useState(0);

    useEffect(() => {
        const level = getCurrentLevel(user.placesVisited);
        const goal = getNextGoal(level);

        setCurrentLevel(level);
        setNextGoal(goal);

        if (goal) {
            setProgressValue(((user.placesVisited / goal) * 100));
            setPlacesToNextLevel(goal - user.placesVisited);
        } else {
            setProgressValue(100); // If no next goal, set progress to 100%
            setPlacesToNextLevel(0);
        }
    }, [user.placesVisited]);

    return (
        <Card sx={{ maxWidth: 345, background: 'linear-gradient(135deg, #6b8dd6, #4fc3f7)', borderRadius: 3 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt={user.name} src={user.avatar} sx={{ width: 60, height: 60 }} />
                        </StyledBadge>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" color="white">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="white">
                            Explorer Level: {currentLevel}
                        </Typography>
                        <Typography variant="body2" color="white" style={{fontSize: '0.7rem'}}>
                            Next Level: Visit {nextGoal} places
                        </Typography>
                    </Grid>
                </Grid>

                <LinearProgress
                    variant="determinate"
                    value={progressValue}
                    sx={{ my: 2, height: 8, borderRadius: 5 }}
                />
                <Typography variant="body2" color="white" gutterBottom>
                    Visit {placesToNextLevel} more places to reach the next level
                </Typography>

                <Grid container spacing={1} justifyContent="space-around">
                    <Grid item>
                        <Typography variant="h6" color="white">
                            <ExploreIcon /> {user.placesVisited}
                        </Typography>
                        <Typography variant="caption" color="white">
                            Places Visited
                        </Typography>
                    </Grid>
                    {/* <Grid item>
                        <Typography variant="h6" color="white">
                            <PlaceIcon /> {user.lastVisited}
                        </Typography>
                        <Typography variant="caption" color="white">
                            Last Visited
                        </Typography>
                    </Grid> */}
                </Grid>

                <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                    <EmojiEventsIcon fontSize="medium" sx={{ color: '#FFD700' }} />
                    <Typography variant="caption" color="white">
                        Achievement: First International Trip!
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default GameProfileCard;
