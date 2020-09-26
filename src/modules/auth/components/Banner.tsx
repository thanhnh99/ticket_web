/* eslint-disable react/require-default-props */
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 103px;
  left: 0;
  right: 0;
  padding: 0 26px;
`;

interface Props {
  contentId?: string;
}

const Banner = (props: Props) => {
  const { contentId } = props;
  return (
    <div style={{ position: 'relative' }}>
      <Wrapper>
        {contentId && (
          <Typography variant="body2" style={{ color: 'white' }}>
            <FormattedMessage id={contentId} />
          </Typography>
        )}
      </Wrapper>
    </div>
  );
};

export default Banner;
