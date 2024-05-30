import styled from 'styled-components';
import DetailsBar from '../organs/DetailsBar';
import InputSide from '../organs/InputSide';
import { Image } from "../atoms/Image";
import GroupOfPlus from "../../assets/plusGroup.png";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  background-color: whitesmoke;
  padding-bottom: 50px;
`;

const PageHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const FormContainer = styled.div`
  width: 65%;
  min-width: 600px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  height: auto;
  grid-gap: 10px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 90%;
    max-width: 500px;
    min-width: 0px;
    grid-gap: 0px;
  }
`;

const TextOne = styled.b`
  font-size: 30px;
  color: rgb(4, 4, 59);
  text-align: center;
`;

const TextTwo = styled.p`
  color: rgb(4, 4, 34);
  font-size: 15px;
  text-align: center;
`;

const ContactForm = () => {
  return (
    <PageWrapper>
      <Image image={GroupOfPlus} alt="Vector" className="absolute top-20 right-4 lg:h-36 h-24" />
      <PageHeadingWrapper className='mb-5'>
        <TextOne>Contact US</TextOne>
        <TextTwo >Any Question or remarks? Just write us a message</TextTwo>
      </PageHeadingWrapper>
      <FormContainer>
        <DetailsBar />
        <InputSide />
      </FormContainer>
    </PageWrapper>
  );
};

export default ContactForm;