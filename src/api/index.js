// export const BASE_URL = 'http://localhost:3000/api'; 
export const BASE_URL = 'https://sketch-shoppe-backend.herokuapp.com/api'; 

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

        const response = await fetch(BASE_URL + url, options);
        const data = await response.json();
        if (data.error) throw data.error;

        return data;
    } catch (error) {
        console.error('ERROR: ', error);
        return error;
    };
};