import axios from "../http-common";
class RepoService {

  create(data) {
          return axios.post( `/reposotories/create`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  get(id) {
    return axios.get( `/reposotories/${id}`);
  }
  getbyUser(id){
    return axios.get( `/reposotories/user/${id}`);
  }
  update(data) {
          return axios.put( `/reposotories/update`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  delete(id) {
    return axios.delete( `/reposotories/delete/${id}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  compare() {
    return axios.get( `/reposotories/compareAll`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  } 
  generate(id) {
    return axios.post( `/reposotories/generate?userId=${id}`,{},{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  } 

  generateService(userId,serviceId) {
    return axios.post( `/reposotories/generate_service?userId=${userId}&serviceId=${serviceId}`,{},{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  } 
  difference_many(serviceId,userName, userId) {
    return axios.post( `/reposotories/difference_many?serviceId=${serviceId}&userName=${userName}&userId=${userId}`,{},{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  difference_one(serviceId,userName,repoName) {
    return axios.post( `/reposotories/difference_one?serviceId=${serviceId}&userName=${userName}&repoName=${repoName}`,{},{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  } 

}

export default new RepoService();