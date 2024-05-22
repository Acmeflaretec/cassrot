import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import './project.css';

const url = 'http://localhost:5000';
const ImageList = ({ images, deleteImage, editImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageDetails, setImageDetails] = useState({ name: '', price: '', totalDays: '', descriptionHeading: '', description: '' });

  const openModal = (imageSrc, name, price, totalDays, descriptionHeading, description) => {
    setSelectedImage(imageSrc);
    setImageDetails({ name, price, totalDays, descriptionHeading, description });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage('');
    setImageDetails({ name: '', price: '', totalDays: '', descriptionHeading: '', description: '' });
  };

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {images?.length > 0 ? (images.map((image, index) => (
        <Grid item xs={12} sm={6} md={4} key={image._id}>
          <Card>
            <CardMedia key={index} onClick={() => openModal(`${url}/${image.imageUrl}`, image.name, image.price, image.totalDays, image.descriptionHeading, image.description)} component="img" height="240" src={`${url}/${image.imageUrl}`} alt={image.name} />
            <CardContent>
              <Typography variant="h6"> <strong style={{display:'flex',justifyContent:'center'}}>{image.name}</strong></Typography>
              <div className='sortDetails'>
                <Typography variant="body2">Price: {image.price}</Typography>
                <Typography variant="body2">Days: {image.totalDays}</Typography>
              </div>
              <Button variant="contained" color="secondary" onClick={() => deleteImage(image._id)} sx={{mt:1 }}>Delete</Button>
              <Button variant="contained" color="primary" onClick={() => editImage(image)} sx={{ ml: 1,mt:1 }}>Edit</Button>
            </CardContent>
          </Card>
        </Grid>
      ))) : <p style={{ color: 'red' }}>images not uploaded</p>}

      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Selected" />

            <div className="content">
              <span><strong >Name:</strong>{imageDetails.name}</span>
              <div className='sortDetails'>
                <span><strong>Price:</strong>{imageDetails.price}</span>
                <span><strong>Days:</strong>{imageDetails.totalDays}</span>
              </div>
              <div><strong >Description </strong></div>
              <hr />
              <p> <strong> <u>{imageDetails.descriptionHeading}</u></strong></p>
              <p>{imageDetails.description}</p>
            </div>
          </div>
        </div>
      )}
    </Grid>
  );
};

export default ImageList;

