import { useContext } from "react";
import { LiaSaveSolid, LiaWindowCloseSolid } from "react-icons/lia";

import { ContactContext } from "../providers/ContactProvider";
import { ModalContext } from "../providers/ModalProvider";
import Modal from "./Modal";

import styles from "../modules/AddContactPage.module.css";

function EditContact({ contact, setContact }) {
  const { state, dispatch } = useContext(ContactContext);
  const { modalState, modalDispatch } = useContext(ModalContext);

  return (
    <div className={styles.container}>
      <h1>Updating information</h1>
      <div className={styles.properties}>
        <label htmlFor="contactName">Name</label>
        <input
          id="contactName"
          type="text"
          value={contact?.name || ""}
          onChange={e =>
            setContact(prev => ({ ...prev, name: e.target.value }))
          }
        />

        <label htmlFor="contactMail">Email Address</label>
        <input
          id="contactMail"
          type="text"
          value={contact?.email || ""}
          onChange={e =>
            setContact(prev => ({ ...prev, email: e.target.value }))
          }
        />

        <label htmlFor="contactPhone">Phone Number</label>
        <input
          id="contactPhone"
          type="text"
          value={contact?.phone || ""}
          onChange={e =>
            setContact(prev => ({ ...prev, phone: e.target.value }))
          }
        />
      </div>
      <div className={styles.buttons}>
        <button
          disabled={
            contact?.name?.length < 7 || !contact?.email || !contact?.phone
          }
          onClick={e => {
            e.stopPropagation();
            modalDispatch({ type: "edit", payload: contact });
          }}
        >
          <LiaSaveSolid />
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            modalDispatch({ type: "close" });
            dispatch({ type: "showOption", payload: false });
          }}
        >
          <LiaWindowCloseSolid />
        </button>
      </div>
      {!!modalState?.modal && <Modal />}
    </div>
  );
}

export default EditContact;
