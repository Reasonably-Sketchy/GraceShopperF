import { Button } from '@material-ui/core';
import React from 'react';

const AdminModal = ({ action, data, modalCloseFunction }) => {
    return (
        <div className="editor-background">
        <div className="admin-modal">
            <h1>{action}:</h1>
            <h1 className="gold-text">{data}</h1>
            <Button
                color="primary"
                variant="contained"
                onClick={modalCloseFunction}>OK</Button>
        </div>
        </div>
    );
};

export default AdminModal;