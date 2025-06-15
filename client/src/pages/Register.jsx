import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(" Enviando datos de registro...", form); //  Este mensaje debe salir en consola

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});

    const data = await res.json();
    if (res.ok) {
      alert(" Usuario registrado correctamente");
      navigate("/login");
    } else {
      alert("" + data.message);
    }
  } catch (err) {
    console.error(" Error en la solicitud:", err);
    alert(" Error en el servidor");
  }
  };

  return (
    <div className="form-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
