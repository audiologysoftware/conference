// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Typography, Box, AppBar, Toolbar, CircularProgress } from '@mui/material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from "@mui/material";
import { listAllUsers, listAllManuscripts, sendReviewerEmail, updateStatus } from '../api/management';
import { useNavigate } from 'react-router-dom';
import { logInfo } from '../utils/logger';
import { getAllQueries } from '../api/queries';


const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState('users'); // users or manuscripts
    const [openDialog, setOpenDialog] = useState(false);
    const [openScore, setOpenScore] = useState(false);
    const [selectedManuscript, setSelectedManuscript] = useState(null);
    const [reviewerEmail, setReviewerEmail] = useState('');
    const [scoreData, setScoreData] = useState({});

    const navigate = useNavigate();

    // Fetch data based on active view
    useEffect(() => {
        if (activeView === 'users') {
            fetchUsers();
        } else if (activeView === 'manuscripts') {
            fetchManuscripts();
        }
        else
            fetchQueries();
    }, [activeView]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await listAllUsers();
            setData(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchManuscripts = async () => {
        setLoading(true);
        try {
            const response = await listAllManuscripts();

            // Process response to add `content_type`
            const processedResponse = response.map((item) => {
                // Check if `value` contains a Data URI and extract content type
                let contentType = 'application/octet-stream'; // Default content type
                if (item.abstract && item.abstract.startsWith('data:')) {
                    const match = item.abstract.match(/data:(.*?);base64/);
                    if (match) {
                        contentType = match[1];
                    }
                }

                // Return the updated item with the `content_type` key                
                return {
                    ...item,
                    content_type: contentType,
                    extension: contentType.split('/')[1]
                };
            });

            console.log(processedResponse)

            // Set the processed data
            setData(processedResponse);
        } catch (error) {
            console.error('Error fetching manuscripts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchQueries = async () => {
        try {
            const response = await getAllQueries();
            logInfo(JSON.stringify(response.queries))
            const queries = response.queries;
            setData(queries)
        } catch (err) {
            logInfo(`Errror ${err}`)
        }
    }


    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            activeView === 'users' ? fetchUsers() : (activeView === "manuscripts" ? fetchManuscripts() : fetchQueries())
        } else {
            const filteredData = data.filter(item =>
                activeView === 'users' ? item.phone.includes(searchTerm.trim()) : activeView === 'manuscripts' ? item.email_id.includes(searchTerm.trim()) : item.email.includes(searchTerm.trim())
            );
            setData(filteredData);
        }
    };

    const handleSubmit = async () => {
        if (!reviewerEmail) {
            alert('Please enter an email address');
            return;
        }

        const { id } = selectedManuscript;
        const emailType = 'email_reviewer'; // You can modify this as needed

        try {
            setLoading(true);
            // Call the API to send the data
            const response = await sendReviewerEmail({ manuscript_id: id, email: reviewerEmail, email_type: emailType });
            fetchManuscripts()
            alert(response.detail.message)
            setOpenDialog(false); // Close the dialog after submission
            setLoading(false);
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email');
        }
    };

    const handleDownload = (fileData, fileName) => {
        console.log(fileData)
        if (!fileData) {
            console.error('No file data available.');
            return;
        }

        // Extract contentType and Base64 content if the fileData is a Data URI
        let contentType = 'application/octet-stream'; // Default content type
        let base64Content = fileData;

        if (fileData.startsWith('data:')) {
            const [prefix, base64Part] = fileData.split(',');
            const match = prefix.match(/data:(.*?);base64/);
            if (match) {
                contentType = match[1]; // Extract the content type from the Data URI
            }
            base64Content = base64Part; // Extract only the Base64 content
        }

        try {
            // Decode Base64 to binary
            const binaryData = atob(base64Content);

            // Convert binary data to a Blob
            const byteCharacters = binaryData.split('').map(c => c.charCodeAt(0));
            const byteArray = new Uint8Array(byteCharacters);
            const blob = new Blob([byteArray], { type: contentType });

            // Create a URL for the Blob and trigger the download
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error decoding Base64 or creating Blob:', error);
        }
    };


    const userColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fullname', headerName: 'Full Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'bank_type', headerName: 'Bank Type', width: 150 },
        { field: 'transaction_id', headerName: 'Transaction ID', width: 200 },
        {
            field: 'transaction_screenshot',
            headerName: 'Screenshot',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                        handleDownload(
                            params.value, // fileData
                            `screenshot_${params.row.id}.${params.row.extension}`, // fileName with extension
                            params.row.content_type // contentType
                        )
                    }
                >
                    Download
                </Button>
            ),
        },
    ];

    const handleReviewerButtonClick = (manuscript) => {
        setSelectedManuscript(manuscript);
        setReviewerEmail(''); // Clear previous email input
        setOpenDialog(true); // Open the dialog
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleScoreDialog = () => {
        setOpenScore(false)
    }

    // Handle Accept button
    const handleAccept = async (manuscriptId) => {
        try {
            const confirmed = window.confirm(`Are you sure you want to accept manuscript ID ${manuscriptId}?`);
            if (confirmed) {
                const response = await updateStatus(manuscriptId, 'Accepted');
                fetchManuscripts()
                alert(response.detail.message)
            }
        } catch (error) {
            alert(error)
        }

    };

    // Handle Reject button
    const handleReject = async (manuscriptId) => {
        try {
            const confirmed = window.confirm(`Are you sure you want to reject manuscript ID ${manuscriptId}?`);
            if (confirmed) {
                const response = await updateStatus(manuscriptId, 'Rejected');
                fetchManuscripts();
                alert(response.detail.message)
            }
        } catch (err) {
            alert(err)
        }
    };

    const updateManuscriptStatus = (id, status) => {
        alert(`Manuscript ID ${id} has been ${status}.`)
    }

    const handleViewScore = async (scoreList) => {
        // fetch the score, call getScore Api from managementAPi
        try {
            if (scoreList == null) {
                alert("No score found")
            }
            else {
                setScoreData(pv => scoreList)
                setOpenScore(true)
            }
        } catch (error) {
            alert("Error, cannot display Score")
        }
    }

    const manuscriptColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'author_names', headerName: 'Authors', width: 250 },
        { field: 'email_id', headerName: 'Email', width: 250 },

        {
            field: 'abstract',
            headerName: 'Abstract',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                        handleDownload(
                            params.value, // fileData
                            `screenshot_${params.row.id}.${params.row.extension}`, // fileName with extension
                            params.row.content_type // contentType
                        )
                    }
                >
                    Download
                </Button>
            ),
        },
        {
            field: 'reviewer',
            headerName: 'Reviewer',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleReviewerButtonClick(params.row)}
                >
                    {params.row.reviewer == null ? "Send Email" : "Resend Email"}
                </Button>
            ),
        },
        {
            field: 'score',
            headerName: 'Score',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewScore(params.row.score)}
                >
                    View
                </Button>
            ),

        },
        {
            field: 'status',
            headerName: 'Status',
            width: 250,
            renderCell: (params) => (
                <>
                    {
                        params.row.status == "Reviewed" ?
                            <>
                                <Button variant="contained" color="success" size="small" onClick={() => handleAccept(params.row.id)}> Accept</Button>
                                <Button variant="contained" color="error" size="small" onClick={() => handleReject(params.row.id)} style={{ marginLeft: '10px' }}>Reject</Button>
                            </> :
                            <Typography variant="body1" color="textSecondary">{params.row.status}</Typography>
                    }
                </>
            ),
        },
    ];

    const queryColumns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 100 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "subject", headerName: "Subject", width: 250 },
        { field: "message", headerName: "Message", width: 250 },

    ];

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" style={{ marginBottom: '2rem' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Vishrutha 2 Dashboard
                    </Typography>
                    <Button color="inherit" onClick={() => setActiveView('users')}>
                        Delegates
                    </Button>
                    <Button color="inherit" onClick={() => setActiveView('manuscripts')}>
                        Manuscripts
                    </Button>
                    <Button color="inherit" onClick={() => setActiveView('query')}>
                        Query
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/login")}>
                        signout
                    </Button>
                </Toolbar>
            </AppBar>

            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="1rem" paddingX="2rem">
                <Typography variant="h5">
                    {activeView === "users" ? "Registered Users" : activeView === "manuscripts" ? "Manuscripts" : "Queries"}
                </Typography>
                <Box display="flex" gap="1rem">
                    <TextField
                        label={activeView === 'users' ? 'Search by Phone' : 'Search by Email'}
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Box>
            </Box>

            <Box flexGrow={1} paddingX="2rem">
                <DataGrid
                    rows={data}
                    columns={activeView === "users" ? userColumns : activeView === "manuscripts" ? manuscriptColumns : queryColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    autoHeight={false}
                    loading={loading}
                    disableSelectionOnClick
                />
            </Box>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Send email to reviewer</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Title: {selectedManuscript?.title}</Typography>
                    <Typography variant="body1">Authors: {selectedManuscript?.author_names}</Typography>
                    <TextField
                        label="Reviewer Email"
                        variant="outlined"
                        fullWidth
                        value={reviewerEmail}
                        onChange={(e) => setReviewerEmail(e.target.value)}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={loading}  // Disable button while loading
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
                    </Button>                   
                </DialogActions>
            </Dialog>
            <Dialog open={openScore} onClose={handleScoreDialog} fullWidth maxWidth="sm">
                <DialogTitle>Manuscript Score</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {Object.entries(scoreData).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell>{key}</TableCell>
                                        <TableCell align="right">{value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleScoreDialog} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminDashboard;
