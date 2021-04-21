import Axios from "axios"

const fetchUsersSuccess = users => {
    return {
      type:"ADDTOSTORE",
      payload: users
    }
  }
  
 export const postUsersSuccess = users => {
    console.log(users)
    return {
      type:"SAVETOSTORE",
      payload: users
    }
  }
  export const updateUsersSuccess = users => {
    console.log(users)
    return {
      type:"UPDATE",
      payload: users
    }
  }

  export const deleteUsersSuccess = users => {
    console.log("delete",users)
    return {
      type:"DELETEFROMSTORE",
      payload: users
    }
  }
  

export const Read = () => {
    return (dispatch) => {
      Axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
           const users=response.data
           dispatch(fetchUsersSuccess(users))
        }
        )
        .catch((error) => {
          console.log(error);
        });
    };
  };
  
  // export const Create = (data) => {
  //     return (dispatch) => {
  //       Axios
  //         .post("https://jsonplaceholder.typicode.com/users",data)
  //         .then((response) => {
  //            const users=response.data
  //            dispatch(postUsersSuccess(users))
  //         }
  //         )
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     };
  //   };
    // export const Delete = (data) => {

    //   return (dispatch) => {
        
    //     Axios
    //       .post("https://jsonplaceholder.typicode.com/users",data)
    //       .then((response) => {
    //          const users=response.data
    //          dispatch(deleteUsersSuccess(users))
    //       }
    //       )
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };
    // };