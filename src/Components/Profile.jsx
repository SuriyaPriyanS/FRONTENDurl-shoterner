
// import React, { useState, useEffect } from 'react';
// import { getUserProfile, updateUserProfile } from '../Server/ApiServer'; // Add these functions in your API file

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getUserProfile();
//         setProfile(data);
//       } catch (error) {
//         setError('Failed to fetch profile data.');
//         console.error('Profile Error:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleUpdateProfile = async (updatedData) => {
//     try {
//       await updateUserProfile(updatedData);
//       setProfile(updatedData);
//     } catch (error) {
//       setError('Failed to update profile data.');
//       console.error('Update Profile Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Profile</h2>
//       {profile ? (
//         <div>
//           <p>Name: {profile.name}</p>
//           <p>Email: {profile.email}</p>
//           {/* Add form fields for updating profile */}
//           <button onClick={() => handleUpdateProfile({ name: 'New Name' })}>Update Profile</button>
//         </div>
//       ) : (
//         <p>{error || 'Loading...'}</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
