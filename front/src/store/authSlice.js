import { createSlice } from '@reduxjs/toolkit';
import { login, fetchProfile, updateProfile } from './authActions';

// Création du slice auth avec Redux Toolkit. Ce slice gère l'état d'authentification de l'utilisateur.
const authSlice = createSlice({
    name: 'auth', // Nom du slice, utilisé pour référencer les actions et l'état
    initialState: {
        // État initial du slice
        isAuthenticated: !!localStorage.getItem('token'), // Si un token existe dans localStorage, l'utilisateur est authentifié
        user: null, // Informations de l'utilisateur (seront récupérées après l'authentification)
        token: localStorage.getItem('token'), // Token d'authentification stocké dans localStorage
        status: 'idle', // Statut de la requête : 'idle', 'loading', 'succeeded', ou 'failed'
        error: null, // Erreurs liées à l'authentification ou à la récupération des données utilisateur
    },
    reducers: {
        // Les actions synchrones
        logout(state) {
            // Action de déconnexion de l'utilisateur
            state.isAuthenticated = false; // L'utilisateur n'est plus authentifié
            state.user = null; // Effacement des informations utilisateur
            state.token = null; // Effacement du token d'authentification
            localStorage.removeItem('token'); // Suppression du token de localStorage
        },
    },
    extraReducers: (builder) => {
        // Gestion des actions asynchrones définies dans authActions.js
        builder
            .addCase(login.pending, (state) => {
                // Pendant la tentative de connexion
                state.status = 'loading'; // Changement du statut à "loading" pendant le processus de connexion
            })
            .addCase(login.fulfilled, (state, action) => {
                // Si la connexion est réussie
                state.status = 'succeeded'; // Connexion réussie
                state.isAuthenticated = true; // L'utilisateur est authentifié
                state.token = action.payload; // Le token d'authentification est sauvegardé
            })
            .addCase(login.rejected, (state, action) => {
                // Si la connexion échoue
                state.status = 'failed'; // Connexion échouée
                state.error = action.payload.message; // L'erreur est sauvegardée dans l'état
            })
            .addCase(fetchProfile.pending, (state) => {
                // Pendant la récupération du profil utilisateur
                state.status = 'loading'; // Récupération du profil en cours
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                // Si la récupération du profil est réussie
                state.status = 'succeeded'; // Profil récupéré avec succès
                state.user = action.payload; // Sauvegarde des informations du profil utilisateur
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                // Si la récupération du profil échoue
                state.status = 'failed'; // Échec de la récupération
                state.error = action.payload.message; // Sauvegarde de l'erreur
            })
            .addCase(updateProfile.pending, (state) => {
                // Pendant la mise à jour du profil utilisateur
                state.status = 'loading'; // Mise à jour du profil en cours
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                // Si la mise à jour est réussie
                state.status = 'succeeded'; // Mise à jour réussie
                state.user = action.payload; // Mise à jour des informations utilisateur dans l'état
            })
            .addCase(updateProfile.rejected, (state, action) => {
                // Si la mise à jour échoue
                state.status = 'failed'; // Échec de la mise à jour
                state.error = action.payload.message; // Sauvegarde de l'erreur
            });
    },
});

export const { logout } = authSlice.actions; // Export de l'action logout
export default authSlice.reducer; // Export du reducer pour l'intégrer dans le store Redux
