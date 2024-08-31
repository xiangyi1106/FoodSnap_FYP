import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY_LOCALBUSINESSDATA;
const url = 'https://local-business-data.p.rapidapi.com/search';

const options = {
    params: {
        query: 'pizza in bukit indah, johor',
        limit: '30',
        zoom: '13',
        language: 'en'
    },
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'local-business-data.p.rapidapi.com'
    }
};

export const getPlaces = async () => {
    try {
        // const response = await axios.request(options);
        const { data } = await axios.get(url, {
            params: {
                query: 'pizza in bukit indah, johor',
                limit: '30',
                zoom: '13',
                language: 'en'
            },
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'local-business-data.p.rapidapi.com'
            }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
};