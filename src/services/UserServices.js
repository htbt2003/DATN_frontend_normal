import httpAxios from "../httpAxios";
import httpAxiosPrivate from "../httpAxiosPrivate";


const UserService = {
    
    register:(data) =>
    {
        return httpAxios.post("register", data);
    },
    login:(data) =>
    {
        return httpAxios.post("login", data);
    },
    login_facebook:(data) =>
    {
        return httpAxios.post("loginFacebook", data);
    },
    login_google:(data) =>
    {
        return httpAxios.post("loginGoogle", data);
    },
    logout:() =>
    {
        return httpAxiosPrivate.post("auth/logout");
    },
    me: () => {
        return httpAxiosPrivate.post("auth/me");
    },
    updateAccount:(data, id) =>
    {
        return httpAxiosPrivate.post("auth/updateAccount/" + id, data);
    },
}
export default UserService;