import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import useStyles from './ProductInputStyles';
import axios from 'axios';

export default function AddProduct(props) {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:4000/categories`,
      //data: { username: user, password: pass },
      crossDomain: true,
    })
      .then(function(response) {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const handleOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add a product</h2>

            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Category</InputLabel>
                <Select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  // inputProps={{
                  //   name: 'age',
                  //   id: 'age-simple',
                  // }}
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.type}>{category.type}</MenuItem>
                  ))}
                  {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="price"
                id="price"
                // value={password}
                //  onChange={e => setPassWord(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // value={password}
                //  onChange={e => setPassWord(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                //  onClick={handleSubmit}
              >
                Add a product
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
