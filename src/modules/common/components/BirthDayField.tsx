import MomentUtils from '@date-io/moment';
import { createMuiTheme, IconButton, InputAdornment } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment, { Moment } from 'moment';
import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { SECONDARY } from '../../../configs/colors';
import { DATE_FORMAT } from '../../../models/moment';
import { AppState } from '../../../redux/reducers';
import { ReactComponent as IconCalender } from '../../../svg/ic_calendar.svg';
import { DateMaskCustomSingle } from './elements';
import FormControlTextField from './FormControlTextField';

const BirthDayField = connect((state: AppState) => ({ locale: state.intl.locale }))(
  (props: {
    errorMessage?: string;
    id: string;
    label?: string;
    date?: Moment;
    update: (val: Moment | null) => void;
    optional?: boolean;
    inputStyle?: React.CSSProperties;
    disableFuture?: boolean;
    disablePast?: boolean;
  }) => {
    const {
      id,
      label,
      errorMessage,
      date,
      update,
      optional,
      inputStyle,
      disableFuture,
      disablePast,
    } = props;
    const [dateFormatStr, setDateFormatStr] = React.useState(
      `${date ? date.format(DATE_FORMAT) : ''}`,
    );
    const [open, setOpen] = useState(false);
    const theme = useMemo(() => createMuiTheme({ palette: { primary: { main: SECONDARY } } }), []);

    const textChange = React.useCallback(
      (text: string) => {
        const dateTmp = moment(text, DATE_FORMAT, true);
        if (dateTmp?.isValid() && dateTmp.isSameOrBefore(moment().startOf('day'))) {
          update(dateTmp);
        } else {
          update(null);
        }
      },
      [update],
    );

    React.useEffect(() => {
      setDateFormatStr(`${date ? date.format(DATE_FORMAT) : ''}`);
    }, [date]);

    return (
      <div>
        <FormControlTextField
          id={id}
          formControlStyle={inputStyle}
          label={label}
          fullWidth
          value={dateFormatStr}
          style={{
            background: 'white',
            width: '100%',
            ...inputStyle,
          }}
          optional={optional}
          inputProps={{ style: { width: '100%' } }}
          placeholder={DATE_FORMAT.toLowerCase()}
          onChange={(e) => {
            setDateFormatStr(e.target.value);
            textChange(e.target.value);
          }}
          inputComponent={DateMaskCustomSingle as any}
          onClick={() => setOpen(true)}
          errorMessage={errorMessage}
          endAdornment={
            <InputAdornment position="end" style={{ marginRight: 8 }}>
              <IconButton size="small" edge="start">
                <IconCalender />
              </IconButton>
            </InputAdornment>
          }
        />
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <ThemeProvider theme={theme}>
            <DatePicker
              variant="dialog"
              autoOk
              open={open}
              disableFuture={disableFuture}
              disablePast={disablePast}
              maxDate={disableFuture ? moment() : undefined}
              minDate={disablePast ? moment() : undefined}
              openTo="year"
              format="dd/MM/yyyy"
              label="Date of birth"
              views={['year', 'month', 'date']}
              value={date || null}
              onChange={(newDate) => {
                update(newDate);
              }}
              TextFieldComponent={() => <></>}
              onAccept={() => setOpen(false)}
              onClose={() => setOpen(false)}
              okLabel={<FormattedMessage id="ok" />}
              cancelLabel={<FormattedMessage id="cancel" />}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </div>
    );
  },
);
export default BirthDayField;
