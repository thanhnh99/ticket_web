import React from 'react';
import {
    Form,
    Input,
    Select
} from 'antd';
import 'antd/dist/antd.css';
import { TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';

const { Option } = Select;

const Line = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


interface Props {
    params: undefined;
    onUpdateFilter(params: undefined): void;
    loading?: boolean;
}


const CreateEventInfo: React.FunctionComponent = () => {

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return (
        <form>
            <Line style={{ marginBottom: 48, marginTop: 16 }}>
                <TextField required id="eventName" label="Tên sự kiện" />
            </Line>
            <Line style={{ marginBottom: 16 }}>
                <TextField required id="placeName" label="Tên địa điểm" />
            </Line>

            <Line>
                <Typography style={{ fontWeight: 'bold', fontSize: 14, color: "#000000", paddingLeft: 12 }}>
                    Chọn loại sự kiện
                </Typography>
            </Line>
            <input
                multiple
                name="event"
                list="email"
                style={{ height: 40 }}
            />
            <datalist id="email">
                <option value="Sân khấu" />
                <option value="Ngoài trời" />
                <option value="Nghệ thuật" />
                <option value="Nhạc sống" />
            </datalist>
            <Line style={{ marginBottom: 32, marginTop: 32 }}>
                <TextField required id="placeName" label="Thông tin sự kiện" />
            </Line>

            <Line>
                <Typography style={{ fontWeight: 'bold', fontSize: 14, color: "#000000", paddingLeft: 12 }}>
                    Nhà tổ chức
                </Typography>
            </Line>
            <Line style={{ marginBottom: 72, marginTop: 72 }}>
                <div></div>
                <div style={{ flex: 1 }}>
                    <Line style={{ marginBottom: 32, marginTop: 32 }}> <TextField required id="placeName" label="Tên" /></Line>
                    <Line style={{ marginBottom: 32, marginTop: 48 }}> <TextField required id="placeName" label="Thông tin" /></Line>
                </div>
            </Line>

            <Line style={{ marginBottom: 16 }}>
                <Typography style={{ fontWeight: 'bold', fontSize: 14, color: "#000000", paddingLeft: 12 }}>
                    Thông tin liên lạc
                </Typography>
            </Line>

            <Line>
                <div style={{ flex: 2 }}>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                </div>
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 2 }}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Nhập email!' }]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>
                </div>
            </Line>

        </form>
    );
};

export default CreateEventInfo;