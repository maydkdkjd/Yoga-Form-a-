import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Homepage from './Homepage';
import "../App.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    utility(formData);
  };

  const utility = async (formData) => {
    const { email, password } = formData;
    // API call
    try {
      const response = await fetch("https://yoga-8bvo.onrender.com/userValidation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Navigate to the Homepage component with the email prop
        navigate('/Homepage', { state: { email: email } });
        console.log('Payment successful:', data.message);
      } else {
        setMsg(data.message);
        console.error('Payment failed:', data.message);
      }
    } catch (error) {
      console.log('error:', error);
    }
};

  return (
    <>
    <h1>Login</h1>
    <div className="con">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

        
        <button
  type="submit"
  disabled={
    !(
      formData.password.trim() &&
      formData.email.trim()
    )
  }
  style={{
    backgroundColor: !(
      formData.password.trim() &&
      formData.email.trim()
    )
      ? 'lightgray'
      : '#0056b3',
    cursor: !(
      formData.password.trim() &&
      formData.email.trim()
    )
      ? 'not-allowed'
      : 'pointer',
  }}
>
  Submit
</button>
      </form>
      <p style={{textAlign : 'center'}}>Don't have an account <Link to="/Signup">Signup</Link></p>
    </div>
    {msg > 0 ? <p style={{color : 'red'}}>{msg}</p> : ""}
    </>
  );
}