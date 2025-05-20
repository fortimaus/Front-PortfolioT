import axios from "../http-common";
class LinkService {

     create(data) {
        return axios.post( `/services/create`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
      }
      get(userId, serviceId) {
        return axios.get( `/services/one?userId=${userId}&serviceId=${serviceId}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
      }
      getbyUser(id){
        return axios.get( `/services/user/${id}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
      }
      update(data) {
        return axios.put( `/services/update`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
      }
      delete(userId, serviceId) {
        return axios.delete( `/services/delete?userId=${userId}&serviceId=${serviceId}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
      }
      getAllTypes() {
        return axios.get( `/services`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
      }
      getTypes(type) {
        return axios.get( `/services/type?type=${type}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
      }

}

export default new LinkService();