import { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = {
  modal: false,
  operation: null,
  message: null,
  extra: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "cancel":
      return { modal: false, operation: null, message: null, extra: null };

    case "close":
      return {
        modal: true,
        operation: "close",
        message: "Discard changes?",
        extra: null,
      };

    case "add":
      return {
        modal: true,
        operation: "add",
        message: "Add to your contacts?",
        extra: action.payload,
      };

    case "edit":
      return {
        modal: true,
        operation: "edit",
        message: "Save changes?",
        extra: action.payload,
      };

    case "delete":
      return {
        modal: true,
        operation: "delete",
        message: "Delete it from your contacts?",
        extra: action.payload,
      };

    case "deleteSelected":
      return {
        ...state,
        modal: true,
        operation: "deleteSelected",
        message: "Delete selected items from your contacts?",
      };

    case "deleteAll":
      return {
        modal: true,
        operation: "deleteAll",
        message: "Delete all?",
        extra: [],
      };

    default:
      break;
  }
};

function ModalProvider({ children }) {
  const [modalState, modalDispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ modalState, modalDispatch }}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
