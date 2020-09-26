import * as React from 'react';
import LanguageSelect from '../../intl/components/LanguageSelect';
import UserInfoDropdown from './UserInfoDropdown';
import NotificationDropdown from './NotificationDropdown';

interface Props {}

// eslint-disable-next-line no-unused-vars
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
      <LanguageSelect />
      <NotificationDropdown />
      <UserInfoDropdown />
    </div>
  );
};

export default Badge;
