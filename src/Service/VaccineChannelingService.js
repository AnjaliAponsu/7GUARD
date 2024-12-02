import axios from 'axios';

const API_URL = 'http://localhost:8080/7Guard/Channeling/VaccineChanneling';
class VaccineChannelingService{
    submitChanneling(channelingData) {
        return axios.post(`${API_URL}/saveChanneling`,channelingData); 
    }

    updateAdminChanneling(channelid, channelingData) {
        return axios.put(`${API_URL}/changeChannelingAdmin/${channelid}`,channelingData); 
    }
    
    async updateStatusChanneling(channelingID,channelingData) {
        return axios.put(`${API_URL}/updateChanneling/${channelingID}`,channelingData); 
    }

   
    deleteChannelingById(channelingID) {
        return axios.delete(`${API_URL}/deleteChannelingByChannelingID/${channelingID}`);
    }

async updateChanneling (channelingID,channelingData) {
        try {
            const response = await axios.put(`${API_URL}/updateChannelingByID/${channelingID}`,channelingData);
            return response; 
        } catch (error) {
            console.error('Error submitting channeling:', error);
            throw error; 
        }
    };

async placeVaccineChanneling(channelingData) {
    try {
        const response = await axios.post('http://localhost:8080/7Guard/Channeling/VaccineChanneling/channeling', channelingData);
        return response;
    } catch (error) {
        console.error('Error placing channeling:', error);
        throw error; 
    }
}
async countVaccineChannelingRecords (doctorId, date) {
    try {
        const response = await axios.get(`${API_URL}/countChannelingRecords/${doctorId}/${date}`);
        return response.data.count; 
    } catch (error) {
        console.error('Error counting vaccine channeling records:', error);
        throw error; 
    }
};

async submitChanneling (channelingData) {
    try {
        const response = await axios.post(`${API_URL}/schedules`, channelingData);
        return response; 
    } catch (error) {
        console.error('Error submitting channeling:', error);
        throw error; 
    }
};


}

export default new VaccineChannelingService();