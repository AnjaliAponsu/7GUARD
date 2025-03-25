import { useEffect, useState } from "react";
import React from "react";
import {Box, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField} from "@mui/material";
import NurseNavBar from "../Nav/NurseNavBar";
import { Link } from "react-router-dom";

const ParentDetails = () => {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchParents();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, rows]);
    
    const fetchParents = () => {
        fetch('http://localhost:8080/api/v1/getParents', {
            method: 'GET',
            credentials: 'include',
            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setRows(data); // Update the rows state with fetched data
            setFilteredRows(data); // Initialize filteredRows with fetched data
        })
        .catch(error => {
            setError('Failed to fetch data'); // Set an error message if the fetch fails
            console.error('Fetch error:', error);
        });
    };

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = rows.filter(row => 
            row.parentNic.toString().toLowerCase().includes(query)
        );
        setFilteredRows(filtered); // Update filteredRows based on search
    };
    

    return (
        <div className="parentDetails">
            <NurseNavBar/>
            <div className="header">
                <h1>Parent Details</h1>
                <Link to={"/ParentRegister"} className="btn vbtn mb-2">Add Parent</Link>
            </div>
            
            <div className="search">
                <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2, padding: '1%' }}>
                    <TextField
                        label="Search by NIC"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: '20%'}}
                    />
                </Box>
            </div>

        <div className="table">
        <table className='table table-bordered table-hover shadow container'>
            <TableHead>
                <TableRow className='text-center'>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>P ID</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>First Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Last Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>NIC</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Gender</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>DOB</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Mobile Number</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Email</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Address</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className='text-center'>
            {error ? (
                <TableRow>
                    <TableCell colSpan={12} align="center">{error}</TableCell>
                </TableRow>
            ) : (
                filteredRows.length > 0 ? filteredRows.map(row => (
                    <TableRow key={row.parent_id || indexedDB}>
                        <TableCell>{row?.parent_id}</TableCell>
                        <TableCell>{row?.p_fName}</TableCell>
                        <TableCell>{row?.p_lName}</TableCell>
                        <TableCell>{row?.parentNic}</TableCell>
                        <TableCell>{row?.p_gender}</TableCell>
                        <TableCell>{row?.p_dob}</TableCell>
                        <TableCell>{row?.p_mobileNumber}</TableCell>
                        <TableCell>{row?.p_email}</TableCell>
                        <TableCell>{row?.p_address}</TableCell>
                        <TableCell>
                            <Link to={`/UpdateParent/${row.parentNic}`} className="btn btn-primary" >Edit</Link>
                        </TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={12} align="center">No Data</TableCell>
                    </TableRow>
                )
            )}
        </TableBody>
    </table>
    </div>
    </div>
    );
}

export default ParentDetails;
