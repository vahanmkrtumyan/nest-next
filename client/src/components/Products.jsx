import React, { useState } from 'react';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import AddProduct from './AddProduct';
import ProductList from './ProductList';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
}));

const Products = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      <Container fixed>
        <div style={{ textAlign: 'right' }}>
          <AddProduct open={open} setOpen={setOpen} />
          <ProductList/>
          {/* <Fab color="secondary" aria-label="edit" className={classes.fab}>
            <EditIcon />
          </Fab>
          <Fab aria-label="delete" className={classes.fab}>
            <DeleteIcon />
          </Fab> */}
        </div>
      </Container>
    </>
  );
};

export default Products;
