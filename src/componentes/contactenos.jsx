import emailjs from "@emailjs/browser";
import logoempresa from "../img/logoempresa.png";
import { Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Nav = () => (
  <div className="nav">
    <img src={logoempresa} alt="Logo" className="navlg" />
    <link to="/"></link>
    <ul className="info">
      <Link to="/">
        <li>Inicio</li>
      </Link>
      <Link to="/contacto">
        <li>Contacto</li>
      </Link>
    </ul>
  </div>
);

const Mailer = () => {
  const sendEmail = (event) => {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const userName = event.target.user_name.value;
    const userEmail = event.target.user_email.value;
    const userMessage = event.target.user_message.value;

    // Validar si todos los campos están completos
    if (
      userName.trim() === "" ||
      userEmail.trim() === "" ||
      userMessage.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios. Por favor, complete todos los campos antes de enviar el formulario.",
        confirmButtonText: "OK",
      });
      return;
    }

    emailjs
      .sendForm(
        "service_njc137d",
        "template_9g307sx",
        event.target,
        "vDzWDMaio7cDnj3Hw"
      )
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "¡Formulario enviado!",
          text: "Su solicitud ha sido enviada correctamente.",
          confirmButtonText: "OK",
        }).then(() => {
          // Limpiar los campos del formulario
          event.target.reset();
          // Refrescar la página
          window.location.reload();
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <div className="tAb">
        <br />
        <h1 className="title-form">FORMULARIO DE CONTACTO</h1>
        <br />
        <br />
        <form className="form-mail" onSubmit={sendEmail}>
          <label htmlFor="user_name">Nombre de remitente</label>
          <Input type="text" name="user_name" id="user_name" />
          <hr />
          <label htmlFor="user_email">Correo de remitente</label>
          <Input type="email" name="user_email" id="user_email" />
          <hr />
          <label htmlFor="user_message">Mensaje</label>
          <textarea
            className="textA"
            name="user_message"
            id="user_message"
            cols="30"
            rows="10"
          ></textarea>
          <hr />
          <button className="submit-button">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Mailer;
