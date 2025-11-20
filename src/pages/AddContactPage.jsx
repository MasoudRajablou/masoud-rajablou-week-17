import { useContext, useState } from "react";
import { LiaSaveSolid, LiaWindowCloseSolid } from "react-icons/lia";

import { ContactContext } from "../providers/ContactProvider";
import { ModalContext } from "../providers/ModalProvider";
import Modal from "../components/Modal";

import styles from "../modules/AddContactPage.module.css";

// prettier-ignore
const allowedCharacters = ['1','2','3','4','5','6','7','8','9','0','+','-','Backspace','Delete','Tab', "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", "Escape", "Alt", "Control", "Shift", "Meta"];

function AddContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(false);

  const { state, dispatch } = useContext(ContactContext);
  const { modalState, modalDispatch } = useContext(ModalContext);

  const newId = state.contacts.length + 1 || 1;

  const newContact = { id: newId, name, email, phone };

  const saveHandler = e => {
    e.stopPropagation();
    modalDispatch({ type: "add", payload: newContact });
  };

  const phoneHandler = event => {
    if (!allowedCharacters.includes(event.key)) {
      setValid(true);
      setTimeout(() => {
        setValid(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add New Contact</h1>
      <div className={styles.properties}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {name.length > 0 && name.length < 7 && (
          <p>Insert at least 7 characters!</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {email.length > 0 && !email.includes("@") && (
          <p>Insert the email address correctly!</p>
        )}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          onKeyDown={phoneHandler}
        />
        {!!valid && <p>Insert valid character like 0 ... 9, + or -!</p>}
      </div>
      <div className={styles.buttons}>
        <button
          disabled={name.length < 7 || !email || !phone}
          onClick={saveHandler}
        >
          <LiaSaveSolid />
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            modalDispatch({ type: "close" });
          }}
        >
          <LiaWindowCloseSolid />
        </button>
      </div>
      {!!modalState?.modal && <Modal />}
    </div>
  );
}

export default AddContactPage;
