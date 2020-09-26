import { Button, IconButton, InputAdornment, RootRef } from '@material-ui/core';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { DayPickerSingleDateController } from 'react-dates';
import { FormattedMessage, useIntl } from 'react-intl';
import { CSSTransition } from 'react-transition-group';
import { DATE_FORMAT } from '../../../models/moment';
import { ReactComponent as IconCalender } from '../../../svg/ic_calendar.svg';
import { isDayHighlighted } from './DateRangeFormControl';
import { Col, DateMaskCustomSingle, Wrapper } from './elements';
import { useStylesForm } from './Form';
import FormControlTextField from './FormControlTextField';
import styles from './styles.module.scss';
import { renderMonthText } from './utils';

interface DateMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  placeholder: string;
}

interface Props {
  minimizedWidth?: string | number;
  date?: Moment;
  optional?: boolean;
  label?: React.ReactNode;
  errorMessage?: string;
  style?: React.CSSProperties;
  onChange(date?: Moment): void;
  inputStyle?: React.CSSProperties;
  isOutsideRange?: (day: any) => boolean;
  numberOfMonths?: number;
  placeholder?: string;
}

const DateField: React.FC<Props> = (props) => {
  const {
    date,
    optional,
    minimizedWidth,
    label,
    style,
    inputStyle,
    onChange,
    errorMessage,
    isOutsideRange,
    numberOfMonths,
    placeholder,
  } = props;
  const intl = useIntl();
  const classes = useStylesForm();
  const [time, setTime] = React.useState<Moment | undefined>(date);
  const [dateFormatStr, setDateFormatStr] = React.useState(
    `${date ? date.format(DATE_FORMAT) : intl.formatMessage({ id: 'chosenDate' })}`,
  );
  const [isFocused, setFocus] = useState(false);
  const [height, setHeight] = React.useState(0);

  const parent = React.createRef<HTMLDivElement>();
  const inputRef = React.createRef<HTMLInputElement>();
  const innerRef = React.useRef<HTMLInputElement>();
  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.relatedTarget instanceof Element) {
        if (e.currentTarget.contains(e.relatedTarget as Element)) {
          if (inputRef.current && e.relatedTarget.id !== 'dateField') {
            inputRef.current?.focus();
            return;
          }
          if (parent.current) {
            parent.current.focus();
            return;
          }
        }
      }
      setFocus(false);
      onChange(time);
      setDateFormatStr(
        `${time ? time.format(DATE_FORMAT) : intl.formatMessage({ id: 'chosenDate' })}`,
      );
    },
    [onChange, time, intl, inputRef, parent],
  );

  const textChange = React.useCallback((text: string) => {
    const newDate = moment(text, DATE_FORMAT, true);
    if (newDate.isValid() && newDate.isSameOrBefore(moment().startOf('day'))) {
      setTime(newDate);
    } else {
      setTime(undefined);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [inputRef, isFocused]);

  React.useEffect(() => {
    setTime(date);
    setDateFormatStr(
      `${date ? date.format(DATE_FORMAT) : intl.formatMessage({ id: 'chosenDate' })}
      `,
    );
  }, [intl, date]);

  React.useEffect(() => {
    setHeight(innerRef.current?.offsetHeight as number);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        outline: 'none',
        minHeight: height,
        color: isFocused ? 'black' : undefined,
        marginRight: 30,
        minWidth: '220px',
        ...style,
      }}
      className={classes.margin}
      role="group"
      tabIndex={-1}
      ref={parent}
      onBlur={onBlur}
      onFocus={(e) => {
        setFocus(true);
      }}
    >
      <Wrapper
        style={{
          boxShadow: isFocused ? '0px 4px 8px rgba(0, 0, 0, 0.25)' : undefined,
          zIndex: isFocused ? 100 : 0,
          backgroundColor: isFocused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
          margin: isFocused ? -12 : undefined,
          transition: 'none',
        }}
      >
        <div style={{ padding: isFocused ? '12px 12px 0px 12px' : undefined }}>
          <RootRef rootRef={innerRef}>
            <FormControlTextField
              id="dateField"
              inputRef={inputRef}
              label={label}
              formControlStyle={{
                margin: 0,
                width: '100%',
                minWidth: minimizedWidth,
              }}
              style={{
                background: 'white',
                ...inputStyle,
              }}
              placeholder={placeholder || DATE_FORMAT.toLocaleLowerCase()}
              fullWidth
              value={dateFormatStr}
              optional={optional}
              inputProps={{ style: { width: '100%' } }}
              onChange={(e) => {
                setDateFormatStr(e.target.value);
                textChange(e.target.value);
              }}
              inputComponent={isFocused ? (DateMaskCustomSingle as any) : undefined}
              errorMessage={errorMessage}
              endAdornment={
                <InputAdornment position="end" style={{ marginRight: 8 }}>
                  <IconButton size="small" edge="start">
                    <IconCalender />
                  </IconButton>
                </InputAdornment>
              }
            />
          </RootRef>
        </div>
        <CSSTransition
          timeout={200}
          in={isFocused}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.leave,
            exitActive: styles.leaveActive,
          }}
          unmountOnExit
        >
          <Col
            key={1}
            style={{
              transition: 'all 300ms ease',
              backgroundColor: 'white',
              width: isFocused ? undefined : 0,
              alignItems: 'center',
            }}
          >
            <DayPickerSingleDateController
              hideKeyboardShortcutsPanel
              noBorder
              daySize={40}
              date={time || null}
              focused={isFocused}
              numberOfMonths={numberOfMonths || 1}
              onFocusChange={() => {}}
              onDateChange={(newDate) => {
                setTime(newDate || undefined);
                setDateFormatStr(
                  `${
                    newDate ? newDate.format(DATE_FORMAT) : intl.formatMessage({ id: 'chosenDate' })
                  }`,
                );
              }}
              isOutsideRange={(e: any) =>
                isOutsideRange
                  ? isOutsideRange(e)
                  : moment().endOf('day').isSameOrBefore(e) ||
                    moment().subtract(6, 'months').startOf('day').isSameOrAfter(e)
              }
              renderMonthText={renderMonthText}
              renderDayContents={(day) => isDayHighlighted(day)}
            />
            <div style={{ alignSelf: 'flex-end', padding: '0px 12px 12px 0px' }}>
              <Button
                disableElevation
                style={{ minWidth: '140px' }}
                size="large"
                color="secondary"
                variant="contained"
                onClick={() => {
                  parent.current?.blur();
                  inputRef.current?.blur();
                }}
              >
                <FormattedMessage id="accept" />
              </Button>
            </div>
          </Col>
        </CSSTransition>
      </Wrapper>
    </div>
  );
};

export default DateField;
