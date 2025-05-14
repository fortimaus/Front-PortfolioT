import axios from "../http-common";
class ArticleService {

  create(data) {
          return axios.post( `/articles/create`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  get(id) {
    return axios.get( `/articles/${id}`);
  }
  getbyUser(id){
    return axios.get( `/articles/user/${id}`);
  }
  update(data) {
          return axios.put( `/articles/update`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  delete(id) {
    return axios.delete( `/articles/delete/${id}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  }
  generate(id) {
    return axios.post( `/articles/generate?id=${id}`,{},{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  } 

  generateService(userId,serviceId) {
    return axios.post( `/articles/generate_service?userId=${userId}&serviceId=${serviceId}`,{},{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
  } 


}

export default new ArticleService();