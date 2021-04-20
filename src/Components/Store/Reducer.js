let initialstate={
  users:[],
}

const Reducer = function (state = initialstate, action) {
    switch (action.type) {
      case "SAVETOSTORE":
        return {
          users: action.payload,
        }
      case "ADDTOSTORE":
        return {
          users: action.payload,
        }
      case "UPDATE":
        return {
          users: action.payload,
        }
        case "DELETEFROMSTORE":
          return{
            users:action.payload
          }
            
      default:
        return state;
    }
  };

  export default Reducer;