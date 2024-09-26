// src/components/User.js
import React, { useState, useEffect } from 'react'; // Importation de React, et des hooks useState et useEffect
import { useDispatch, useSelector } from 'react-redux'; // Importation de hooks Redux pour dispatcher des actions et accéder au store
import { fetchProfile, updateProfile } from '../store/authActions'; // Importation des actions pour récupérer et mettre à jour le profil utilisateur
import Account from './Account'; // Importation du composant Account pour afficher les comptes bancaires
import '../assets/css/user.css'; // Importation du fichier CSS pour le style

function User() {
  const dispatch = useDispatch(); // Hook pour dispatcher des actions Redux
  const user = useSelector((state) => state.auth.user); // Sélecteur pour accéder aux informations de l'utilisateur dans le store Redux
  const status = useSelector((state) => state.auth.status); // Sélecteur pour accéder au statut de la requête (chargement, réussite, échec)
  const error = useSelector((state) => state.auth.error); // Sélecteur pour accéder aux erreurs éventuelles lors du chargement des données
  const [editMode, setEditMode] = useState(false); // Hook d'état pour gérer le mode d'édition (true = édition, false = affichage normal)
  const [newUserName, setNewUserName] = useState(''); // Hook d'état pour stocker le nouveau nom d'utilisateur à éditer

  // useEffect qui se déclenche au montage du composant pour charger les informations de profil en appelant l'action fetchProfile
  useEffect(() => {
    dispatch(fetchProfile()); // Action pour récupérer le profil de l'utilisateur
  }, [dispatch]); // Le hook s'exécute lorsque 'dispatch' change, mais dans ce cas il ne change jamais

  // useEffect qui se déclenche lorsqu'il y a une modification des données utilisateur pour pré-remplir le champ du nom d'utilisateur
  useEffect(() => {
    if (user) {
      setNewUserName(user.userName || ''); // Si l'utilisateur existe, on met à jour l'état du champ 'userName'
    }
  }, [user]); // S'exécute chaque fois que 'user' change

  // Fonction pour activer le mode édition
  const handleEdit = () => setEditMode(true);

  // Fonction pour sauvegarder le nouveau nom d'utilisateur en dispatchant l'action updateProfile
  const handleSave = async () => {
    try {
      await dispatch(updateProfile({ userName: newUserName })); // Mise à jour du profil avec le nouveau nom d'utilisateur
      setEditMode(false); // Désactivation du mode édition après la sauvegarde
    } catch (error) {
      console.error("Failed to save profile:", error); // Gestion des erreurs lors de la sauvegarde
    }
  };

  // Fonction pour annuler l'édition et revenir à l'affichage sans modification
  const handleCancel = () => setEditMode(false);

  // Gestion des états du chargement ou de l'échec de la requête
  if (status === 'loading') return <p>Loading...</p>; // Affichage d'un message de chargement
  if (status === 'failed') return <p style={{ color: 'red' }}>Error: {error}</p>; // Affichage d'une erreur en rouge si la requête a échoué

  return (
    <main className={`main bg-dark ${editMode ? 'user-edit-mode' : ''}`}>
      <div className="header">
        {editMode ? ( // Si le mode édition est activé, on affiche le formulaire pour éditer le nom d'utilisateur
          <>
            <h2>Edit user info</h2>
            <div>
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                value={newUserName} // Champ contrôlé lié à l'état 'newUserName'
                onChange={(e) => setNewUserName(e.target.value)} // Mise à jour de l'état à chaque changement dans le champ de saisie
                placeholder="User Name"
              />
            </div>
            <div>
              <label htmlFor="firstName">First name:</label>
              <input type="text" id="firstName" value={user?.firstName} readOnly /> {/* Champ non modifiable pour le prénom */}
            </div>
            <div>
              <label htmlFor="lastName">Last name:</label>
              <input type="text" id="lastName" value={user?.lastName} readOnly /> {/* Champ non modifiable pour le nom */}
            </div>
            <div className="button-group">
              <button className="edit-button" onClick={handleSave}>Save</button> {/* Bouton pour sauvegarder */}
              <button className="edit-button cancel" onClick={handleCancel}>Cancel</button> {/* Bouton pour annuler */}
            </div>
          </>
        ) : ( // Si le mode édition n'est pas activé, on affiche les informations de l'utilisateur
          <>
            <h1>
              Welcome back<br />
              {`${user?.firstName} ${user?.lastName}`} {/* Affichage du nom complet de l'utilisateur */}
            </h1>
            <button className="edit-button" onClick={handleEdit}>Edit User Name</button> {/* Bouton pour passer en mode édition */}
          </>
        )}
      </div>

      {/* Affichage des comptes bancaires */}
      <h2 className="sr-only">Accounts</h2>
      <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" /> {/* Compte courant */}
      <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" /> {/* Compte épargne */}
      <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" /> {/* Carte de crédit */}
    </main>
  );
}

export default User;
