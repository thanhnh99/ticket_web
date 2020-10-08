import { Typography } from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { GREY_100, GREY_300 } from '../../../configs/colors';
import { some } from '../../../constants';
import { ReactComponent as IconEmail } from '../../../svg/email.svg';
import { ReactComponent as IconEmailOpen } from '../../../svg/email_open.svg';
import { RawLink } from '../../common/components/Link';

const Line = styled.div`
  display: flex;
  align-items: center;
  cursor: 'pointer';
  &:hover {
    background: ${GREY_100};
  }
  cursor: pointer;
`;

interface Props {
  data: some;
  onClick: () => void;
}

const NotificationCard: React.FunctionComponent<Props> = (props) => {
  const { data, onClick } = props;
  const lastExecuteTime = moment(data.lastExecuteTime, 'HH:mm DD/MM/YYYY');
  const isToday = lastExecuteTime.isSame(moment(), 'day');
  const isYesterday = lastExecuteTime.isSame(moment().subtract(1, 'days'), 'day');

  const dateTime = React.useMemo(() => {
    if (isToday) {
      return <FormattedMessage id="today" />;
    }
    if (isYesterday) {
      return <FormattedMessage id="yesterday" />;
    }
    return data.lastExecuteTime;
  }, [data.lastExecuteTime, isToday, isYesterday]);

  const getLink = React.useMemo(() => {
    return null;
  }, []);

  const content = React.useCallback(() => {
    return (
      <Line onClick={() => getLink === null && onClick()}>
        <div
          style={{
            width: '48px',
            paddingTop: '9px',
            height: '100%',
            alignSelf: 'start',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {data.read ? <IconEmailOpen /> : <IconEmail />}
        </div>
        <div
          style={{
            flex: 1,
            borderBottom: `1px solid ${GREY_300}`,
            padding: '9px 16px 12px 0px',
            minHeight: '72px',
            overflow: 'hidden',
          }}
        >
          <Line
            style={{
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant={data.read ? 'body1' : 'subtitle2'}
              color={data.read ? 'textSecondary' : 'textPrimary'}
              style={{
                flex: 1,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '650px',
                overflow: 'hidden',
              }}
            >
              {data.message && data.message.title}
            </Typography>
            <Typography variant="caption" color={data.read ? 'textSecondary' : 'textPrimary'}>
              {dateTime}
            </Typography>
          </Line>
          <Typography
            variant="caption"
            color={data.read ? 'textSecondary' : 'textPrimary'}
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {data.message && data.message.description}
          </Typography>
        </div>
      </Line>
    );
  }, [data.message, data.read, dateTime, getLink, onClick]);

  return <>{getLink ? <RawLink to={getLink}>{content()}</RawLink> : content()}</>;
};

export default NotificationCard;
