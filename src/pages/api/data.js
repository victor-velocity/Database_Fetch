// Import the Database Helper Function
import queryreq from "@/lib/db";

// Creating the API Handler
export default async function handler(req, res) {
    // Handling different HTTP Methods
    if (req.method === 'GET') {
        try {
            const result = await queryreq('SELECT * FROM studentprofile', []);
            res.status(200).json({ data: result.rows });
        } catch (error) {
            console.error('Error fetching data from the database:', error);
            res.status(500).json({ error: 'Error fetching data from the database' });
        }
    } else if (req.method === 'POST') {
        const { profile_name, profile_skills, profile_age } = req.body;
        try {
            const result = await queryreq(
                `INSERT INTO studentprofile (profile_name, profile_skills, profile_age) VALUES ($1, $2, $3) RETURNING *`, 
                [profile_name, profile_skills, profile_age]
            );
            res.status(201).json({ data: result.rows[0] });
        } catch (error) {
            console.error('Error inserting data into the database:', error);
            res.status(500).json({ error: 'Error inserting data into the database' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
