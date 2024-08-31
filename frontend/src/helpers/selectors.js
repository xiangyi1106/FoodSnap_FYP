import { createSelector } from 'reselect';

// Simple selector to get the user state
const getUserState = (state) => state.user;


export const getUserSelector = createSelector(
    [getUserState],
    (user) => ({
        id: user.id,
        username: user.username,
        picture: user.picture,
        name: user.name,
        token: user.token,
        verified: user.verified,
    })
);
