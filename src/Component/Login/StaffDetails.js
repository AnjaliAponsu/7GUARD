import { useEffect, useState } from "react";
import React from "react";
import {Box, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField} from "@mui/material";
import AdministrativeNav from "../Nav/AdministrativeNav";
import { Link } from "react-router-dom";

const StaffDetails = () => {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStaff();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, rows]);
    
    const fetchStaff = () => {
        fetch('http://localhost:8080/api/v1/getAllStaff', {
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
            row.s_nic.toString().toLowerCase().includes(query)
        );
        setFilteredRows(filtered); // Update filteredRows based on search
    };
    

    return (
        <div className="parentDetails">
            <AdministrativeNav/>
            <div className="header">
                <h1>Staff Details</h1>
                <Link to={"/StaffRegister"} className="btn vbtn mb-2">Add Staff</Link>
            </div>
            
            <div className="search">
                <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2, padding: '1%' }}>
                    <TextField
                        label="Search by NIC"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: '20%' }}
                    />
                </Box>
            </div>

        <div className="table">
        <Table className='table table-bordered table-hover shadow container'>
            <TableHead>
                <TableRow className='text-center'>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Staff ID</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>First Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Last Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>NIC</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Mobile Number-Personal</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Mobile Number-Work</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Email-Personal</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Email-Work</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Department</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Job Title</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className='text-center'>
            {error ? (
                <TableRow>
                    <TableCell colSpan={12} align="center">{error}</TableCell>
                </TableRow>
            ) : (
                filteredRows.length > 0 ? filteredRows.map(row => (
                    <TableRow key={row.s_id || indexedDB}>
                        <TableCell>{row?.s_id}</TableCell>
                        <TableCell>{row?.s_fName}</TableCell>
                        <TableCell>{row?.s_lName}</TableCell>
                        <TableCell>{row?.s_nic}</TableCell>
                        <TableCell>{row?.s_mobileNumber}</TableCell>
                        <TableCell>{row?.s_workNumber}</TableCell>
                        <TableCell>{row?.s_personalEmail}</TableCell>
                        <TableCell>{row?.workEmail}</TableCell>
                        <TableCell>{row?.s_department}</TableCell>
                        <TableCell>{row?.s_jobTitle}</TableCell>
                        <TableCell>{row?.s_status}</TableCell>
                        <TableCell>
                        <Link to={`/UpdateStaff/${row.s_id}`} className="btn btn-primary">Edit</Link>
                        </TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={12} align="center">No Data</TableCell>
                    </TableRow>
                )
            )}
        </TableBody>
    </Table>
    </div>
    </div>
    );
}

export default StaffDetails;
