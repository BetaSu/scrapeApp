import axios from 'axios'
export default {
  getTotal () {
    return axios.get('/list')
  }
}
