import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material'; 
import './project.css';
import { Fade } from "react-awesome-reveal";
import { Text } from "../atoms/Text";
import { Image } from "../atoms/Image";
import GroupOfPlus from "../../assets/plusGroup.png";

type Package = {
  _id: string;
  name: string;
  price: number;
  totalDays: number;
  descriptionHeading: string;
  description: string;
  imageUrl: string;
};

const Packages = () => {
  const [images, setImages] = useState<Package[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageDetails, setImageDetails] = useState<Package | null>(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const imagesPerPage = 9;
  const url = 'https://backende.acmeflare.in'; 

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try { 
      const res = await axios.get<Package[]>(`${url}/api/images`);
      setImages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (image: Package) => {
    setSelectedImage(`${url}/${image.imageUrl}`);
    setImageDetails(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage('');
    setImageDetails(null);
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="bg-bg_light_primary" id="projects">
      <Image image={GroupOfPlus} alt="Vector" className="absolute top-20 right-4 lg:h-36 h-24" />
      <div className="md:container px-5 pt-14 min-h-screen flex flex-col justify-between">
        <div>
          <div className="w-full flex flex-col gap-3 items-center justify-center">
            <Text as="p" className="font-light text-base text-color3/80 tracking-widest">
              <Fade>Packages</Fade>
            </Text>
            <Text as="h2" className="md:text-4xl text-2xl font-medium capitalize text-color3">
              <Fade>Explore Our Packages</Fade>
            </Text>
          </div>
        </div>
        <div className="main-content">
          <ul className="img-gallery-container">
            {currentImages.length > 0 ? (
              currentImages.map((image, index) => (
                <li key={index} onClick={() => openModal(image)}>
                  <img src={`${url}/${image.imageUrl}`} alt="" className="img-gal" />
                  <div className="float-gallery-content">
                    <div className="content">
                      <span className="highlight uk-block">{image.name}</span>
                      <div className="sortDetails">
                        <span>{image.totalDays} days</span>
                        <span>₹{image.price}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p style={{ color: 'red' }}>Images not uploaded</p>
            )}
          </ul>
        </div>

        {isOpen && imageDetails && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={closeModal}>&times;</span>
              <img src={selectedImage} alt="Selected" />
              <div className="content">
                <span><strong>Name:</strong> {imageDetails.name}</span>
                <div className='sortDetails'>
                  <span><strong>Price:</strong> ₹{imageDetails.price}</span>
                  <span><strong>Days:</strong> {imageDetails.totalDays}</span>
                </div>
                <div><strong>Description</strong></div>
                <hr />
                <p><strong><u>{imageDetails.descriptionHeading}</u></strong></p>
                <p>{imageDetails.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Pagination
        count={Math.ceil(images.length / imagesPerPage)}
        page={currentPage}
        onChange={(_, page) => handlePageChange(page)}
        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
      />
    </section>
  );
};

export default Packages;
