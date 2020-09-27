import * as React from 'react';
import Carousel from '../components/Carousel';
import Card from '../components/Card';

interface Props {}

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'https://picsum.photos/692/266',
  },
  {
    label: 'Bird',
    imgPath: 'https://picsum.photos/691/266',
  },
  {
    label: 'Bali, Indonesia',
    imgPath: 'https://picsum.photos/691/265',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath: 'https://picsum.photos/693/266',
  },
  {
    label: 'Goč, Serbia',
    imgPath: 'https://picsum.photos/691/268',
  },
];

const listTicket = [
  {
    id: 1,
    img: 'https://picsum.photos/250/120',
    title: 'Workshop vẽ tranh màu nước: Classy',
    time: '10/10/2020',
    category: 'Nightlife',
  },
  {
    id: 2,
    img: 'https://picsum.photos/251/120',
    title: 'Đêm nhạc FRANZ LISZT & ANTONIN DVOŘÁK',
    time: '03/10/2020',
    category: 'Art & Culture',
  },
  {
    id: 3,
    img: 'https://picsum.photos/250/121',
    title: 'Kịch IDECAF: MƯU BÀ TÚ',
    time: '03/10/2020',
    category: 'Theater & Plays',
  },
  {
    id: 4,
    img: 'https://picsum.photos/250/122',
    title: 'Workshop vẽ tranh màu nước: Classy',
    time: '02/10/2020',
    category: 'Courses',
  },
  {
    id: 5,
    img: 'https://picsum.photos/251/122',
    title: 'Workshop vẽ tranh màu nước: Classy',
    time: '02/10/2020',
    category: 'Courses',
  },
];

const Home: React.FunctionComponent<Props> = () => {
  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Carousel tutorialSteps={tutorialSteps} />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '10px',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <Card listTicket={listTicket} />
      </div>
    </>
  );
};

export default Home;
