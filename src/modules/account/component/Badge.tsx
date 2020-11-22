import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LanguageSelect from '../../intl/components/LanguageSelect';
import UserInfoDropdown from './UserInfoDropdown';
import LoadingButton from '../../common/components/LoadingButton';

interface Props { }

const Badge: React.FunctionComponent<Props> = (props) => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        flexShrink: 0,
        flexGrow: 1,
        position: 'relative',
      }}
    >
      <Link target='_blank' to="/event/create" style={{textDecoration: 'none'}}>
        <LoadingButton
          style={{ minWidth: 160, marginRight: 16 }}
          size="large"
          type="submit"
          variant="outlined"
          color="secondary"
          disableElevation
        >
          <FormattedMessage id="createEvent" />
        </LoadingButton>
      </Link>
      <LanguageSelect />
      <UserInfoDropdown />
    </div>
  );
};

export default Badge;
