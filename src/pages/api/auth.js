// Import the Database Helper Function
import queryreq from "@/lib/db";

// Creating the API Handler
export default async function handler(req, res) {
    // Handling different HTTP Methods
    if (req.method === 'POST') {
        const { username, password } = req.body;
        try {
            const result = await queryreq(
                `SELECT user_id, username FROM users WHERE username = $1 AND password = $2`,
                [username, password]
            );

            if (result.rows.length > 0) {
                res.status(200).json({ success: true, data: result.rows[0] });
            } else {
                res.status(401).json({ success: false, error: 'Invalid username or password' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ success: false, error: 'Error during login' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}