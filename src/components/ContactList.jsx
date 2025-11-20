import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import {
  LiaAtSolid,
  LiaBarsSolid,
  LiaPhoneAltSolid,
  LiaSmile,
  LiaSquare,
  LiaSquareFullSolid,
  LiaUserEditSolid,
  LiaUserTimesSolid,
} from "react-icons/lia";

import { ContactContext } from "../providers/ContactProvider";
import { ModalContext } from "../providers/ModalProvider";
import Modal from "./Modal";

import styles from "../modules/HomePage.module.css";

function ContactList({ contact }) {
  const [isMobile, setIsMobile] = useState("");

  const { state, dispatch } = useContext(ContactContext);
  const { modalState, modalDispatch } = useContext(ModalContext);

  useEffect(() => {
    window.addEventListener("resize", e => setIsMobile(e.target.outerWidth));
  }, []);

  return (
    <>
      <li className={styles.contact}>
        <p>
          <LiaSmile /> {contact.name}
        </p>
        <p>
          <span>
            <LiaAtSolid />
          </span>
          {contact.email}
        </p>
        <p>
          <span>
            <LiaPhoneAltSolid />
          </span>
          {contact.phone}
        </p>
        {!!state.selectOption ? (
          !!state.selectAll || state?.selected.includes(contact) ? (
            <button
              onClick={() => {
                dispatch({ type: "unSelectContacts", payload: contact });
              }}
            >
              <LiaSquareFullSolid />
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({ type: "selectContacts", payload: contact });
              }}
            >
              <LiaSquare />
            </button>
          )
        ) : (
          state.showOption !== contact.id && (
            <button
              onClick={e => {
                e.stopPropagation();
                dispatch({ type: "showOption", payload: contact.id });
              }}
              title="Options"
            >
              <LiaBarsSolid />
            </button>
          )
        )}
        {state.showOption === contact.id && (
          <div>
            <button
              onClick={e => {
                e.stopPropagation();
                dispatch({ type: "edit", payload: contact });
              }}
              title="Edit Contact"
            >
              <Link to={`/edit/${contact.id}`}>
                <LiaUserEditSolid />
              </Link>
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                modalDispatch({ type: "delete", payload: contact.id });
              }}
              title="Delete contact"
            >
              <LiaUserTimesSolid />
            </button>
          </div>
        )}
      </li>
    </>
  );
}

export default ContactList;
