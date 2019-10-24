import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import AddProduct from './AddProduct';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import GridList from '@material-ui/core/GridList';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1200,
      height: 700,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    fab: {
      margin: theme.spacing(1),
    },
    card: {
      maxWidth: 300,
      marginRight: 10,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);

const Products = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios
      .get(`http://localhost:4000/products`, {
        Authorization: `bearer ${token}`,
      })
      .then(function(response) {
        setProducts(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  let handleDelete = id => {
    let token = localStorage.getItem('token');
    let newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);
    axios
      .delete(`http://localhost:4000/products/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  let handleSelected = product => {
    setSelected(product);
    setOpen(!open);
  };

  let handleAdd = product => {
    let data = product.data;
    let newProducts = [...products];
    newProducts.push(data);
    setProducts(newProducts);
  };

  let handleEdit = product => {
    let newProducts = [...products];
    let id = product.id;
    let index = newProducts.findIndex(item => item.id === id);
    newProducts.splice(index, 1, product);
    setProducts(newProducts);
  };

  let filtered =
    products.filter(function(product) {
      return (
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.price.toString().includes(search.toLowerCase())
      );
    }) || [];

  return (
    <>
      <Navbar />
      <Container fixed>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <AddProduct
              open={open}
              setOpen={setOpen}
              selected={selected}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleSelected={handleSelected}
              style={{ marginBottom: '0px' }}
            />
          </div>

          <GridList cellHeight={330} className={classes.gridList}>
            {filtered.map(product => (
              <Card key={product.id} className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={`http://localhost:4000/upload/${product.file}`}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.title}
                    </Typography>
                    <Typography component="h3">{product.price} USD</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <EditIcon
                    color="primary"
                    aria-label="edit"
                    cursor="pointer"
                    className={classes.fab}
                    onClick={() => handleSelected(product)}
                  />
                  <DeleteIcon
                    color="secondary"
                    aria-label="delete"
                    cursor="pointer"
                    className={classes.fab}
                    onClick={() => handleDelete(product.id)}
                  />
                </CardActions>
              </Card>
            ))}
          </GridList>
        </div>
      </Container>
    </>
  );
};

export default Products;
