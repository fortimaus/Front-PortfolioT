import axios from "../http-common";
class AchievementService {

  create(data) {
          return axios.post( `/achievements/create`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  get(id) {
    return axios.get( `/achievements/${id}`);
  }
  generate(id) {
    return axios.post( `/achievements/generate/${id}`,{},{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  } 

  getbyUser(id){
    return axios.get( `/achievements/user/${id}`);
  }
  update(data) {
    return axios.put( `/achievements/update`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  delete(id) {
    return axios.delete( `/achievements/delete/${id}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
}

export default new AchievementService();