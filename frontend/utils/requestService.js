const httpRequest = async function (url, options) {
    try {
        const response = await fetch(url, options);

        const responseBody = await response.json();

        if (!response.ok)
            throw responseBody;
        else {
            console.log('Server responded: ', responseBody);

            return responseBody;
        }
    } catch (error) {
        console.error(error);
        
        throw error;
    }

}

export default httpRequest;