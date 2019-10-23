import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import tileData from './tileData';

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
      width: 1000,
      height: 700,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

// const tileData = [
//   {
//     img: image,
//     title: 'Image',
//     author: 'author',
//   },
// ];

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const classes = useStyles();

  let token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products`, {
        Authorization: `bearer ${token}`,
      })
      .then(function(response) {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Products</ListSubheader>
        </GridListTile>
        {products.map(product => (
          <GridListTile key={product.id}>
            <img
              src="http://localhost:4000/upload/2019-10-23T13:48:02.625Zimg_lights.jpg"
              alt={product.title}
            />
            <GridListTileBar
              title={product.title}
              subtitle={
              <div>
                <span style={{display: 'block'}}>Price: {product.price}</span>
              <span>Category: {product.category.type}</span>
              </div>}
              actionIcon={
                <IconButton aria-label={`info about ${product.title}`} className={classes.icon}>
                  <EditIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
