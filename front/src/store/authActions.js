import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Axios est utilisé pour simplifier les requêtes HTTP vers l'API


// Action asynchrone pour la connexion de l'utilisateur
// Cette action envoie une requête à l'API pour authentifier l'utilisateur avec son email et son mot de passe
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        // Envoi des informations de connexion à l'API
        const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
        const { token } = response.data.body; // Extraction du token de la réponse
        localStorage.setItem('token', token); // Sauvegarde du token dans localStorage
        return token; // Renvoi du token comme payload
    } catch (error) {
        // Si la requête échoue, on retourne l'erreur
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


// Action asynchrone pour récupérer le profil utilisateur
// Cette action récupère les informations de l'utilisateur connecté à partir de l'API
export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkAPI) => {
    const token = localStorage.getItem('token'); // Récupération du token depuis localStorage
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/user/profile', // API pour obtenir le profil
            {},
            { headers: { Authorization: `Bearer ${token}` } } // Envoi du token dans les en-têtes pour authentification
        );
        return response.data.body; // Renvoi des données utilisateur
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data); // Gestion des erreurs
    }
});

// Action asynchrone pour mettre à jour le profil utilisateur
// Cette action envoie les nouvelles informations du profil à l'API
export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, thunkAPI) => {
    const token = localStorage.getItem('token'); // Récupération du token depuis localStorage
    try {
        const response = await axios.put(
            'http://localhost:3001/api/v1/user/profile', // API pour mettre à jour le profil
            profileData,
            { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } } // Envoi du token et des données
        );
        return response.data.body; // Renvoi des données mises à jour du profil
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data); // Gestion des erreurs
    }
});
