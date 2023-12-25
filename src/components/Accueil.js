import React from "react";
import Form from "./Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";


const Accueil = () => {
  return (
    <div className="accueil">
      <nav>
        <div className="logo">
          <h1>
            Travel Agency<span className="orange">.</span>
          </h1>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <a href="#acceuil">Accueil</a>
            </li>
            <li>
              <a href="#steps">S'organiser</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="nav-icons">
          <ul>
            <li>
              <a href="https://www.facebook.com/">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/?lang=fr">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Form />
    </div>
  );
};

export default Accueil;


