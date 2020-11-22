import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LanguageSelect from '../../intl/components/LanguageSelect';
import UserInfoDropdown from './UserInfoDropdown';
import LoadingButton from '../../common/components/LoadingButton';

interface Props {}

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
      <LanguageSelect />
      <UserInfoDropdown />
    </div>
  );
};

export default Badge;
