import { v4 as uuidv4 } from "uuid";

const dataSlider = [
  {
    id: uuidv4(),
    title: "Planifier",
    imageUrl: "./media/img/icone-1.png",    
    subTitle: "Confiez-nous vos rêves d’évasion.\nEn famille ou entre amis, nous trouverons la formule qui comblera vos attentes.",
  },
  {
    id: uuidv4(),
    title: "Organiser",
    imageUrl: "./media/img/icone-2.png",    
    subTitle: "Bénéficiez de l’expertise de nos spécialistes pour toutes destinations. Ils vous accompagnent dans la réalisation de votre voyage.",
  },
  {
    id: uuidv4(),
    title: "Voyager",
    imageUrl: "./media/img/icone-3.png",    
    subTitle: " Nous nous chargeons d’assurer votre sécurité et de veiller à votre pleine sérénité tout au long de votre voyage."
},
];

export default dataSlider;