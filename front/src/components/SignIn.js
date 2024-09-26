// Importation des modules nécessaires depuis React, Redux et React Router
import React, { useState } from 'react'; // useState est utilisé pour gérer l'état local des champs de saisie (email et mot de passe)
import { useDispatch, useSelector } from 'react-redux'; // useDispatch permet d'envoyer des actions Redux, useSelector permet de lire l'état depuis le store Redux
import { useNavigate } from 'react-router-dom'; // useNavigate permet de rediriger l'utilisateur vers une autre route après une action réussie
import { login } from '../store/authActions'; // Importation de l'action login pour gérer l'authentification utilisateur

// Définition du composant fonctionnel SignIn
function SignIn() {
    // Déclaration des états locaux pour stocker les valeurs de l'email (nom d'utilisateur) et du mot de passe
    const [username, setUsername] = useState(''); // username contiendra l'email saisi par l'utilisateur
    const [password, setPassword] = useState(''); // password contiendra le mot de passe saisi par l'utilisateur
    
    // Initialisation du hook dispatch pour envoyer des actions au store Redux
    const dispatch = useDispatch();
    
    // Initialisation du hook useNavigate pour rediriger l'utilisateur après une connexion réussie
    const navigate = useNavigate();
    
    // Récupération de l'état d'authentification et des erreurs depuis Redux
    // 'status' montre l'état actuel de la requête d'authentification (loading, succeeded, failed)
    // 'error' contiendra un message d'erreur en cas de problème lors de l'authentification
    const { status, error } = useSelector((state) => state.auth);

    // Fonction qui se déclenche lors de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
        
        // Envoi des informations de connexion (email et mot de passe) à l'action login via dispatch
        // L'action login fait une requête API et renvoie une promesse
        const result = await dispatch(login({ email: username, password }));

        // Si l'action login réussit (login.fulfilled.match vérifie cela), on redirige l'utilisateur vers la page '/user'
        if (login.fulfilled.match(result)) {
            navigate('/user'); // Redirection vers la page utilisateur après une authentification réussie
        }
    };

    return (
        <main className="main bg-dark"> {}
            <section className="sign-in-content"> {/* Section contenant le formulaire de connexion */}
                {/* Icône utilisateur affichée avant le formulaire */}
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1> {/* Titre du formulaire */}
                
                {/* Formulaire de connexion */}
                <form onSubmit={handleSubmit}> {/* handleSubmit est appelé lorsque l'utilisateur soumet le formulaire */}
                    <div className="input-wrapper">
                        {/* Label pour le champ "Username" */}
                        <label htmlFor="username">Username</label>
                        
                        {/* Champ de saisie pour le nom d'utilisateur */}
                        {/* Le hook useState est utilisé pour capturer la valeur du champ */}
                        <input
                            type="text"
                            id="username"
                            value={username} // La valeur du champ correspond à l'état 'username'
                            onChange={(e) => setUsername(e.target.value)} // Met à jour l'état 'username' chaque fois que l'utilisateur tape quelque chose
                        />
                    </div>
                    
                    <div className="input-wrapper">
                        {/* Label pour le champ "Password" */}
                        <label htmlFor="password">Password</label>
                        
                        {/* Champ de saisie pour le mot de passe */}
                        {/* La valeur du champ est stockée dans l'état 'password' */}
                        <input
                            type="password"
                            id="password"
                            value={password} // La valeur du champ correspond à l'état 'password'
                            onChange={(e) => setPassword(e.target.value)} // Met à jour l'état 'password' chaque fois que l'utilisateur tape quelque chose
                        />
                    </div>
                    
                    {/* Bouton de soumission du formulaire */}
                    <button className="sign-in-button" type="submit">
                        Sign In
                    </button>
                </form>

                {/* Affichage d'un message de chargement si la requête est en cours */}
                {status === 'loading' && <p>Loading...</p>}
                
                {/* Affichage d'un message d'erreur si la requête a échoué */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </section>
        </main>
    );
}

export default SignIn; // Exportation du composant pour l'utiliser ailleurs dans l'application
