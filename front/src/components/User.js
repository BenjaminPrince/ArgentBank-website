import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../store/authActions';
import '../assets/css/user.css';

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const [editMode, setEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  // Fetch profile on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update state with user data when fetched
  useEffect(() => {
    if (user) {
      setNewUserName(user.userName || '');
    }
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProfile({ userName: newUserName }));
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <main className={`main bg-dark ${editMode ? 'user-edit-mode' : ''}`}>
      <div className="header">
        {editMode ? (
          <>
            <h2>Edit user info</h2>
            <div>
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="User Name"
              />
            </div>
            <div>
              <label htmlFor="firstName">First name:</label>
              <input
                type="text"
                id="firstName"
                value={user?.firstName}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="lastName"
                value={user?.lastName}
                readOnly
              />
            </div>
            <div className="button-group">
              <button className="edit-button" onClick={handleSave}>Save</button>
              <button className="edit-button cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h1>
              Welcome back<br />
              {`${user?.firstName} ${user?.lastName}`}
            </h1>
            <button className="edit-button" onClick={handleEdit}>Edit User Name</button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default User;
