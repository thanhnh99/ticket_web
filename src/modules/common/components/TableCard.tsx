/* eslint-disable no-nested-ternary */
import {
  fade,
  IconButton,
  TablePagination,
  TablePaginationProps,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { GREY_100, GREY, GREY_300 } from '../../../configs/colors';
import { ReactComponent as IconBox } from '../../../svg/ic_nodata.svg';
import { Col, Row } from './elements';
import LoadingIcon from './LoadingIcon';
import TablePaginationActionsCustom from './TableCustom/TablePaginationActionsCustom';

const styles = (theme: Theme) => {
  return {
    root: { justifyContent: 'flex-end' },
    selectRoot: {
      margin: '0 16px 0 8px',
      minWidth: '64px',
    },
    selectIcon: {
      top: 'calc(50% - 14px)',
    },
    input: {
      '& .MuiTablePagination-select': {
        textAlign: 'left',
        textAlignLast: 'left',
        background: 'white',
        border: `0.5px solid ${GREY}`,
        borderRadius: '2px',
        fontSize: theme.typography.body2.fontSize,
        padding: '3px 12px',
      },
    },
    actions: {
      marginLeft: '10px',
      '& .MuiIconButton-root': {
        padding: '6px',
      },
    },
    even: {
      background: 'white',
    },
    odd: {
      background: GREY_300,
    },
  };
};

interface Props<T extends Object> extends WithStyles<typeof styles> {
  style?: React.CSSProperties;
  styleTable?: React.CSSProperties;
  styleItems?: React.CSSProperties;
  dataSource?: T[];
  paginationProps?: TablePaginationProps;
  loading?: boolean;
  renderItem: (col: T, index: number) => React.ReactNode;
}

const TableCard: <T extends Object>(prop: Props<T>) => React.ReactElement<Props<T>> = (props) => {
  const {
    style,
    styleTable,
    paginationProps,
    loading,
    dataSource,
    classes,
    renderItem,
    styleItems,
  } = props;
  const intl = useIntl();
  return (
    <Col style={{ ...style, position: 'relative' }}>
      <Col style={{ minHeight: 320, position: 'relative', ...styleTable }}>
        {dataSource && dataSource?.length > 0 ? (
          dataSource.map((v: typeof dataSource[number], index: number) => (
            <div key={index} style={styleItems}>
              {renderItem(v, index)}
            </div>
          ))
        ) : (
          <>
            {!loading && (
              <Col
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '12px',
                  height: '100%',
                }}
              >
                <IconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  disabled
                  style={{
                    backgroundColor: GREY_100,
                    margin: '12px',
                  }}
                >
                  <IconBox />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  <FormattedMessage id="noData" />
                </Typography>
              </Col>
            )}
          </>
        )}
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              background: fade(GREY_100, 0.7),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoadingIcon />
          </div>
        )}
      </Col>
      {dataSource && paginationProps && paginationProps.count > 0 && (
        <TablePagination
          component={Row}
          {...paginationProps}
          classes={{
            root: classes.root,
            selectRoot: classes.selectRoot,
            selectIcon: classes.selectIcon,
            input: classes.input,
            actions: classes.actions,
          }}
          labelRowsPerPage={intl.formatMessage({ id: 'labelRowPerPage' })}
          ActionsComponent={TablePaginationActionsCustom}
        />
      )}
    </Col>
  );
};

export default withStyles(styles)(TableCard);
