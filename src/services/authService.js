import jwtDecode from "jwt-decode";
import http from "./httpService";


const apiEndpoint =  "/auth";
const tokenKey = 'token';

http.setJwt(getJwt());

export async  function login(email, password){
    const {data :jwt} = await http.post(apiEndpoint, {
        email,
        password
    });

    localStorage.setItem(tokenKey,jwt);
}

export function loginWithJWT(response){
    localStorage.setItem(tokenKey, response.headers['x-auth-token']);
}

export function getUser(){
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
        
      } catch (ex) {
         return null;
      }
    
}
export function isAdmin(){
    try {
        const jwt = localStorage.getItem(tokenKey);
         const { isAdmin } = jwtDecode(jwt);
         return isAdmin;
        
      } catch (ex) {
         return null;
      }
    
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export default{
    login,
    loginWithJWT,
    getUser,
    logout,
    isAdmin
   
}