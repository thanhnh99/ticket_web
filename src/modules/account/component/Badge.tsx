import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LanguageSelect from '../../intl/components/LanguageSelect';
import UserInfoDropdown from './UserInfoDropdown';
import LoadingButton from '../../common/components/LoadingButton';
import Link from '../../../modules/common/components/Link';
import { ROUTES } from '../../../configs/routes';

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
<<<<<<< HEAD
      <Link target='_blank' to="/event/create" style={{textDecoration: 'none'}}>
=======
      <a target='_blank' href="/event/create">
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
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
<<<<<<< HEAD
      </Link>
=======
      </a>
>>>>>>> dd35f1f23f605a2bbb4ceac5889ccdcd2b1d096d
      <LanguageSelect />
      <UserInfoDropdown />
    </div>
  );
};

export default Badge;
