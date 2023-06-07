import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { GrClose } from 'react-icons/gr'
import { data } from './data'
import Delete from './Delete';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function Editmodal(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const [item, setItem] = useState('');

    const edithandler = () => {
        props.editdata(item)
    };

 
    const options = (nodes) => {
        let menuitem = [];
        menuitem.push(
            <MenuItem key={nodes.id} value={nodes.name}>{nodes.name}</MenuItem>
        );

        if (nodes.children) {
            nodes.children.forEach((node) => {
                menuitem.push(...options(node))
            });
        }
        return menuitem;
    }

    useEffect(() => {
        setItem(props.name)
    }, [props])

    return (
        <div>
            <Modal
                keepMounted
                open={props.open}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <GrClose onClick={props.close} style={{ cursor: 'pointer', marginLeft: '380px', paddingBottom: '20px' }} />
                    </div>
                    <TextField id="additem" label="Item" variant="outlined" name='additem' fullWidth onChange={(e) => setItem(e.target.value)} value={item} />

                    <Stack direction="row" sx={{ mt: 4 }} spacing={2}>
                        <Button variant="contained" type='button' onClick={edithandler}>Add</Button>
                        <Button variant="contained" type='button' style={{ background: 'red' }} onClick={handleClickOpen}>Delete</Button>
                    </Stack>
                </Box>
            </Modal>
            <Delete close={handleClose} open={open}/>
        </div>
    )
}
