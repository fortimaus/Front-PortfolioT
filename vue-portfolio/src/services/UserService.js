import axios from "../http-common";
class UserService {

    register(data) {
        return axios.post( "/users/register",data);
    }

    confirmEmail(id,code) {
      return axios.post( `/users/confirmEmail?id=${id}&code=${code}`);
    }
    
    updateEmail(id,email) {
        return axios.put( `/users/updateEmail?id=${id}&email=${email}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }

    confirmNewEmail(id,email) {
        return axios.post( `/users/confirmNewEmail?id=${id}&email=${email}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }

    login(login, password) {
        return axios.get( `/users/login?login=${login}&password=${password}`);
    }
    get(id) {
        return axios.get( `/users/${id}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }

    stats(id) {
        return axios.get( `/users/stats/${id}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }

    update(data) {
        return axios.put( `/users/update`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }
    updateRole(id,role) {
        return axios.put( `/users/role?id=${id}&role=${role}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }
    updateStatus(id,status) {
        return axios.put( `/users/status?id=${id}&status=${status}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }
    createComment(data){
        return axios.post( `/users/comments`,data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }
    comments(id){
        return axios.get( `/users/comments/${id}`,{ headers: { Authorization: 'Bearer ' + localStorage.getItem("token")  }});
    }

}

export default new UserService();