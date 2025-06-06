import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientNavBar from '../../../Component/Nav/ClientNavBar';
import MainNav from '../../../Component/Nav/MainNav';
import Footer from '../../../Component/Footer/Footer';

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
        '2Months': [],
        '4Months': [],
        '6Months': [],
        '9Months': [],
        '12Months': [],
        '18Months': [],
        '3Years': [],
        '5Years': [],
        '11Years': [],
    };

    impOfVaccines.forEach(vaccine => {
        if (ageCategories[vaccine.impofAge]) {
            ageCategories[vaccine.impofAge].push(vaccine);
        }
    });

    return (
        <div>
        <section>
            <h1 className='ha4'>Importance of Vaccine</h1>
            {Object.entries(ageCategories).map(([age, vaccines]) => (
                vaccines.length > 0 && (
                    <div key={age}>
                        <h4>{age.replace(/([A-Z])/g, ' $1')}</h4>
                        <table className='table table-bordered shadow container'>
                            <tbody>
                                {vaccines.map(vaccine => (
                                    <tr key={vaccine.impofid}>
                                        <td>{vaccine.impofWeekRange}weeks </td>
                                        <td>{vaccine.impofvaccine_name}</td>
                                        <td>{vaccine.impofdescription}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ))}
        </section>
        <Footer/>
        </div>
    );
}

export default ImpOfVaccineTable;
