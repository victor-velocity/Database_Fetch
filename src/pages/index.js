import { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('api/data');
            const result = await response.json();
            setData(result.data);
        };

        fetchData();
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '24px' }}>
            <div
                style={{
                    maxWidth: '960px',
                    margin: '0 auto',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '24px',
                }}
            >
                <h1
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '16px',
                    }}
                >
                    Data from PostgreSQL DB
                </h1>
                <div style={{ overflowX: 'auto' }}>
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            border: '1px solid #d1d5db',
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    backgroundColor: '#e5e7eb',
                                    color: '#374151',
                                }}
                            >
                                <th style={{ padding: '12px 16px', border: '1px solid #d1d5db' }}>Name</th>
                                <th style={{ padding: '12px 16px', border: '1px solid #d1d5db' }}>Age</th>
                                <th style={{ padding: '12px 16px', border: '1px solid #d1d5db' }}>Skills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={item.id}
                                    style={{
                                        backgroundColor: index % 2 === 0 ? '#f9fafb' : '#ffffff',
                                    }}
                                >
                                    <td style={{ padding: '8px 16px', border: '1px solid #d1d5db' }}>{item.profile_name}</td>
                                    <td style={{ padding: '8px 16px', border: '1px solid #d1d5db' }}>{item.profile_age}</td>
                                    <td style={{ padding: '8px 16px', border: '1px solid #d1d5db' }}>{item.profile_skills}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}