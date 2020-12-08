/* eslint-disable react-hooks/exhaustive-deps */
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DoneIcon from '@material-ui/icons/Done';
import { remove } from 'lodash';
import React from 'react';
import { BLUE, GREY_300 } from '../../../configs/colors';
import { some } from '../../../constants';
import FormControlTextField, { FormControlTextFieldProps } from './FormControlTextField';

interface CommonProps<T> extends FormControlTextFieldProps {
  getOptionLabel: (option: T) => string;
  options: T[];
}
interface SingleProps<T> extends CommonProps<T> {
  defaultValue?: T;
  multiple?: false;
  value?: T | null;
  onSelectOption?: (value?: T) => void;
}
interface MultiProps<T> extends CommonProps<T> {
  defaultValue?: T;
  multiple: true;
  value?: T[];
  onSelectOption?: (value?: T[]) => void;
}

export type SelectProps<T> = MultiProps<T> | SingleProps<T>;

export const FormControlSelect: <T extends some>(
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
        return value?.findIndex((v) => v?.id === one?.id) !== -1;
      }
      const { value } = props;
      return value?.id === one?.id;
    },
    [options, props],
  );

  const onSelectValue = React.useCallback(
    (one: typeof options[number]) => {
      if (props.multiple) {
        const { value, onSelectOption } = props;
        if (isChecked(one)) {
          onSelectOption && onSelectOption(value ? remove(value, (v) => v?.id !== one?.id) : []);
        } else {
          onSelectOption && onSelectOption(value ? [...value, one] : [one]);
        }
      } else {
        const { onSelectOption } = props;
        onSelectOption && onSelectOption(one);
        setOpen(false);
      }
    },
    [isChecked, options, props],
  );

  const getTextInput = React.useMemo(() => {
    if (props.multiple) {
      const { value } = props;
      return value && value.map((v) => getOptionLabel(v)).join(', ');
    }
    const { value } = props;
    return value && getOptionLabel(value);
  }, [getOptionLabel, props]);

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
          style: { minWidth: inputRef?.current?.offsetWidth, maxHeight: 350, marginTop: 4 },
          variant: 'outlined',
        }}
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
                  onSelectValue(one);
                }}
                style={{ background: isChecked(one) ? GREY_300 : undefined }}
              >
                <ListItemText primary={getOptionLabel(one)} />
                {isChecked(one) && (
                  <ListItemSecondaryAction>
                    <DoneIcon
                      style={{
                        opacity: 0.6,
                        width: 18,
                        height: 18,
                        color: BLUE,
                        justifySelf: 'flex-end',
                      }}
                    />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
        </List>
      </Popover>
    </>
  );
};

export default FormControlSelect;
