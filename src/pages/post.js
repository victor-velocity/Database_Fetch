import React, { useState } from 'react';

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        profile_name: '',
        profile_skills: '',
        profile_age: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log('Inserted Data:', result.data);
            window.location.href = "/";
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="profile_name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Profile Name:</label>
                <input
                    type="text"
                    id="profile_name"
                    name="profile_name"
                    value={formData.profile_name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="profile_skills" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Profile Skills:</label>
                <input
                    type="text"
                    id="profile_skills"
                    name="profile_skills"
                    value={formData.profile_skills}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="profile_age" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Profile Age:</label>
                <input
                    type="number"
                    id="profile_age"
                    name="profile_age"
                    value={formData.profile_age}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                Submit
            </button>
        </form>
    );
};

export default ProfileForm;
