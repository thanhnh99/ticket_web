import * as React from 'react';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from '../../../common/components/elements';
import LoadingButton from '../../../common/components/LoadingButton';
import Card from '../components/Card';
import { slideSettings } from '../common/Slider/setting';
import { some } from '../../../../constants';
import axios from 'axios';
import { API_PATHS } from "../../../../configs/API";

interface Props { }

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'https://picsum.photos/1592/266',
  },
  {
    label: 'Bird',
    imgPath: 'https://picsum.photos/1591/266',
  },
  {
    label: 'Bali, Indonesia',
    imgPath: 'https://picsum.photos/1591/265',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath: 'https://picsum.photos/1593/266',
  },
  {
    label: 'Goč, Serbia',
    imgPath: 'https://picsum.photos/1591/268',
  },
];


const convertToDateTime = (unixtimestamp: any) => {

  // Convert timestamp to milliseconds
  var date = new Date(unixtimestamp * 1000);

  // Year
  var year = date.getFullYear();

  // Month
  var month = date.getMonth();

  // Day
  var day = date.getDate();

  // Hours
  var hours = date.getHours();

  // Minutes
  var minutes = "0" + date.getMinutes();

  // Seconds
  var seconds = "0" + date.getSeconds();

  // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return convdataTime;

}


const Home: React.FunctionComponent<Props> = () => {
  const [listTicket, setListTicket] = React.useState<some[]>([]);

  const getEvent = async () => {
    let response = await axios.get(API_PATHS.getEvent);
    setListTicket(
      response.data.data.map(element => {
        return (
          {
            id: element.id,
            img: element.coverImageUrl,
            title: element.name,
            time: convertToDateTime(element.startTime),
            description: element.description,
            mapImageUrl: element.mapImageUrl,
            endTi: element.endTi,
            startSellingTime: element.startSellingTime,
            endSellingTime: element.endSellingTime,
            isPopular: element.isPopular,
            isBroadcasting: element.isBroadcasting,
            categoryId: element.categoryId
          }
        )
      })
    )
  }

  React.useEffect(() => {
    getEvent();
  }, [])

  return (
    <Col>
      <div style={{ marginLeft: 36, marginRight: 36 }}>
        <Slider  {...slideSettings()}>
          {
            tutorialSteps.map((item: some, index: number) => (
              <div key={index}>
                <img src={item.imgPath} style={{ height: 250 }} alt={item.lable} />
              </div>
            ))
          }
        </Slider>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Card listTicket={listTicket} />
      </div>
      <Row style={{ marginTop: '16px', justifyContent: 'center' }}>
        <LoadingButton
          style={{ minWidth: 160, marginRight: 32 }}
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          disableElevation
        >
          <FormattedMessage id="more" />
        </LoadingButton>
      </Row>
    </Col>
  );
};

export default Home;
