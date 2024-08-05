// export const useGetUserInfo = () => {
//     const {name, profilePhoto, userID, isAuth} = JSON.parse(localStorage.getItem("auth"));

//     return { name, profilePhoto, userID, isAuth};
// }


export const useGetUserInfo = () => {
    const authData = localStorage.getItem("auth");
    const { name, profilePhoto, userID, isAuth } = authData ? JSON.parse(authData) : { name: '', profilePhoto: '', userID: '', isAuth: false };
    return { name, profilePhoto, userID, isAuth };
}


