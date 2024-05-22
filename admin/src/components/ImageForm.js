// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import axios from 'axios';


// const url = 'http://localhost:5000' ; 

// const ImageForm = ({ fetchImages }) => {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: '', size: '', year: '', imageFile: null, imageType: '' });

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setFormData({ name: '', size: '', year: '', imageFile: null, imageType: '' });
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'imageFile') {
//       setFormData({ ...formData, imageFile: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     const { name, size, year, imageFile, imageType } = formData;
//     if (!name || !size || !year || !imageFile || !imageType) {
//       alert('Please fill out all fields and select an image.');
//       return;
//     }

//     const data = new FormData();
//     data.append('name', name);
//     data.append('size', size);
//     data.append('year', year);
//     data.append('imageType', imageType);
//     data.append('image', imageFile);

//     try {
//       // console.log('samad:-',data);
//       await axios.post(`${url}/api/upload`, data, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       fetchImages();
//       handleClose();
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Upload Image
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Upload Image</DialogTitle>
//         <DialogContent>
//           <TextField name="name" label="Name" fullWidth margin="normal" onChange={handleChange} />
//           <TextField name="size" label="Size" fullWidth margin="normal" onChange={handleChange} />
//           <TextField name="year" label="Year" fullWidth margin="normal" onChange={handleChange} />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Image Type</InputLabel>
//             <Select name="imageType" value={formData.imageType} onChange={handleChange}>
//               <MenuItem value={1}>Hornbill</MenuItem>
//               <MenuItem value={2}>Nature Series</MenuItem>
//             </Select>
//           </FormControl>
//           <input type="file" name="imageFile" onChange={handleChange} style={{ marginTop: '16px' }} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">Cancel</Button>
//           <Button onClick={handleSubmit} color="primary">Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ImageForm;





import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

const url = 'http://localhost:5000';

const ImageForm = ({ fetchImages }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    totalDays: '',
    descriptionHeading: '',
    description: '',
    imageFile: null,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: '',
      price: '',
      totalDays: '',
      descriptionHeading: '',
      description: '',
      imageFile: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const { name, price, totalDays, descriptionHeading, description, imageFile } = formData;
    if (!name || !price || !totalDays || !descriptionHeading || !description || !imageFile) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('price', price);
    data.append('totalDays', totalDays);
    data.append('descriptionHeading', descriptionHeading);
    data.append('description', description);
    data.append('image', imageFile);

    try {
      await axios.post(`${url}/api/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchImages();
      handleClose();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Upload Image
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Name" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="price" label="Price" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="totalDays" label="Total Days" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="descriptionHeading" label="Description Heading" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="description" label="Description" fullWidth margin="normal" multiline rows={4} onChange={handleChange} />
          <input type="file" name="imageFile" onChange={handleChange} style={{ marginTop: '16px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageForm;
