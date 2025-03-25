import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class Service {
    submitprescription(newPrescription) {
        return axios.post(`${API_URL}/Prescription/savePrescription`, newPrescription, {
            headers: {
                'Content-Type': 'application/json', 
            }
        });
    }

    updateprescription(prescriptionId,newPrescription) {
        return axios.put(`${API_URL}/Prescription/updatePrescriptionByID/${prescriptionId}`, newPrescription, {
            headers: {
                'Content-Type': 'application/json', 
            }
        });
    }

    deletePrescriptiongById(channelingID) {
        return axios.delete(`${API_URL}/Prescription/deletePrescription/${channelingID}`);
    }

}

export default new Service();
