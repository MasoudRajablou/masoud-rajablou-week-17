import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { SyncLoader } from "react-spinners";

import { ContactContext } from "../providers/ContactProvider";
import { ModalContext } from "../providers/ModalProvider";
import EditContact from "../components/EditContact";

function EditPage() {
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);

  const { state, dispatch } = useContext(ContactContext);

  const params = useParams();
  const idParams = Number(params.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.contacts.length > 0) {
      if (idParams > state.contacts.length) {
        navigate("/404");
      }

      const editContact = state.contacts.find(c => c.id === idParams);

      setLoading(false);
      setContact(editContact);
    }
  }, [state.contacts]);

  return (
    <div>
      {!!loading && (
        <div>
          <SyncLoader margin={15} color="#ffead0" />
        </div>
      )}
      {state.contacts.length > 0 && (
        <EditContact contact={contact} setContact={setContact} />
      )}
      
    </div>
  );
}

export default EditPage;
