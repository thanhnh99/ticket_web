import { Button, ButtonBase, Collapse, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Link from '../../../modules/common/components/Link';
import { GREY_100, GREY_300, GREY_500 } from '../../../configs/colors';
import { HEADER_HEIGHT } from '../../../layout/constants';
import { AppState } from '../../../redux/reducers';
import { ReactComponent as IconChangePass } from '../../../svg/change_pass.svg';
import { ReactComponent as IconAvatar } from '../../../svg/ic_avatar.svg';
import { ReactComponent as IconLogout } from '../../../svg/logout.svg';
import { ReactComponent as IconProfile } from '../../../svg/profile.svg';
import { logout } from '../../auth/redux/authThunks';
import { Col } from '../../common/components/elements';
import { ROUTES } from '../../../configs/routes';

export const ButtonCS = withStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'flex-start',
    padding: '12px 16px',
    '&:hover': {
      background: GREY_300,
    },
  },
}))(ButtonBase);

const mapStateToProps = (state: AppState) => ({
  userData: state.account.userData,
});

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const UserInfoDropdown: React.FunctionComponent<Props> = (props) => {
  const { dispatch, userData } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log(userData)
  }, [])

  const onBlur = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget instanceof Element) {
      if (e.currentTarget.contains(e.relatedTarget as Element)) {
        return;
      }
    }

    setOpen(false);
  }, []);

  return (
    <>
      {userData && (
        <div
          tabIndex={-1}
          onBlur={onBlur}
          style={{
            outline: 'none',
          }}
        >
          <Button
            style={{
              color: 'inherit',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Col style={{ marginRight: '12px', textAlign: 'end' }}>
              <Typography variant="body2" color="textSecondary">
                <FormattedMessage id="hello" />,
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {userData?.accountDetailInfo?.name}
              </Typography>
            </Col>
            {userData.photo ? (
              <img
                style={{
                  borderRadius: '50%',
                  height: '40px',
                  width: '40px',
                  objectFit: 'cover',
                }}
                src={userData.photo}
                alt=""
              />
            ) : (
              <IconAvatar
                style={{
                  borderRadius: '50%',
                  height: '40px',
                  width: '40px',
                  objectFit: 'cover',
                }}
              />
            )}
            <ArrowDropDownIcon
              style={{
                transition: 'all 300ms',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                cursor: 'pointer',
                color: GREY_500,
              }}
            />
          </Button>

          <Collapse
            in={open}
            style={{
              position: 'absolute',
              width: '290px',
              color: 'black',
              zIndex: 110,
              top: HEADER_HEIGHT,
              right: '0px',
            }}
          >
            <Paper
              style={{
                overflow: 'hidden',
                width: '280px',
                padding: '8px 0px',
              }}
              variant="outlined"
            >
              <Typography variant="h6" style={{ margin: '12px 16px 0px' }}>
                <FormattedMessage id="setting" />
              </Typography>
              <Col>
                <Link to={{ pathname: ROUTES.accountInfo }}>
                  <ButtonCS>
                    <IconProfile style={{ marginRight: 14 }} />
                    <Typography variant="body2">
                      <FormattedMessage id="accountInfo" />
                    </Typography>
                  </ButtonCS>
                </Link>
                <ButtonCS>
                  <IconChangePass style={{ marginRight: 14 }} />
                  <Typography variant="body2">
                    <FormattedMessage id="auth.changePassword" />
                  </Typography>
                </ButtonCS>
                <ButtonCS
                  style={{ borderTop: `0.5px solid ${GREY_100}` }}
                  onClick={() => dispatch(logout())}
                >
                  <IconLogout style={{ marginRight: 14 }} />
                  <Typography variant="body2">
                    <FormattedMessage id="logout" />
                  </Typography>
                </ButtonCS>
              </Col>
            </Paper>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps)(UserInfoDropdown);
