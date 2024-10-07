import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientNavBar from '../../../Component/Nav/ClientNavBar';

const ImpOfVaccineTable = () => {
    const [impOfVaccines, setImpOfVaccines] = useState([]);
    
    useEffect(() => {
        loadImpOfVaccines();
    }, []); 

    const loadImpOfVaccines = async () => {
        try {
            const result = await axios.get("http://localhost:8080/iov/viov");
            if (result.status === 200) {
                const sortedVaccineList = result.data.sort((a, b) => a.impofWeekRange - b.impofWeekRange);
                setImpOfVaccines(sortedVaccineList);
            }
        } catch (error) {
            console.error('Error fetching vaccines:', error);
        }
    };

    // Group vaccines by age
    const ageCategories = {
        AtBirth: [],
        '6Week': [],
        '10Week': [],
        '14Week': [],
        '6Months': [],
        '9Months': [],
        '12Months': [],
        '18Months': [],
        '6Years': [],
    };

    impOfVaccines.forEach(vaccine => {
        if (ageCategories[vaccine.impofAge]) {
            ageCategories[vaccine.impofAge].push(vaccine);
        }
    });

    return (
        <div>
            <ClientNavBar/>
        <section>
            <h1>Vaccine Schedule</h1>
            {Object.entries(ageCategories).map(([age, vaccines]) => (
                vaccines.length > 0 && (
                    <div key={age}>
                        <h3>{age.replace(/([A-Z])/g, ' $1')}</h3>
                        <table>
                            <tbody>
                                {vaccines.map(vaccine => (
                                    <tr key={vaccine.impofid}>
                                        <td>{vaccine.impofWeekRange}weeks </td>
                                        <td>=</td>
                                        <td>{vaccine.impofvaccine_name}</td>
                                        <td>=</td>
                                        <td>{vaccine.impofdescription}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ))}
        </section>
        </div>
    );
}

export default ImpOfVaccineTable;
