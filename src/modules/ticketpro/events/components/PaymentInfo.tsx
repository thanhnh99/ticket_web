import React from 'react';
import 'antd/dist/antd.css';
import { TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';


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


const PaymentInfo: React.FunctionComponent = () => {

    return (
        <form>
            <Line>
                <Typography style={{ fontWeight: 'bold', fontSize: 18, color: "#000000", paddingLeft: 12 }}>
                    Thông tin tài khoản
                </Typography>
            </Line>
            <Line style={{ marginBottom: 48, marginTop: 16 }}>
                <TextField required id="eventName" label="Chủ tài khoản" style={{ width: '75%' }} />
            </Line>
            <Line style={{ marginBottom: 48, marginTop: 16 }}>
                <TextField required id="placeName" label="Số tài khoản" style={{ width: '75%' }} />
            </Line>
            <Line style={{ marginBottom: 48, marginTop: 16 }}>
                <TextField required id="eventName" label="Tên ngân hàng" style={{ width: '75%' }} />
            </Line>
            <Line style={{ marginBottom: 48, marginTop: 16 }}>
                <TextField required id="eventName" label="Chi nhánh" style={{ width: '75%' }} />
            </Line>
        </form>
    );
};

export default PaymentInfo;