// When we deploy backend to heroku, change to that URL
export const BASE_URL = 'http://localhost:3000/api'; 

export const callApi = async ({ url, method, token, body }) => {
    try {
        const options = {
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        };
        console.log('request url: ', BASE_URL + url);
        console.log('options: ', options)
        const response = await fetch(BASE_URL + url, options);
        const data = await response.json();
        if (data.error) throw data.error;

        return data;
    } catch (error) {
        console.error('ERROR: ', error);
        return error;
    };
};