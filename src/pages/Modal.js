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
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormHelperText from '@mui/material/FormHelperText';
import { data } from '../data'; 

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

export default function CustomModal(props) {


    const [open, setOpen] = useState(false);
    const [alldata, setAlldata] = useState(data)


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const options = (nodes) => {
        let menuitem = [];
        menuitem.push(
            <MenuItem key={nodes.id} value={nodes.name}>{nodes.name}</MenuItem>
        );

        if (nodes.children) {
            nodes.children.forEach((node) => {
                menuitem.push(options(node))
            });
        }
        return menuitem;
    }

    useEffect(() => {
        setAlldata(alldata)
    }, [alldata])

    const initialValues = {
        item: '',
        selectitem: ''
    }

    const validationSchema = yup.object().shape({
        item: yup.string().required('Please enter item name'),
        selectitem: yup.string().required('Please Select a item'),
    })

    const { values, errors, touched , handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (value) => {
               props.save(value)
            setOpen(false)
            value.item='';
            value.selectitem='';
        }
    });


    return (
        <div>
            <div style={{ marginLeft: '25px' }}>
                <Button onClick={handleOpen} color="success" variant="contained">Add</Button>
            </div>
            <Modal
                keepMounted
                open={open}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >

                <Box sx={style}>
                    <div>
                        <GrClose onClick={handleClose} style={{ cursor: 'pointer', marginLeft: '380px', paddingBottom: '20px' }} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField id="item" value={values.item} label="Item" variant="outlined" name='item' onChange={handleChange} error={errors.item && touched.item ? errors.item : null} helperText={errors.item && touched.item ? errors.item : null} />
                        
                        <FormControl sx={{ width: 150, ml: 3 }}>
                            <InputLabel id="demo-simple-select-label">Select Item</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="selectitem"
                                value={values.selectitem}
                                label="Select Item"
                                name='selectitem'
                                onChange={handleChange}
                                error={errors.selectitem && touched.selectitem ? errors.selectitem : null}
                                
                            >

                                {options(alldata)}

                            </Select>
                            <FormHelperText style={{color:'red'}}>{errors.selectitem && touched.selectitem ? errors.selectitem : null}</FormHelperText>

                        </FormControl>
                        <Stack direction="row" sx={{ mt: 4 }} spacing={2}>
                            <Button variant="contained" type='submit'>Add</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
