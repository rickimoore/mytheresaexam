const fetchApi = (url) => new Promise((resolve, reject) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                reject(response)
            }
            resolve(response.json())
        })
        .catch(error => reject(error))
})


export default fetchApi;