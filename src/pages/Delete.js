import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Delete(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close}>Disagree</Button>
                    <Button autoFocus type='button' onClick={props.delete}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
