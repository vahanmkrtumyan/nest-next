// import React, { useState, useEffect, useRef } from 'react';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
// import AddIcon from '@material-ui/icons/Add';
// import Fab from '@material-ui/core/Fab';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import useStyles from './ProductInputStyles';
// import axios from 'axios';

// export default function AddProduct(props: any) {
//   const classes = useStyles('');
//   const [id, setId] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState('');
//   const [file, setFile] = useState();

//   const inputRef = useRef(null);

//   useEffect(() => {
//     axios({
//       method: 'get',
//       url: `http://localhost:4000/categories`,
//       //crossDomain: true,
//     })
//       .then(function(response) {
//         setCategories(response.data);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     setTitle(props.selected.title);
//     setCategory(props.selected.category ? props.selected.category._id : '');
//     setPrice(props.selected.price);
//     setDescription(props.selected.description);
//     setId(props.selected.id);
//     setFile(props.selected.file);
//   }, [props.selected.id]);

//   interface Category {
//     id: string,
//     type: string,
//     category: string
//   }

//   let handleSubmit = (e: any) => {
//     e.preventDefault();
//     let token = localStorage.getItem('token');

//     if (props.selected.id) {
//       let newProduct = {
//         title,
//         description,
//         price,
//         category,
//       };

//       axios
//         .patch(`http://localhost:4000/products/${id}`, newProduct, {
//           headers: {
//             Authorization: `bearer ${token}`,
//           },
//         })
//         .then(function(response) {
//           console.log(response.data);
//           let newProduct = {
//             id,
//             file,
//             title,
//             description,
//             price,
//             category,
//           };
//           props.handleEdit(newProduct);
//           handleClose();
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
//     } else {
//       let handleAd = (p : any) => {
//         props.handleAdd(p);
//       };

//       const fd = new FormData();
//       fd.append('image', file);
//       fd.append('title', title);
//       fd.append('description', description);
//       fd.append('price', price);
//       fd.append('category', category);

//       axios
//         .post(`http://localhost:4000/products`, fd, {
//           headers: {
//             Authorization: `bearer ${token}`,
//           },
//           onUploadProgress: ProgressEvent => {
//             console.log(
//               'Upload Progress:' +
//                 Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
//                 '%',
//             );
//           },
//         })
//         .then(function(response) {
//           handleAd(response);
//           handleClose();
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
//     }
//   };

//   const handleOpen = () => {
//     props.setOpen(true);
//   };

//   const handleClose = () => {
//     props.setOpen(false);
//     props.handleSelected({});
//   };

//   let disabled = false;
//   if (!title || !description || !price || !category || !file) disabled = true;

//   return (
//     <div>
//       <Fab
//         color="primary"
//         aria-label="add"
//         className={classes.fab}
//         onClick={handleOpen}
//       >
//         <AddIcon />
//       </Fab>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={props.open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={props.open}>
//           <div className={classes.paper}>
//             <h2 id="transition-modal-title">Add a product</h2>

//             <form className={classes.form}>
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="title"
//                 label="Title"
//                 name="title"
//                 autoComplete="title"
//                 autoFocus
//                 value={title}
//                 onChange={e => setTitle(e.target.value)}
//               />
//               <FormControl className={classes.formControl}>
//                 <InputLabel htmlFor="age-simple">Category</InputLabel>
//                 <Select
//                   value={category}
//                   onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//                     setCategory(e.target.value)
//                   }
//                 >
//                   {categories.map((category: Category) => (
//                     <MenuItem key={category.id} value={category.id}>
//                       {category.type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="price"
//                 label="Price"
//                 id="price"
//                 value={price}
//                 type="number"
//                 onChange={e => setPrice(e.target.value)}
//               />
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="description"
//                 label="Description"
//                 type="description"
//                 id="description"
//                 autoComplete="current-description"
//                 value={description}
//                 onChange={e => setDescription(e.target.value)}
//               />
//               {!props.selected.id ? (
//                 <>
//                   <p>upload a photo</p>
//                   <input
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                       setFile(e.target.files[0]);
//                     }}
//                     type="file"
//                     name="pic"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     ref={inputRef}
//                   />
//                   <Button
//                     variant="contained"
//                     color="default"
//                     className={classes.button}
//                     onClick={() => inputRef.current.click()}
//                   >
//                     <CloudUploadIcon />
//                   </Button>
//                 </>
//               ) : null}

//               <Button
//                 disabled={disabled}
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//               >
//                 {props.selected.id ? 'Edit a product' : 'Add a product'}
//               </Button>
//             </form>
//           </div>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }
