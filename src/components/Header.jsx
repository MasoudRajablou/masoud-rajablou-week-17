import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  LiaMinusSquareSolid,
  LiaPlusSquareSolid,
  LiaSquare,
  LiaSquareFullSolid,
  LiaTimesSolid,
} from "react-icons/lia";

import { ContactContext } from "../providers/ContactProvider";
import { ModalContext } from "../providers/ModalProvider";

import styles from "../modules/Header.module.css";

function Header({ setSearch }) {
  const [selectMode, setSelectMode] = useState(false);

  const { state, dispatch } = useContext(ContactContext);
  const { modalState, modalDispatch } = useContext(ModalContext);

  return (
    <div className={styles.header}>
      <h1>Contacts List</h1>
      <div className={styles.searchbar}>
        <input
          type="text"
          placeholder="Search contact..."
          disabled={!state.contacts.length}
          onChange={e => setSearch(e.target.value.toLowerCase().trim())}
        />
        {!state.selectOption ? (
          <div>
            <button
              title="Select Contacts"
              onClick={() => {
                dispatch({ type: "selectOption", payload: true });
                dispatch({ type: "selectOption", payload: true });
              }}
            >
              <LiaSquare />
            </button>
            <NavLink title="Add new contact" to="/add_contact">
              <LiaPlusSquareSolid />
            </NavLink>
          </div>
        ) : (
          <div>
            {!!state.selectAll ? (
              <button
                title="Select All"
                onClick={() => dispatch({ type: "selectAll", payload: false })}
              >
                <LiaSquareFullSolid />
              </button>
            ) : (
              <button
                title="Deselect All"
                onClick={() => dispatch({ type: "selectAll", payload: true })}
              >
                <LiaMinusSquareSolid />
              </button>
            )}
            <button
              title="Delete selected!"
              onClick={e => {
                e.stopPropagation();
                if (state.selectAll) {
                  modalDispatch({ type: "deleteAll" });
                } else {
                  modalDispatch({ type: "deleteSelected" });
                }
              }}
            >
              <RiDeleteBin6Line />
            </button>
            <button
              title="Cancel"
              onClick={() => {
                dispatch({ type: "selectOption", payload: false });
                dispatch({ type: "selectOption", payload: false });
                dispatch({ type: "selectAll", payload: false });
              }}
            >
              <LiaTimesSolid />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
