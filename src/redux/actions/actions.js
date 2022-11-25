export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const LOG_OUT = "LOG_OUT";
export const SET_CLIENTLIST = "SET_CLIENTLIST";
export const SET_USERLIST = "SET_USERLIST";
export const SET_CLIENT_BY_USERLIST = "SET_CLIENT_BY_USERLIST";
export const SET_FATTURELIST = "SET_FATURELIST";

export const setUser = (user) => ({
    type : SET_USER ,
    payload : user ,
});

export const setFattureList = (fattura) => ({
    type : SET_FATTURELIST ,
    payload : fattura ,
});


export const logout = () => ({
    type : LOG_OUT ,
});

export const setClientList = (clientList) => ({
    type : SET_CLIENTLIST ,
    payload : clientList ,
});

export const setUserList = (userList) => ({
    type : SET_USERLIST ,
    payload : userList ,
})
export const setClientByUserList = (clientByUserList) => ({
    type : SET_CLIENT_BY_USERLIST ,
    payload : clientByUserList
})


export const logIn = (obj) => {
    const baseEndpoint = "http://localhost:8080/auth/login";

    const header = {
        "Content-type" : "application/json" ,
    };

    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "POST" ,
                headers : header ,
                body : JSON.stringify ( obj ) ,
            } );

            if ( response.ok ) {
                const data = await response.json ();

                dispatch ( setUser ( data ) );

                console.log ( data );
            } else {
                console.log ( "username o password errata" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };
};

export const getClientList = (key) => {
    const baseEndpoint = "http://localhost:8080/api/clienti";
    console.log ( "eseguo get client list" );
    const header = {
        Authorization : `Bearer ${ key }` ,
    };
    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header ,
            } );
            if ( response.ok ) {
                const data = await response.json ();

                dispatch ( setClientList ( data ) );


                console.log ( data );
            } else {
                console.log ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };
};

export const getClientListByParams = (key, stringa, value, value2) => {
  let baseEndpoint;
  if (stringa === "filter-data-inserimento") {
    baseEndpoint = `http://localhost:8080/api/clienti/filter-data-inserimento/${value}`;
  }
  if (stringa === "fatturato") {
    baseEndpoint = `http://localhost:8080/api/clienti/fatturato/${value}`;
  }
  if (stringa === "filter-nome-cognome") {
    baseEndpoint = `http://localhost:8080/api/clienti/filter-nome-cognome/${value}/${value2}`;
  }

  console.log("eseguo get client list");
  const header = {
    Authorization: `Bearer ${key}`,
  };
  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseEndpoint, {
        method: "GET",
        headers: header,
      });
      if (response.ok) {
        const data = await response.json();
        if (stringa === "filter-data-inserimento") {
          dispatch(setClientList(data.content));
        }
        if (stringa === "fatturato") {
          dispatch(setClientList(data.content));
        }
        if (stringa === "filter-nome-cognome") {
          dispatch(setClientList(data.content));
        } 

        console.log(data);
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getClientListFromUser = (key,id) => {
  const baseEndpoint = `http://localhost:8080/api/clienti/user/${id}`;
    console.log("eseguo get client list");
  const header = {
    Authorization: `Bearer ${key}`,
  };
  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseEndpoint, {
        method: "GET",
        headers: header,
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setClientByUserList(data));
        console.log(data);
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

};

export const getUserList = (key) => {
    const baseEndpoint = "http://localhost:8080/api/users";
    const header = {
        Authorization : `Bearer ${ key }` ,
    };
    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header ,
            } );
            if ( response.ok ) {
                const data = await response.json ();
                dispatch ( setUserList ( data ) );
                console.log ( data );
            } else {
                console.log ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    }
};

export const getFattureList = (key) => {
    const baseEndpoint = "http://localhost:8080/api/fatture";
    const header = {
        Authorization : `Bearer ${ key }` ,
    };
    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header ,
            } );
            if ( response.ok ) {
                const data = await response.json ();
                dispatch ( setFattureList ( data ) );
                console.log ( data );
            } else {
                console.log ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    }
}
