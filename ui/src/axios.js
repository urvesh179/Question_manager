import axios from 'axios';
const axiosInstance=axios.create({
    baseURL:"https://urvesh-question-app.herokuapp.com/"    
});
 export default axiosInstance;