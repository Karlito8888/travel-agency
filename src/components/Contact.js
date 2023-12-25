import React, { useState } from "react";

function Contact() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");
  const [formClass, setFormClass] = useState("");

  const handleBlur = (event) => {
    if (event.target.htmlFor === "msg") {
      setFormClass(""); // On retire la classe (qui baisse le bouton submit)
    }
    if (event.target.value !== "") {
      event.target.htmlFor === "msg" && setFormClass("messOuvert"); // Ajout de la classe pour agrandir le champ
    }
  };

  const handleTextareaFocus = () => {
    if (msg === "") {
      setFormClass("messOuvert"); // Rajout de la classe pour baisser le bouton submit
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section id="contact">
      <form className={formClass}>
        <h3>CONTACTEZ NOUS !</h3>
        <div>
          <input
            type="text"
            id="nom"
            placeholder="Qui êtes-vous ?"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <label htmlFor="nom">Nom</label>
        </div>
        <div>
          <input
            type="text"
            id="prenom"
            placeholder="Qui êtes-vous ?"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <label htmlFor="prenom">Prénom</label>
        </div>
        <div>
          <input
            type="text"
            id="mail"
            placeholder="Quelle est votre adresse Mail ?"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <label htmlFor="mail">Mail</label>
        </div>
        <div>
          <textarea
            id="msg"
            placeholder="Tapez ici votre message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onBlur={handleBlur}
            onFocus={handleTextareaFocus}
          />
          <label htmlFor="msg">Message</label>
        </div>
        <input
          className="button"
          type="submit"
          value="Envoyer"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </section>
  );
}
export default Contact;
