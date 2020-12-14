import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { RED, SECONDARY } from '../../../../configs/colors';
import { ReactComponent as IconDelete } from '../../../../svg/ic_delete.svg';
import { IFields } from '../utils';
import { some } from '../../../../constants';

const Line = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function DateAndTimePickers() {
  const intl = useIntl();
  const [checked, setChecked] = React.useState(false);
  const [refundFields, setRefundFields] = React.useState<IFields[]>([{ isDelete: false }]);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const values = {
    ticketName: 'vip',
    total: 10,
    minNumberTicket: 1,
    maxNumberTicket: 10,
  };
  const handleRemove = (index: number) => {
    let temp: some = { ...values };
    refundFields.forEach((elm: some, idx: number) => {
      if (idx >= index) {
        temp = {
          ...temp,
          [`ticketName_${idx}`]: values[`ticketName_${idx + 1}`],
          [`total_${idx}`]: values[`time_${idx + 1}`],
          [`minNumberTicket_${idx}`]: values[`minNumberTicket_${idx + 1}`],
          [`maxNumberTicket_${idx}`]: values[`maxNumberTicket_${idx + 1}`],
        };
      }
    });
    // if (submitCount > 0) {
    //   setErrors({});
    //   handleReset();
    // }
    // setValues(temp);
    setRefundFields([...refundFields.slice(0, index), ...refundFields.slice(index + 1)]);
  };

  const handleAdd = () => {
    const temp: some = {
      ...values,
      [`ticketName_${refundFields.length}`]: undefined,
      [`total_${refundFields.length}`]: 1,
      [`minNumberTicket_${refundFields.length}`]: 0,
      [`maxNumberTicket_${refundFields.length}`]: 1,
    };
    // setValues(temp);
    setRefundFields([...refundFields, { isDelete: false }]);
  };

  return (
    <div>
      <form noValidate style={{ marginBottom: 24 }}>
        <Line style={{ marginBottom: 16 }}>
          <Typography
            style={{ fontWeight: 'bold', fontSize: 16, color: '#000000', paddingLeft: 12 }}
          >
            Loại vé
          </Typography>
        </Line>
        {refundFields.map((el: some, idx: number) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              border: '1px solid #000',
              width: '80%',
              borderRadius: 8,
              justifyContent: 'space-between',
              padding: 16,
              marginTop: 16
            }}
          >
            <div>
              <Box style={{ paddingLeft: 24, paddingTop: 36 }}>
                <Line style={{ marginBottom: 16 }}>
                  <TextField 
                  required 
                  id="ticketName" 
                  label="Tên vé" 
                  name={`ticketName_${idx}`}
                  />
                </Line>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <RadioGroup
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        alignItems: 'flex-start',
                      }}
                    >
                      <FormControlLabel
                        value="false"
                        style={{ marginRight: 16 }}
                        control={
                          <Radio
                            checked={!checked}
                            onChange={handleChange}
                            style={{ color: SECONDARY }}
                            size="small"
                          />
                        }
                        label={intl.formatMessage({ id: 'Vé miễn phí' })}
                      />
                      <div>
                        <FormControlLabel
                          value="true"
                          control={
                            <Radio
                              checked={checked}
                              onChange={handleChange}
                              style={{ color: SECONDARY }}
                              size="small"
                            />
                          }
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
                  <TextField 
                  required 
                  id="total" 
                  label="Tổng số lượng vé"
                  name={`total_${idx}`} 
                  />
                </Line>
                <Line style={{ marginBottom: 48, marginTop: 32 }}>
                  <TextField 
                  required id="minNumberTicket" 
                  label="Số vé tối thiểu trong một đơn hàng" 
                  name={`minNumberTicket_${idx}`}
                  />
                </Line>
                <Line
                  style={{ marginBottom: 48, marginTop: 32, borderBottom: "1px solid '#000000'" }}
                >
                  <TextField 
                  required id="maxNumberTicket" 
                  label="Số vé tối đa trong một đơn hàng" 
                  name={`maxNumberTicket_${idx}`}
                  />
                </Line>
              </Box>
            </div>
            <div>
              {idx > 0 && (
                <>
                  <Button style={{ padding: 4 }} onClick={() => handleRemove(idx)}>
                    <IconDelete style={{ padding: 0, stroke: RED }} className="svgFillAll" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}

        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ padding: '4px 32px', marginTop: 16 }}
          disableElevation
          onClick={handleAdd}
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
