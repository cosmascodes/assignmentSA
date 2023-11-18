import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <header>
        <h1>Create your account</h1>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error_msg}>{error}</div>}
        <input
          type="text"
          placeholder="Full Name"
          name="fullname"
          onChange={handleChange}
          value={data.firstName}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email address"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className={styles.input}
        />
        <p>
          By submitting this form, you agree and accept the Terms of Use and
          consent to receiving communications from us.
        </p>
        <button type="submit" className={styles.btn}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default Signup;
