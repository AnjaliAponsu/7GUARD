import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddVaccineList = () => {
    const navigate = useNavigate();
    const [vaccineStock, setVaccineStock] = useState({
        vlistid: '',
        vlistvaccine_name: '',
        vlistquantity: '',
        expiredDate: '',
        manufactureDate: '',
        pVaccineList:{}
    });

    const { vlistid, vlistvaccine_name, vlistquantity, expiredDate, manufactureDate } = vaccineStock;

    const handleInputChange = (e) => {
        setVaccineStock({ ...vaccineStock, [e.target.name]: e.target.value });
    };

    const saveVaccineStock = async (e) => {
        e.preventDefault(); 
        try{
        await axios.post("http://localhost:8080/vl/avl", vaccineStock);
        console.log(vaccineStock);
         navigate("/vst"); 
        }catch(error){
            console.error ("Error saving vaccine list :" ,error);
            alert("This vaccine is already excist.")
        }
    };

  return (
    <div className='form20'>
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
    <div className="col-sm-8 py-2 px-5 shadow form21">
        <form onSubmit={saveVaccineStock} className="form-inline">
            <h1 className="vhead">Add Vaccines in to the Stock</h1>

            <div className="form-group row mb-2">
                <label htmlFor='vlistid' className="col-sm-2 col-form-label">Vaccine Id</label>
                <div className="col-sm-8">
                <input 
                    type='text' 
                    name='vlistid' 
                    id='vlistid'
                    value={vlistid}
                    onChange={handleInputChange}
                    className="form-control names-input">
                </input>
                </div>
            </div>
            <div className="form-group row mb-2">
                <label htmlFor='vlistvaccine_name' className="col-sm-2 col-form-label">Vaccine Name</label>
                <div className="col-sm-8">
                <input 
                    type='text' 
                    name='vlistvaccine_name' 
                    id='vlistvaccine_name'
                    value={vlistvaccine_name}
                    onChange={handleInputChange}
                    className="form-control names-input">
                </input>
                </div>
            </div>
            <div className="form-group row mb-2">
                <label htmlFor='vlistquantity' className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-8">
                <input 
                    type='text' 
                    name='vlistquantity' 
                    id='vlistquantity'
                    value={vlistquantity}
                    onChange={handleInputChange}
                    className="form-control">
                </input>
                </div>
            </div>
            <div className="form-group row mb-2">
                <label htmlFor='expiredDate' className="col-sm-2 col-form-label">Expired Date</label>
                <div className="col-sm-8">
                <input 
                    type='date' 
                    name='expiredDate' 
                    id='expiredDate'
                    value={expiredDate}
                    onChange={handleInputChange}
                    className="form-control">
                </input>
                </div>
            </div>
            <div className="form-group row mb-2">
                <label htmlFor='manufactureDate' className="col-sm-2 col-form-label">Manufacture Date</label>
                <div className="col-sm-8">
                <input 
                    type='date' 
                    name='manufactureDate' 
                    id='manufactureDate'
                    value={manufactureDate}
                    onChange={handleInputChange}
                    className="form-control">
                </input>
                </div>
            </div>
            <button className='btn vbtn mx-sm-2'>Save</button>
            <Link to={'/vst'} className='btn vbtn'>Cancel</Link>

        </form>
      
    </div>
    </div>
    </div>
  )
}

export default AddVaccineList
