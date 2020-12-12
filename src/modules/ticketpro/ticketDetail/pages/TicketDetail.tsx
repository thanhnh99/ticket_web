import { Button, Container, Tab, Tabs, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ReactComponent as IcLocation } from '../../../../svg/ic_pin.svg';
import { ReactComponent as CalendarSvg } from '../../../../svg/calendar.svg';
import { GREY, PRIMARY, RED, WHITE } from '../../../../configs/colors';
import DefaultHeader from '../../../../layout/defaultLayout/DefaultHeader';
import { some } from '../../../../constants';
import { ROUTES } from '../../../../configs/routes';
import { API_PATHS } from '../../../../configs/API';

interface Props {
  match: any,
  dispatch: Dispatch;
}

interface Data {
  id: string,
  name: string,
  description: string,
  coverImageUrl: string,
  mapImageUrl: string,
  startTime: number | undefined,
  endTime: string,
  startSellingTime: string,
  endSellingTime: string,
  isPopular: string,
  isBroadcasting: string,
  categoryId: string,
  fullAddress: string,
  ticketClassList: any[]
}

const OFFSET = 145;
const Line = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ticketData = {
  tickets: [
    {
      price: '8000000',
      type: 'Vé trẻ em',
    },
    {
      price: '8000000',
      type: 'Vé người lớn',
    },
  ],
  organizer: {
    avatar: 'https://picsum.photos/200/300',
    companyName: 'BIG PRIZE GROUP',
    detailInfo: [
      '- Công ty Cổ phần Big Prize, tầng 6 toà nhà An Huy, Số 184 đường Nguyễn Tuân, Thanh Xuân, Hà Nội.',
      '- Sở Văn Hoá và Thể Thao tỉnh Ninh Bình',
    ],
  },
  info:
    'Nằm trong bán kính chỉ 10 m từ Nhà thờ Lớn, Hanoi Vision Boutique Hotel cung cấp các phòng gắn máy điều hòa với Wifi miễn phí. Khách sạn chiếm vị trí tiện lợi trong Khu Phố Pháp, đồng thời chỉ cách Khu Phố Cổ 1 phút đi bộ và Hồ Hoàn Kiếm 60 m. Du khách có thể đi lên các tầng trên bằng thang máy. Bữa sáng kiểu lục địa được phục vụ hàng ngày tại nhà hàng của khách sạn. Tất cả các phòng nghỉ tại đây được trang bị máy điều hòa, TV màn hình phẳng, tủ lạnh mini, khu vực ghế ngồi, ấm đun nước và trà/cà phê cùng nước uống miễn phí. Các phòng tắm riêng đi kèm vòi sen, máy sấy tóc, dép đi trong phòng tắm và đồ vệ sinh cá nhân miễn phí. Hanoi Vision Boutique Hotel cách Nhà hát Thăng Long 200 m và chợ đêm cuối tuần địa phương 10 phút đi bộ. Cả Chợ Đồng Xuân, Nhà hát Lớn cũng như ga tàu Hà Nội đều cách khách sạn 1,5 km. Sân bay quốc tế Nội Bài cách đó 45 phút lái xe. Du khách có thể gửi hành lý miễn phí tại lễ tân 24 giờ. Khách sạn có quầy du lịch đồng thời cung cấp dịch vụ giặt là và thu đổi ngoại tệ. Xung quanh khách sạn có nhiều quán ăn khác, cung cấp thêm lựa chọn ăn uống cho khách. Quận Hoàn Kiếm là lựa chọn tuyệt vời cho du khách thích mua sắm, người dân thân thiện và ẩm thực đường phố. Đây là khu vực ở Hà Nội mà khách yêu thích, theo các đánh giá độc lập. Chỗ nghỉ này là một trong những vị trí được đánh giá tốt nhất ở Hà Nội! Khách thích nơi đây hơn so với những chỗ nghỉ khác trong khu vực.',
};
const CustomTabs = withStyles((theme) => ({
  root: {
    borderBottom: 'none',
  },
  indicator: {
    height: 4,
    color: '#000',
  },
}))(Tabs);

const CustomTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontWeight: 'normal',
    color: '#000',
  },
  selected: {
    color: '#000',
  },
}))(Tab);

const tabs = [
  { id: 'ticket.about', content: <></> },
  { id: 'ticket.info', content: <></> },
  { id: 'ticket.organizer', content: <></> },
];

const STICKY_HEIGHT = 90;

const StickyDiv = styled.div`
  position: sticky;
`;
function scrollTo(id: string, offsetTop: number) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({ top: el.offsetTop - offsetTop, behavior: 'smooth' });
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    square: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }),
);

const convertToDateTime = (unixtimestamp: any) => {

  const date = new Date(unixtimestamp * 1000);

  // Year
  const year = date.getFullYear();

  // Month
  const month = date.getMonth();

  // Day
  const day = date.getDate();

  // Hours
  const hours = date.getHours();

  // Minutes
  const minutes = `0${  date.getMinutes()}`;

  // Seconds
  const seconds = `0${  date.getSeconds()}`;

  // Display date time in MM-dd-yyyy h:m:s format
  const convdataTime = `${day  }/${  month  }/${  year  } ${  hours  }:${  minutes.substr(-2)  }:${  seconds.substr(-2)}`;
  return convdataTime;

}

const TicketDetail: React.FunctionComponent<Props> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const eventId = props.match.params.id;
  const [currentTabIndex, setIndex] = React.useState(0);
  const [, setShowSticky] = React.useState(false);
  const [eventData, setEventData] = React.useState<Data>(
    {
      id: "",
      name: "",
      description: "",
      coverImageUrl: "",
      mapImageUrl: "",
      startTime: undefined,
      endTime: "",
      startSellingTime: "",
      endSellingTime: "",
      isPopular: "",
      isBroadcasting: "",
      categoryId: "",
      fullAddress: "",
      ticketClassList: [{}]
    }
  );
  const rootDiv = React.useRef<HTMLDivElement>(null);
  const classes = useStyles();

  const getEventInfo = async () => {
    const json = Axios.get(`${API_PATHS.getEvent  }/${  eventId}`)
      .then(response => {
        setEventData(response.data.data)
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  }

  React.useEffect(() => {
    getEventInfo();
    const handler = () => {
      if (rootDiv.current) {
        if (rootDiv.current.getBoundingClientRect().top < STICKY_HEIGHT) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
      }
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DefaultHeader />
      <div>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Container>
              <div style={{ marginTop: 16 }}>
                <img
                  style={{ height: 300, width: 1200 }}
                  src={eventData?.coverImageUrl}
                  alt="banner"
                />
              </div>
            </Container>
            <Container style={{ marginTop: 56, marginBottom: 72 }}>
              <Line>
                <div>
                  <Line>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                      {eventData?.name}
                    </Typography>
                  </Line>
                  <Line style={{ paddingLeft: 8 }}>
                    <CalendarSvg />
                    &nbsp;
                    <Typography style={{ flex: 1, paddingLeft: 8 }} variant="subtitle2">
                      {convertToDateTime(eventData?.startTime)} - {convertToDateTime(eventData?.endTime)}
                    </Typography>
                  </Line>
                  <Line style={{ minHeight: '24px' }}>
                    <IcLocation />
                    &nbsp;
                    <Typography variant="subtitle2" style={{ color: GREY }}>
                      {eventData?.fullAddress}
                    </Typography>
                  </Line>
                </div>
                <div>
                  <Box component="span" m={1}>
                    <Link to={`${ROUTES.booking.chooseTicket  }/${  eventId}`}>
                      <Button
                        variant="contained"
                        style={{
                          color: WHITE,
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          backgroundColor: RED,
                          width: '260px',
                          height: 50,
                          textAlign: 'center',
                          marginTop: 10,
                        }}

                      >
                        Mua vé ngay
                    </Button>
                    </Link>
                  </Box>
                </div>
              </Line>
            </Container>
            <div>
              <Container>
                <div ref={rootDiv}>
                  <StickyDiv
                    style={{
                      borderBottom: `none`,
                      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
                      background: '#fff',
                      top: `${STICKY_HEIGHT - 18}px`,
                      zIndex: 100,
                      color: '#000',
                    }}
                  >

                    <Container>

                      <CustomTabs
                        value={currentTabIndex === -1 ? false : currentTabIndex}
                        onChange={(e, val) => {
                          setIndex(val);
                          scrollTo(tabs[val].id, OFFSET);
                        }}
                      >
                        {tabs.map((tab, index) => (
                          <CustomTab
                            label={
                              <Typography
                                variant="body2"
                                style={{
                                  textDecoration: 'none',
                                  color: index === currentTabIndex ? PRIMARY : '#000',
                                }}
                              >
                                <FormattedMessage id={tab.id} />
                              </Typography>
                            }
                            key={tab.id}
                          />
                        ))}
                      </CustomTabs>
                    </Container>
                  </StickyDiv>
                  <Container style={{ display: 'flex' }}>
                    <div style={{ flex: 2, marginBottom: '32px' }}>
                      <Typography
                        id={tabs[0].id}
                        variant="h5"
                        style={{ margin: '36px 0 16px 0', fontWeight: 'bold' }}
                      >
                        <FormattedMessage id={tabs[0].id} />
                      </Typography>
                      <div dangerouslySetInnerHTML={{ __html: eventData.description }} />
                      <Typography
                        id={tabs[1].id}
                        variant="h5"
                        style={{ margin: '36px 0 16px 0', fontWeight: 'bold' }}
                      >
                        <FormattedMessage id={tabs[1].id} />
                      </Typography>
                      <div
                        style={{
                          flex: 1,
                          marginTop: '8px',
                          paddingLeft: 20,
                          paddingRight: 20,
                          boxSizing: 'border-box',
                        }}
                      >
                        <Box>
                          {eventData.ticketClassList.map((item: some, index: number) => (
                            <Line key={index}>
                              <div>
                                <Typography variant="body1">{item.name}</Typography>
                              </div>
                              <Typography variant='subtitle2'>{item.price}đ</Typography>
                            </Line>
                          ))}
                        </Box>
                      </div>

                      <Typography
                        id={tabs[2].id}
                        variant="h5"
                        style={{ margin: '36px 0 16px 0', fontWeight: 'bold' }}
                      >
                        <FormattedMessage id={tabs[2].id} />
                      </Typography>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div className={classes.root} style={{ flex: 1 }}>
                            <Avatar
                              variant="square"
                              src={ticketData.organizer.avatar}
                              className={classes.large}
                            />
                          </div>
                          <div style={{ flex: 4 }}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                              {ticketData.organizer.companyName}
                            </Typography>
                            {ticketData.organizer.detailInfo.map((item: string, index: number) => (
                              <Typography variant="body2" key={index}>
                                {item}
                              </Typography>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: 1, margin: '32px 0 32px 32px' }}>
                      <div
                        style={{
                          position: 'sticky',
                          top: 150,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Box component="span" m={1}>
                          <Line>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                              {eventData.name}
                            </Typography>
                          </Line>
                          <Line>
                            <CalendarSvg />
                            &nbsp;
                            <Typography style={{ flex: 1 }} variant="body2">
                            {convertToDateTime(eventData?.startTime)} - {convertToDateTime(eventData?.endTime)}
                            </Typography>
                          </Line>
                          <Line style={{ minHeight: '24px' }}>
                            <IcLocation />
                            &nbsp;
                            <Typography variant="body2" style={{ color: GREY }}>
                              {eventData.fullAddress}
                            </Typography>
                          </Line>
                          <Button
                            variant="contained"
                            style={{
                              color: WHITE,
                              alignItems: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              backgroundColor: RED,
                              width: '260px',
                              textAlign: 'center',
                              marginTop: 10,
                            }}
                          >
                            Mua vé ngay
                          </Button>
                        </Box>
                      </div>
                    </div>
                  </Container>
                </div>
              </Container>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TicketDetail;
