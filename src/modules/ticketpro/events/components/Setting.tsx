import React from 'react';
import 'antd/dist/antd.css';
import { TextField } from '@material-ui/core';
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


const Setting: React.FunctionComponent = () => {

    return (
        <>
            <Line style={{ marginBottom: 48, marginTop: 32 }}>
                <TextField required id="placeName" label="Đường link dẫn đến sự kiện" />
            </Line>
        </>
    );
};

export default Setting;