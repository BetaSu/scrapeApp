import axios from 'axios'
export default {
  /**
   * 获取列表数据
   * @param page {number} 当前页
   * @return pageSize {number} 每页数量 
   */
  getTotal (params) {
    return axios.get('/list', {params})
  }
}
