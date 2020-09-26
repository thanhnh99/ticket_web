import { IconButton, List, ListItem, Popover, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DoneIcon from '@material-ui/icons/Done';
import { remove } from 'lodash';
import React from 'react';
import { BLUE, GREY_300 } from '../../../configs/colors';
import { some } from '../../../constants';
import FormControlTextField, { FormControlTextFieldProps } from './FormControlTextField';

// eslint-disable-next-line no-unused-vars
// const autocompleteCS = makeStyles(() => ({
//   endAdornment: {
//     top: 0,
//     bottom: 0,
//     display: 'flex',
//     alignItems: 'center',
//   },
// }));
interface CommonProps<T> extends FormControlTextFieldProps {
  getOptionLabel: (option: T) => string;
  options: T[];
}
interface SingleProps<T> extends CommonProps<T> {
  multiple?: false;
  value?: any;
  onSelectOption?: (value?: any) => void;
}
interface MultiProps<T> extends CommonProps<T> {
  multiple: true;
  value?: any[];
  onSelectOption?: (value?: any[]) => void;
}

export type SelectProps<T> = MultiProps<T> | SingleProps<T>;

export const SingleSelect: <T extends some>(
  prop: SelectProps<T>,
) => React.ReactElement<SelectProps<T>> = (props) => {
  const { options, getOptionLabel, multiple, onSelectOption: test, id, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<any>();
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isChecked = React.useCallback(
    (one: typeof options[number]) => {
      if (props.multiple) {
        const { value } = props;
        return value && value?.length > 0
          ? value?.findIndex((v) => v === one?.id) !== -1
          : one?.id === undefined;
      }
      const { value } = props;
      return value === one?.id;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, props],
  );

  const onSelectValue = React.useCallback(
    // eslint-disable-next-line no-unused-vars
    (one: typeof options[number], index: number) => {
      if (props.multiple) {
        const { value, onSelectOption } = props;
        let tmp;
        if (isChecked(one)) {
          tmp = value ? remove(value, (v) => v !== one?.id) : [];
        } else {
          tmp = value ? [...value, one?.id] : [one?.id];
        }
        const hasAll = tmp.filter((v) => v === undefined);
        const noUndefinedValue = tmp.filter((v) => v !== undefined);
        const noUndefinedOptions = options.filter((v) => v?.id !== undefined);
        if (
          hasAll?.length > 0 ||
          (noUndefinedValue?.length === noUndefinedOptions?.length &&
            options?.length !== noUndefinedOptions?.length)
        ) {
          onSelectOption && onSelectOption([]);
        } else {
          onSelectOption && onSelectOption(tmp);
        }
      } else {
        const { onSelectOption } = props;
        onSelectOption && onSelectOption(one?.id);
        setOpen(false);
      }
    },
    [isChecked, options, props],
  );

  const getTextInput = React.useMemo(() => {
    if (props.multiple) {
      const { value } = props;
      const defaultValue = options.find((v) => v?.id === undefined);
      return value && value.length > 0
        ? value
            .map((v) => {
              const tmp = options.find((one) => one?.id === v);
              if (tmp) {
                return getOptionLabel(tmp);
              }
              return undefined;
            })
            .join(', ')
        : defaultValue && getOptionLabel(defaultValue);
    }
    const { value } = props;
    const tmp = options?.find((one) => one?.id === value);
    return tmp && getOptionLabel(tmp);
  }, [getOptionLabel, options, props]);

  return (
    <>
      <FormControlTextField
        {...rest}
        id={id}
        readOnly
        focused={open}
        value={getTextInput || ''}
        innerRef={inputRef}
        endAdornment={
          <IconButton style={{ padding: 2, marginRight: 6 }}>
            <ArrowDropDownIcon style={{ transform: open ? 'rotate(180deg)' : undefined }} />
          </IconButton>
        }
        inputProps={{
          ...rest.inputProps,
          style: { textOverflow: 'ellipsis', ...rest.inputProps?.style },
        }}
        onClick={handleClick}
      />
      <Popover
        open={open}
        anchorEl={inputRef?.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: { width: inputRef?.current?.offsetWidth, maxHeight: 350, marginTop: 4 },
          variant: 'outlined',
        }}
        elevation={1}
      >
        <List>
          {options?.length > 0 &&
            options.map((one: typeof options[number], index: number) => (
              <ListItem
                key={index}
                role={undefined}
                dense
                button
                onClick={() => {
                  onSelectValue(one, index);
                }}
                style={{ background: isChecked(one) ? GREY_300 : undefined, overflow: 'hidden' }}
              >
                <Typography
                  variant="body2"
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {getOptionLabel && getOptionLabel(one)}
                </Typography>
                <DoneIcon
                  style={{
                    opacity: 0.6,
                    width: 18,
                    height: 18,
                    visibility: isChecked(one) ? 'visible' : 'hidden',
                    color: BLUE,
                    justifySelf: 'flex-end',
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Popover>
    </>
  );
};

export default SingleSelect;
