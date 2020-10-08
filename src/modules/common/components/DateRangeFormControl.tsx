/* eslint-disable no-nested-ternary */
import { Button, IconButton, InputAdornment, RootRef } from '@material-ui/core';
import moment, { Moment } from 'moment';
import React from 'react';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import { FormattedMessage, useIntl } from 'react-intl';
import { CSSTransition } from 'react-transition-group';
import { PRIMARY } from '../../../configs/colors';
import { DATE_FORMAT } from '../../../models/moment';
import { ReactComponent as IconCalender } from '../../../svg/ic_calendar.svg';
import { Col, Wrapper, DateMaskCustomSingle, DateMaskCustomRange } from './elements';
import { useStylesForm } from './Form';
import FormControlTextField from './FormControlTextField';
import styles from './styles.module.scss';
import { MIN_WIDTH_FORM, renderMonthText } from './utils';

export function isDayHighlighted(day: Moment) {
  return moment().format('L') === day.format('L') ? (
    <span style={{ fontWeight: 'bold', color: PRIMARY }}>{day.format('D')}</span>
  ) : (
    day.format('D')
  );
}

interface Props {
  onChange(startDate?: Moment, endDate?: Moment): void;
  label?: React.ReactNode;
  startDate?: Moment;
  endDate?: Moment;
  optional?: boolean;
  errorMessage?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  minimizedWidth?: string | number;
  numberOfMonths?: number;
  singleValue?: boolean;
  startAdornment?: boolean;
  placeholder?: string;
  iRef?: React.RefObject<HTMLDivElement>;
  isOutsideRange?: (day: any) => boolean;
  onClickBtn?: () => void;
  direction?: 'left' | 'center';
}

const DateRangeFormControl: React.FC<Props> = (props) => {
  const intl = useIntl();
  const {
    onChange,
    startDate,
    endDate,
    optional,
    errorMessage,
    inputStyle,
    style,
    label,
    minimizedWidth,
    singleValue,
    numberOfMonths,
    placeholder,
    startAdornment,
    isOutsideRange,
    onClickBtn,
    iRef,
    direction,
  } = props;

  const classes = useStylesForm();
  const [focusedInput, setFocusedInput] = React.useState<FocusedInputShape>('startDate');
  const [dateFormatStr, setDateFormatStr] = React.useState(
    singleValue
      ? `${startDate ? startDate.format(DATE_FORMAT) : intl.formatMessage({ id: 'notChosen' })}`
      : `${startDate ? startDate.format(DATE_FORMAT) : intl.formatMessage({ id: 'notChosen' })} - ${
          endDate ? endDate.format(DATE_FORMAT) : intl.formatMessage({ id: 'notChosen' })
        }`,
  );
  const [start, setStartDate] = React.useState<Moment | undefined>();
  const [end, setEndDate] = React.useState<Moment | undefined>();
  const [isFocused, setFocus] = React.useState(false);
  const [height, setHeight] = React.useState(0);

  const parent = iRef || React.createRef<HTMLDivElement>();
  const inputRef = React.useRef<HTMLInputElement>();
  const innerRef = React.useRef<HTMLInputElement>();

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.relatedTarget instanceof Element) {
        if (e.currentTarget.contains(e.relatedTarget as Element)) {
          if (
            inputRef.current &&
            (e.relatedTarget.id !== 'selectDateRange' || e.relatedTarget.tagName !== 'INPUT')
          ) {
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
      onChange(start, end);
      setDateFormatStr(
        singleValue
          ? `${start ? start.format(DATE_FORMAT) : intl.formatMessage({ id: 'notChosen' })}`
          : `${
              start ? moment(start.valueOf()).format('L') : intl.formatMessage({ id: 'notChosen' })
            } - ${
              end ? `${moment(end.valueOf()).format('L')}` : intl.formatMessage({ id: 'notChosen' })
            }`,
      );
    },
    [onChange, start, end, singleValue, intl, parent],
  );

  const textChange = React.useCallback((text: string) => {
    const newDateValues = text.split(' - ');
    const newStartDate = moment(newDateValues[0], DATE_FORMAT, true);
    const newEndDate = newDateValues[1] ? moment(newDateValues[1], DATE_FORMAT, true) : undefined;

    if (newStartDate.isValid() && newStartDate.isSameOrBefore(moment().startOf('day'))) {
      setStartDate(newStartDate);
    } else {
      setStartDate(undefined);
    }
    if (
      newEndDate?.isValid() &&
      newEndDate.isSameOrBefore(moment().startOf('day')) &&
      newEndDate.isAfter(newStartDate)
    ) {
      setEndDate(newEndDate);
    } else {
      setEndDate(undefined);
    }
  }, []);

  React.useEffect(() => {
    setFocusedInput('startDate');
    setStartDate(startDate);
    setEndDate(endDate);
    setDateFormatStr(
      singleValue
        ? `${startDate ? startDate.format(DATE_FORMAT) : intl.formatMessage({ id: 'notChosen' })}`
        : `${
            startDate ? startDate.format(DATE_FORMAT) : intl.formatMessage({ id: 'notChosen' })
          } - ${endDate ? endDate.format(DATE_FORMAT) : intl.formatMessage({ id: 'notChosen' })}`,
    );
  }, [startDate, endDate, intl, singleValue]);

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [inputRef, isFocused, singleValue]);

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
        minWidth: MIN_WIDTH_FORM,
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
          margin: isFocused ? (direction === 'center' ? '-12px 0px' : '-12px') : undefined,
          transition: 'none',
          right: direction === 'left' ? 0 : undefined,
          left: direction === 'left' ? 'unset' : direction === 'center' ? '50%' : undefined,
          transform: direction === 'center' ? 'translateX(-50%)' : undefined,
        }}
      >
        <div style={{ padding: isFocused ? '12px 12px 0px 12px' : undefined }}>
          <RootRef rootRef={innerRef}>
            <FormControlTextField
              id="selectDateRange"
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
              placeholder={
                placeholder ||
                (singleValue
                  ? `${DATE_FORMAT.toLocaleLowerCase()}`
                  : `${DATE_FORMAT.toLocaleLowerCase()} - ${DATE_FORMAT.toLocaleLowerCase()}`)
              }
              fullWidth
              value={dateFormatStr}
              optional={optional}
              inputProps={{ style: { width: '100%' } }}
              onChange={(e) => {
                setDateFormatStr(e.target.value);
                textChange(e.target.value);
              }}
              errorMessage={errorMessage}
              inputComponent={
                isFocused
                  ? singleValue
                    ? (DateMaskCustomSingle as any)
                    : (DateMaskCustomRange as any)
                  : undefined
              }
              endAdornment={
                !startAdornment && (
                  <InputAdornment position="end" style={{ marginRight: 8 }}>
                    <IconButton size="small" edge="start">
                      <IconCalender />
                    </IconButton>
                  </InputAdornment>
                )
              }
              startAdornment={
                startAdornment && (
                  <InputAdornment position="start" style={{ marginLeft: 8 }}>
                    <IconButton size="small" edge="start">
                      <IconCalender />
                    </IconButton>
                  </InputAdornment>
                )
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
            <DayPickerRangeController
              hideKeyboardShortcutsPanel
              noBorder
              daySize={40}
              numberOfMonths={numberOfMonths || 1}
              startDate={start || null}
              endDate={end || null}
              focusedInput={focusedInput}
              onDatesChange={(value) => {
                setStartDate(value.startDate || undefined);
                setEndDate(value.endDate || undefined);
                setDateFormatStr(
                  singleValue
                    ? `${
                        value.startDate
                          ? value.startDate.format(DATE_FORMAT)
                          : intl.formatMessage({ id: 'notChosen' })
                      }`
                    : `${
                        value.startDate
                          ? value.startDate.format(DATE_FORMAT)
                          : intl.formatMessage({ id: 'notChosen' })
                      } - ${
                        value.endDate
                          ? value.endDate.format(DATE_FORMAT)
                          : intl.formatMessage({ id: 'notChosen' })
                      }`,
                );
              }}
              onFocusChange={(text) =>
                setFocusedInput(singleValue ? 'startDate' : text || 'startDate')
              }
              isOutsideRange={(e: any) =>
                isOutsideRange
                  ? isOutsideRange(e)
                  : moment().endOf('day').isSameOrBefore(e) ||
                    moment().subtract(6, 'months').startOf('day').isSameOrAfter(e)
              }
              minimumNights={0}
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
                  onClickBtn && onClickBtn();
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

export default DateRangeFormControl;
