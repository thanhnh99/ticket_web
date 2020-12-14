import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Collapse, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { SECONDARY } from '../../../../configs/colors';
import {ReactComponent as IconDelete} from '../../../../svg/ic_delete.svg'

const Line = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function DateAndTimePickers() {
    const intl = useIntl();
    const [checked, setChecked] = React.useState(false);
    
    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div>
            <form noValidate style={{ marginBottom: 24 }}>
                <Line style={{ marginBottom: 16 }}>
                    <Typography style={{ fontWeight: 'bold', fontSize: 16, color: "#000000", paddingLeft: 12 }}>
                        Loại vé
                    </Typography>
                </Line>
                <div style={{display: 'flex', border: '1px solid #000', width: "80%", borderRadius: 8, justifyContent: "space-between", padding: 16}}>
                    <div>
                    <Box style={{  paddingLeft: 24, paddingTop: 36}}>
                    <Line style={{ marginBottom: 16 }}>
                        <TextField required id="placeName" label="Tên vé" />
                    </Line>
                    <div style={{ display: "flex", flexDirection: 'column' }}>
                        <div>
                            <RadioGroup
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <FormControlLabel
                                    value="false"
                                    style={{ marginRight: 16 }}
                                    control={<Radio checked={!checked} onChange={handleChange} style={{ color: SECONDARY }} size="small" />}
                                    label={intl.formatMessage({ id: 'Vé miễn phí' })}
                                />
                                <div>
                                    <FormControlLabel
                                        value="true"
                                        control={<Radio checked={checked} onChange={handleChange} style={{ color: SECONDARY }} size="small" />}
                                        label={intl.formatMessage({ id: 'Mất phí' })}
                                    />
                                    <Collapse in={checked}>
                                        <Line style={{ marginTop: 16, marginBottom: 16 }}>
                                            <TextField required id="placeName" label="Số tiền" />
                                        </Line>
                                    </Collapse>
                                </div>

                            </RadioGroup>

                        </div>
                    </div>
                    <Line style={{ marginBottom: 48, marginTop: 32 }}>
                        <TextField required id="placeName" label="Tổng số lượng vé" />
                    </Line>
                    <Line style={{ marginBottom: 48, marginTop: 32 }}>
                        <TextField required id="placeName" label="Số vé tối thiểu trong một đơn hàng" />
                    </Line>
                    <Line style={{ marginBottom: 48, marginTop: 32, borderBottom: "1px solid '#000000'" }}>
                        <TextField required id="placeName" label="Số vé tối đa trong một đơn hàng" />
                    </Line>
                </Box>
                    </div>
                <div><IconDelete/></div>
                </div>
                
                <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{ padding: '4px 32px', marginTop: 16 }}
              disableElevation
            >
              <Typography variant="body2">
                <FormattedMessage
                //   id={isSuccessful ? 'account.backToLogin' : 'account.backToRegister'}
                    id="Thêm loại vé"
                />
              </Typography>
            </Button>
            </form>
        </div>

    );
}
