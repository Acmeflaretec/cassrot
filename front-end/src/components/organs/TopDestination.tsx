import { useRef, useState, useEffect } from "react";
import { Text } from "../atoms/Text";
import Slider from "react-slick";
import { Card } from "../molecules/Card";
import { Button } from "../atoms/Button";
import {CaretLeft, CaretRight } from "@phosphor-icons/react";
import axios from "axios";

const url = 'https://backende.acmeflare.in';

type Package = {
  _id: string;
  name: string;
  price: number;
  totalDays: number;
  descriptionHeading: string;
  description: string;
  imageUrl: string;
};

const TopDestination = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get<Package[]>(`${url}/api/images`);
        setPackages(response.data.slice(-6).reverse()); // Get the latest 6 packages
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  // Function for next button
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Function for previous button
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6 my-20">
      <Text as="p" className="font-light text-base text-color3/80 tracking-widest">
        Top Destination Packages
      </Text>
      <Text as="h2" className="md:text-4xl text-2xl font-medium capitalize text-color3">
        Explore Our Latest Packages
      </Text>

      {/* Controllers  */}
      <div className="mt-12 w-full flex justify-end gap-5 items-center md:px-6 px-3">
        <Button onClick={previous} className="cursor-pointer outline-none border-none bg-color2/30 text-color3 hover:bg-color2 p-2 rounded-full" type="button">
          <CaretLeft size={18} color="currentColor" weight="fill" />
        </Button>
        <Button onClick={next} className="cursor-pointer outline-none border-none bg-color2/30 text-color3 hover:bg-color2 p-2 rounded-full" type="button">
          <CaretRight size={18} color="currentColor" weight="fill" />
        </Button>
      </div>

      {/* Slides  */}
      <div className="w-full h-auto mt-4">
        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
          {packages.map((pkg) => (
            <div key={pkg._id} className="md:px-6 px-3">
              <Card
                cardClass="overflow-hidden shadow-md rounded-lg cursor-pointer group"
                imageAlt={pkg.name}
                imageSrc={`${url}/${pkg.imageUrl}`}
                imageWrapperClass="w-full h-[250px] overflow-hidden"
                cover="group-hover:scale-125 transition duration-500 ease"
                textWrapperClass="flex flex-col gap-4 w-full px-5 py-5"
              >
                <div className="flex justify-between items-center">
                  <Text as="h4" className="text-base font-medium text-color3">
                    {pkg.name}
                  </Text>
                  <Text as="small" className=" text-color3 font-light text-sm">
                  ₹{pkg.price}
                  </Text>
                </div>
                <div className="w-full flex gap-4 items-center text-color3">
                  {/* <AirplaneTilt size={20} color="currentColor" weight="fill" /> */}
                  <Text as="p" className=" text-color3 font-light text-base">
                    {pkg.totalDays} days
                  </Text>
                </div>
                
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TopDestination;
