/* eslint-disable no-unused-vars */
import { Button } from '@material-ui/core';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import React from 'react';
import { GREY_100, GREY_300, GREY_500 } from '../../../../configs/colors';
import { ReactComponent as IconArrow } from '../../../../svg/ic_arrow_back.svg';

function TablePaginationActionsCustom(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  return (
    <>
      <Button
        style={{
          padding: '2px',
          background: GREY_100,
          minWidth: 'unset',
          marginRight: 4,
          marginLeft: 8,
          minHeight: 24,
        }}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <IconArrow className="svgFillAll" style={{ stroke: page === 0 ? GREY_300 : GREY_500 }} />
      </Button>
      <Button
        style={{
          padding: '2px',
          background: GREY_100,
          minWidth: 'unset',
          marginRight: 8,
          minHeight: 24,
        }}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <IconArrow
          className="svgFillAll"
          style={{
            stroke: page >= Math.ceil(count / rowsPerPage) - 1 ? GREY_300 : GREY_500,
            transform: 'rotate(180deg)',
          }}
        />
      </Button>
    </>
  );
}
export default TablePaginationActionsCustom;
