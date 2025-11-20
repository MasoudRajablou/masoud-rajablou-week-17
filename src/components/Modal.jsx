import { useNavigate } from "react-router";
import { useContext } from "react";

import { ContactContext } from "../providers/ContactProvider";
import { ModalContext } from "../providers/ModalProvider";

import styles from "../modules/Modal.module.css";

function Modal() {
  const { state, dispatch } = useContext(ContactContext);
  const { modalState, modalDispatch } = useContext(ModalContext);

  const navigate = useNavigate();

  return (
    <div
      className={styles.overlay}
      onClick={() => modalDispatch({ type: "cancel", payload: false })}
    >
      <div className={styles.modal}>
        {modalState.modal && modalState.operation === "close" && (
          <>
            <p>{modalState.message}</p>
            <button
              className={styles.yes}
              onClick={() => {
                modalDispatch({ type: "cancel" });
                navigate("/");
              }}
            >
              Yes
            </button>
            <button
              className={styles.no}
              onClick={() => modalDispatch({ type: "cancel" })}
            >
              No
            </button>
          </>
        )}

        {modalState.modal && modalState.operation === "add" && (
          <>
            <p>{modalState.message}</p>
            <button
              className={styles.yes}
              onClick={() => {
                dispatch({ type: "addContact", payload: modalState.extra });
                modalDispatch({ type: "cancel" });
                navigate("/");
              }}
            >
              Yes
            </button>
            <button
              className={styles.no}
              onClick={() => modalDispatch({ type: "cancel", payload: false })}
            >
              No
            </button>
          </>
        )}

        {modalState.operation === "delete" && (
          <>
            <p>{modalState.message}</p>
            <button
              className={styles.yes}
              onClick={() => {
                dispatch({
                  type: "delete",
                  payload: modalState.extra,
                });
                modalDispatch({ type: "cancel" });
              }}
            >
              Yes
            </button>
            <button
              className={styles.no}
              onClick={() => modalDispatch({ type: "cancel" })}
            >
              No
            </button>
          </>
        )}

        {modalState.operation === "deleteAll" && (
          <>
            <p>{modalState.message}</p>
            <button
              className={styles.yes}
              onClick={() => {
                dispatch({
                  type: "deleteAll",
                  payload: true,
                });
                dispatch({ type: "selectOption", payload: false });
                modalDispatch({ type: "cancel" });
              }}
            >
              Yes
            </button>
            <button
              className={styles.no}
              onClick={() => modalDispatch({ type: "cancel" })}
            >
              No
            </button>
          </>
        )}

        {modalState.operation === "deleteSelected" && (
          <>
            <p>{modalState.message}</p>
            <button
              className={styles.yes}
              onClick={() => {
                dispatch({
                  type: "deleteSelected",
                });
                dispatch({ type: "selectOption", payload: false });
                modalDispatch({ type: "cancel" });
              }}
            >
              Yes
            </button>
            <button
              className={styles.no}
              onClick={() => modalDispatch({ type: "cancel" })}
            >
              No
            </button>
          </>
        )}

        {modalState.operation === "edit" && (
          <>
            <p>{modalState.message}</p>
            <button
              className={styles.yes}
              onClick={() => {
                dispatch({
                  type: "edit",
                  payload: modalState.extra,
                });
                dispatch({ type: "showOption", payload: false });
                modalDispatch({ type: "cancel" });
                navigate("/");
              }}
            >
              Yes
            </button>
            <button
              className={styles.no}
              onClick={() => modalDispatch({ type: "cancel" })}
            >
              No
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
