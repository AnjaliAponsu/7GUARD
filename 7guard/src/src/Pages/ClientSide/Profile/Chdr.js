import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chdr = () => {
    const { CHDR_id } = useParams(); 
    const [impOfVaccines, setImpOfVaccines] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (CHDR_id) {
            loadImpofvaccines();
        } else {
            setError('Invalid CHDR ID');
            setLoading(false);
        }
    }, [CHDR_id]);

    const loadImpofvaccines = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iov/chdr/${CHDR_id}`);
            console.log('Vaccines loaded:', response.data);
            setImpOfVaccines(response.data);
        } catch (error) {
            console.error('Error loading vaccine data:', error);
            setError('Failed to load vaccine data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <section>
                <h1 className='vhead'>Vaccine List</h1>

                    <table className="table table-bordered table-hover shadow container">
                        <thead>
                            <tr className="text-center">
                                <th>Vaccine Name</th>
                                <th>Scan</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {impOfVaccines.map((impOfVaccine) => (
                                <tr key={impOfVaccine.impofid}>
                                    <td>{impOfVaccine.impofvaccine_name}</td>
                                    <td>
                                        {impOfVaccine.scan && impOfVaccine.scan.length > 0 ? (
                                            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                                {impOfVaccine.scan.map((scan) => (
                                                    <li key={scan.id}>
                                                         {scan.scan}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
            </section>
        </div>
    );
};

export default Chdr;
