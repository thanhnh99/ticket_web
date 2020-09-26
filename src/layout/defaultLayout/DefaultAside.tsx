import { ButtonBase, withStyles } from '@material-ui/core';
import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { PURPLE_300 } from '../../configs/colors';
import { ROUTES_TAB } from '../../configs/routes';
import { RoutesTabType } from '../../models/permission';
import { AppState } from '../../redux/reducers';
import { ReactComponent as IconMenu } from '../../svg/ic_menu.svg';
import { ReactComponent as BackMenuArrowIcon } from '../../svg/ic_menu_back_arrow.svg';
import { ASIDE_ITEM_HEIGHT, ASIDE_MIN_WIDTH, ASIDE_WIDTH, HEADER_HEIGHT } from '../constants';
import { getListRoutesContain } from '../utils';
import DefaultAsideItems from './DefaultAsideItems';
import 'react-perfect-scrollbar/dist/css/styles.css';


export const ButtonRow = withStyles(() => ({
  root: {
    '&:hover': {
      background: PURPLE_300,
    },
    height: ASIDE_ITEM_HEIGHT,
    paddingRight: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    minWidth: ASIDE_WIDTH,
    textAlign: 'start',
  },
}))(ButtonBase);

const mapStateToProps = (state: AppState) => {
  return { router: state.router, userData: state.account.userData };
};
interface Props extends ReturnType<typeof mapStateToProps> {
  open: boolean;
  onClose(): void;
}

const DefaultAside: React.FunctionComponent<Props> = (props) => {
  const { router, open, onClose, userData } = props;
  const { pathname } = router.location;
  const [hoverOpen, setOpen] = React.useState(false);

  const getListRouterActive = React.useMemo(() => {
    return getListRoutesContain(ROUTES_TAB, router.location.pathname);
  }, [router.location.pathname]);

  return (
    <>
      <div
        style={{
          minWidth: open ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
          transition: 'all 0.3s',
        }}
      />
      <div
        style={{
          width: open || hoverOpen ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
          overflow: 'hidden',
          height: 'calc(100vh)',
          transition: 'width 0.3s',
          position: 'fixed',
          left: 0,
          flexShrink: 0,
          // background: PRIMARY
          background: 'linear-gradient(174deg, rgba(89,56,148,1) 0%, rgba(199,179,217,1) 100%)',
          zIndex: 1200,
        }}
      >
        <ButtonRow
          style={{
            justifyContent: open || hoverOpen ? 'flex-end' : 'center',
            padding: open || hoverOpen ? '0px 20px' : 0,
            height: HEADER_HEIGHT,
            minWidth: open || hoverOpen ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
          }}
          onClick={onClose}
        >
          {open || hoverOpen ? (
            <BackMenuArrowIcon />
          ) : (
            <IconMenu className="svgFillAll" style={{ stroke: 'white', width: 24, height: 24 }} />
          )}
        </ButtonRow>
        <PerfectScrollbar
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => setOpen(false)}
        >
          <div
            style={{
              height: `calc(100%-64px)`,
              marginBottom: 148,
            }}
          >
            {
              ROUTES_TAB.map((v: RoutesTabType, index: number) => (
                <DefaultAsideItems
                  key={index}
                  userData={userData}
                  open={open || hoverOpen}
                  data={v}
                  pathname={pathname}
                  listRouterActive={getListRouterActive}
                />
              ))}
          </div>
        </PerfectScrollbar>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(DefaultAside);
