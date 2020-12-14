import React from 'react';
import {
    Form,
    Input,
    Select
} from 'antd';
import 'antd/dist/antd.css';
import { Container, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';
import Axios from 'axios';
import { API_PATHS } from '../../../../configs/API'
import {SUCCESS_CODE} from '../../../../constants'
import * as Meterial from '@material-ui/core'


const { Option } = Select;

const Line = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


interface Props {
    loading?: boolean,
    eventName: string,
    location: string,
    address: string,
    type: string
}


const CreateEventInfo: React.FunctionComponent<Props> = (props) => {

    const { eventName, location, address, type } = props;
    const [eventNameinput, setEventNameInput] = React.useState(eventName);
    const [locationInput, setLocationInput] = React.useState(location);
    const [addressInput, setAddressInput] = React.useState(address);
    const [selectedCategory, setSelectedCategory] = React.useState(type)
    const [eventCategory, setEventCategory] = React.useState<any[]>();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        Axios.get(API_PATHS.getCategory)
            .then(response => {
                console.log(response.data)
                if (response.data.statusCode = SUCCESS_CODE) {
                    setEventCategory(response.data.data)
                    console.log(eventCategory)
                }
            })
            .catch(e => {

            })
    }, [])


    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return (
        <Container>
            <form>
                <Line style={{ marginTop: 32 }}>
                    <Line style={{ marginBottom: 16, flex: 1 }}>
                        <TextField required id="eventName" label="Tên sự kiện" value={eventNameinput} onChange={e => setEventNameInput(e.target.value)} />
                    </Line>
                    <Line style={{ marginBottom: 16, flex: 1 }}>
                        <TextField required id="placeName" label="Tên địa điểm" value={locationInput} onChange={e => setLocationInput(e.target.value)} />
                    </Line>
                </Line>
                <Line style={{ marginTop: 48, marginBottom: 32 }}>
                    <div style={{ flex: 1 }}>
                        <Line>
                            <Typography style={{ fontWeight: 'bold', fontSize: 14, color: "#000000", paddingLeft: 12 }}>
                                Chọn loại sự kiện
                </Typography>
                        </Line>
                        <Meterial.Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={selectedCategory}
                            onChange={handleChange}
                            style={{ minWidth: 195, backgroundColor: "white", minHeight: 38 }}

                        >
                            {
                                eventCategory?.map(element => (
                                    <Meterial.MenuItem value={element.id}>
                                        <em>{element.name}</em>
                                    </Meterial.MenuItem>
                                ))
                            }
                        </Meterial.Select>
                    </div>
                    <Line style={{ marginBottom: 32, marginTop: 32, flex: 1 }}>
                        <TextField required id="placeName" label="Thông tin sự kiện" />
                    </Line>
                </Line>

                <Line>
                    <Typography style={{ fontWeight: 'bold', fontSize: 14, color: "#000000", paddingLeft: 12 }}>
                        Nhà tổ chức
                </Typography>
                </Line>
                <Line style={{ marginBottom: 32, marginTop: 32 }}>
                    <Line style={{ marginBottom: 32, marginTop: 32, flex: 1 }}> <TextField required id="placeName" label="Tên" /></Line>
                    <Line style={{ marginBottom: 32, marginTop: 32, flex: 1 }}> <TextField required id="placeName" label="Thông tin" /></Line>
                </Line>

                <Line style={{ marginBottom: 16 }}>
                    <Typography style={{ fontWeight: 'bold', fontSize: 14, color: "#000000", paddingLeft: 12 }}>
                        Thông tin liên lạc
                </Typography>
                </Line>

                <Line>
                    <div style={{ flex: 6 }}>
                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
                        >
                            <Input addonBefore={prefixSelector} style={{ width: '60%' }} />
                        </Form.Item>
                    </div>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 7 }}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Nhập email!' }]}
                        >
                            <Input style={{ width: '60%' }} />
                        </Form.Item>
                    </div>
                </Line>

            </form>
        </Container>
    );
};

export default CreateEventInfo;