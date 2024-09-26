import React from 'react';
import iconChat from '../assets/img/icon-chat.webp'; // Image pour l'icône de chat
import iconMoney from '../assets/img/icon-money.webp'; // Image pour l'icône d'argent
import iconSecurity from '../assets/img/icon-security.webp'; // Image pour l'icône de sécurité

// Tableau contenant les données de chaque fonctionnalité (icône, titre, description)
const featuresData = [
  {
    imgSrc: iconChat, // Chemin de l'image pour l'icône de chat
    altText: 'Chat Icon', // Texte alternatif pour l'accessibilité
    title: 'You are our #1 priority', // Titre de la fonctionnalité
    description: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.', // Description de la fonctionnalité
  },
  {
    imgSrc: iconMoney, // Chemin de l'image pour l'icône d'argent
    altText: 'Money Icon', // Texte alternatif pour l'accessibilité
    title: 'More savings means higher rates', // Titre de la fonctionnalité
    description: 'The more you save with us, the higher your interest rate will be!', // Description de la fonctionnalité
  },
  {
    imgSrc: iconSecurity, // Chemin de l'image pour l'icône de sécurité
    altText: 'Security Icon', // Texte alternatif pour l'accessibilité
    title: 'Security you can trust', // Titre de la fonctionnalité
    description: 'We use top of the line encryption to make sure your data and money is always safe.', // Description de la fonctionnalité
  },
];

// Composant React "Features" qui affiche la liste des fonctionnalités
const Features = () => (
  <section className="features">
    {/* Titre accessible uniquement pour les lecteurs d'écran */}
    <h2 className="sr-only">Features</h2>
    
    {/* Utilisation de la méthode map() pour parcourir le tableau featuresData et afficher chaque fonctionnalité */}
    {featuresData.map((feature, index) => (
      // Chaque fonctionnalité est rendue dans une div avec une clé unique (index) pour React
      <div key={index} className="feature-item">
        {/* Image de la fonctionnalité */}
        <img src={feature.imgSrc} alt={feature.altText} className="feature-icon" />
        {/* Titre de la fonctionnalité */}
        <h3 className="feature-item-title">{feature.title}</h3>
        {/* Description de la fonctionnalité */}
        <p>{feature.description}</p>
      </div>
    ))}
  </section>
);

// Exportation du composant pour pouvoir l'utiliser dans d'autres fichiers
export default Features;
