import { BrowserRouter, Route, Routes } from "react-router";

import ContactProvider from "./providers/ContactProvider";
import ModalProvider from "./providers/ModalProvider";
import HomePage from "./pages/HomePage";
import AddContactPage from "./pages/AddContactPage";
import EditPage from "./pages/EditPage";
import ErrorPage from "./pages/404";

function App() {
  return (
    <BrowserRouter>
      <ContactProvider>
        <ModalProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/add_contact" element={<AddContactPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ModalProvider>
      </ContactProvider>
    </BrowserRouter>
  );
}

export default App;
