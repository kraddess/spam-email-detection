import React from "react";
import { getEmails } from "../apis/email";
var EmailStateContext = React.createContext();
var EmailDispatchContext = React.createContext();

function emailReducer(state, action) {
  switch (action.type) {
    case "GET_EMAILS":
      return { ...state, emails: action.payload };
    case "GET_EMAILS_ERROR":
      return { ...state, emails: [] };
    case "SET_EMAIL":
      return { ...state, current: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function EmailProvider({ children }) {
  var [state, dispatch] = React.useReducer(emailReducer, {
    emails: [],
    current: null
  });

  return (
    <EmailStateContext.Provider value={state}>
      <EmailDispatchContext.Provider value={dispatch}>
        {children}
      </EmailDispatchContext.Provider>
    </EmailStateContext.Provider>
  );
}

function useEmailState() {
  var context = React.useContext(EmailStateContext);
  if (context === undefined) {
    throw new Error("useEmailState must be used within a EmailProvider");
  }
  return context;
}

function useEmailDispatch() {
  var context = React.useContext(EmailDispatchContext);
  if (context === undefined) {
    throw new Error("useEmailDispatch must be used within a EmailProvider");
  }
  return context;
}


// ###########################################################



async function getEmailsAction(dispatch) {
  try {
    // setError(false);
    // setIsLoading(true);
    const { data } = await getEmails();
    // setError(null)
    // setIsLoading(false)
    dispatch({ type: 'GET_EMAILS', payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: "GET_EMAILS_ERROR" });
    // setError(true);
    // setIsLoading(false);
  }
}

function setEmailAction(dispatch, email) {
  dispatch({
    type: "SET_EMAIL",
    payload: email,
  });
}


export { EmailProvider, useEmailState, useEmailDispatch, getEmailsAction, setEmailAction };
