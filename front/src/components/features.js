import React from 'react';
import iconChat from '../assets/img/icon-chat.webp';
import iconMoney from '../assets/img/icon-money.webp';
import iconSecurity from '../assets/img/icon-security.webp';

const featuresData = [
  {
    imgSrc: iconChat,
    altText: 'Chat Icon',
    title: 'You are our #1 priority',
    description: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
  },
  {
    imgSrc: iconMoney,
    altText: 'Money Icon',
    title: 'More savings means higher rates',
    description: 'The more you save with us, the higher your interest rate will be!',
  },
  {
    imgSrc: iconSecurity,
    altText: 'Security Icon',
    title: 'Security you can trust',
    description: 'We use top of the line encryption to make sure your data and money is always safe.',
  },
];

const Features = () => (
  <section className="features">
    <h2 className="sr-only">Features</h2>
    {featuresData.map((feature, index) => (
      <div key={index} className="feature-item">
        <img src={feature.imgSrc} alt={feature.altText} className="feature-icon" />
        <h3 className="feature-item-title">{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </section>
);

export default Features;
