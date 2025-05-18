const axios = Axios.create({
    baseUrl: process.env.BACKEND_URL
})

export default axios;