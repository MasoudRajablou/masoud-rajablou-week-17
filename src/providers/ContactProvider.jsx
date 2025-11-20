import { useEffect, useReducer, createContext } from "react";
import axios from "axios";

export const ContactContext = createContext();

const initialState = {
  contacts: JSON.parse(localStorage.getItem("contacts")) || [],
  error: false,
  showOption: "",
  selectOption: false,
  selected: [],
  selectAll: false,
  editContact: [],
  deletedAll: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setContacts":
      return { ...state, deletedAll: false, contacts: action.payload };

    case "error":
      return { ...state, error: action.payload };

    case "showOption":
      return { ...state, showOption: action.payload };

    case "delete":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };

    case "edit":
      const newContacts = state.contacts.map(contact =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return { ...state, contacts: newContacts };

    case "addContact":
      return {
        ...state,
        deletedAll: false,
        contacts: [...state.contacts, action.payload],
      };

    case "selectOption":
      return { ...state, selectOption: action.payload };

    case "selectContacts":
      return { ...state, selected: [...state.selected, action.payload] };

    case "unSelectContacts":
      const selectedUpdate = state.selected.filter(
        s => s.id !== action.payload.id
      );
      return { ...state, selected: selectedUpdate };

    case "selectAll":
      return { ...state, selectAll: action.payload };

    case "deleteAll":
      return { ...initialState, deletedAll: action.payload, contacts: [] };

    case "deleteSelected":
      const updateContacts = state.contacts.filter(
        contact => !state.selected.some(s => s.id === contact.id)
      );
      return { ...state, selected: [], contacts: updateContacts };

    default:
      break;
  }
};

function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!!state.contacts.length) return;

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        dispatch({ type: "setContacts", payload: res.data });
      })
      .catch(() => dispatch({ type: "error", payload: true }));
  }, []);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}+....+
      --+
      **+
    </ContactContext.Provider>
  );
}

export default ContactProvider;
