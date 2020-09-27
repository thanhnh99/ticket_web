import { AppBar, Typography } from '@material-ui/core';
import * as React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { FormattedMessage } from 'react-intl';
import { GREY_300 } from '../../configs/colors';
import Badge from '../../modules/account/component/Badge';
import { Row } from '../../modules/common/components/elements';
import { AppState } from '../../redux/reducers';
import { HEADER_HEIGHT } from '../constants';

const mapStateToProps = (state: AppState) => {
  return { router: state.router };
};
interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
  noSticky?: boolean;
}

const DefaultHeader: React.FunctionComponent<Props> = (props) => {
  const { noSticky } = props;
  return (
    <AppBar
      position={noSticky ? 'relative' : 'sticky'}
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: 'white',
        boxShadow: 'none',
        borderRadius: 0,
        borderBottom: `1px solid ${GREY_300}`,
      }}
    >
      <Row style={{ height: '100%', paddingRight: '16px' }}>
        <Row
          style={{
            marginLeft: '24px',
            transition: 'width 0.3s',
            justifyContent: 'center',
          }}
        >
          <Typography style={{ color: '#000', fontSize: '24px', fontWeight: 600 }}>
            <FormattedMessage id="ticketPro" />
          </Typography>
        </Row>
        <Row style={{ flex: 1, justifyContent: 'flex-end', marginRight: 24 }}>
          <Badge />
        </Row>
      </Row>
    </AppBar>
  );
};

export default connect(mapStateToProps)(DefaultHeader);
