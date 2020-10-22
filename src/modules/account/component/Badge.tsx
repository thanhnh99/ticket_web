import * as React from 'react';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
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
      <a target='_blank' href="/event/create">
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
      </a>
      <LanguageSelect />
      <UserInfoDropdown />
    </div>
  );
};

export default Badge;
