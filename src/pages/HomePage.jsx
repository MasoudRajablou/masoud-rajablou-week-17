import { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

import { ContactContext } from "../providers/ContactProvider";
import { ModalContext } from "../providers/ModalProvider";
import Header from "../components/Header";
import ContactList from "../components/ContactList";
import Modal from "../components/Modal";

import styles from "../modules/HomePage.module.css";

function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [contactsList, setContactsList] = useState([]);
  const [search, setSearch] = useState("");

  const { state, dispatch } = useContext(ContactContext);
  const { modalState, modalDispatch } = useContext(ModalContext);

  useEffect(() => {
    state.contacts &&
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
  }, [state.contacts]);

  useEffect(() => {
    if (!search) {
      setContactsList(state.contacts);
      return;
    }

    const contacts = state.contacts.filter(
      contact =>
        contact.name.toLowerCase().trim().includes(search) ||
        contact.phone.toString().includes(search) ||
        contact.email.toLowerCase().trim().includes(search)
    );

    setContactsList(contacts);
    setLoaded(true);
  }, [state.contacts, search]);

  return (
    <div
      onClick={() => {
        dispatch({ type: "showOption", payload: "" });
      }}
    >
      <Header setSearch={setSearch} />
      {!!state.deletedAll && !modalState.extra ? (
        <h2 className={styles.warning}>There is no contact to show!</h2>
      ) : !state.contacts.length ? (
        state.error ? (
          <h2 className={styles.warning}>Something wrong about GET data</h2>
        ) : (
          <MoonLoader
            className={styles.loader}
            color="#ffead0"
            size={120}
            speedMultiplier={0.5}
          />
        )
      ) : (
        <div className={styles.container}>
          {!!loaded && !contactsList.length ? (
            <h2 className={styles.warning}>No result to show!</h2>
          ) : (
            <ul>
              {contactsList.map(contact => (
                <ContactList key={contact.id} contact={contact} />
              ))}
            </ul>
          )}
        </div>
      )}
      {!!modalState.modal && <Modal />}
    </div>
  );
}

export default HomePage;
