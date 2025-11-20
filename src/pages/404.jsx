import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";

import styles from "../modules/404.module.css";

function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1>Not Found</h1>
      <h2 className={styles.warning}>
        Invalid <span>URL</span>
      </h2>
      <h4>
        Redirect to contacts list
        <span>
          <SyncLoader size={5} color="#ffead0" />
        </span>
      </h4>
    </div>
  );
}

export default ErrorPage;
