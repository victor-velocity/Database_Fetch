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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="profile_name">Profile Name:</label>
                <input
                    type="text"
                    id="profile_name"
                    name="profile_name"
                    value={formData.profile_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="profile_skills">Profile Skills:</label>
                <input
                    type="text"
                    id="profile_skills"
                    name="profile_skills"
                    value={formData.profile_skills}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="profile_age">Profile Age:</label>
                <input
                    type="number"
                    id="profile_age"
                    name="profile_age"
                    value={formData.profile_age}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;