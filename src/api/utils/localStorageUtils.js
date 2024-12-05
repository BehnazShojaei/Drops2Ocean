export const saveToken = (token) => {
    window.localStorage.setItem("token", token);
  };
  
  export const getToken = () => {
    return window.localStorage.getItem("token");
  };
  
  export const clearToken = () => {
    window.localStorage.removeItem("token");
  };
  