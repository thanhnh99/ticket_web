import RemoveIcon from '@material-ui/icons/Remove';
import React from 'react';
import { WHITE } from '../../configs/colors';
import { ServiceType } from '../../models/permission';
import '../../scss/svg.scss';
import { ReactComponent as HomeIcon } from '../../svg/ic_home.svg';

interface Item {
  name: ServiceType | string;
  icon: any;
}
export const getMenuIcon = (name: ServiceType | string) => {
  switch (name) {
    case 'home':
      return <HomeIcon style={{ width: 32, height: 32 }} />;
    default:
      return <RemoveIcon style={{ color: WHITE, width: 12, marginLeft: 20 }} />;
  }
};

interface Props {
  name: string;
  // eslint-disable-next-line react/no-unused-prop-types
  open: boolean;
}

const DefaultAsideItemsIcon: React.FC<Props> = (props: Props) => {
  const { name } = props;
  const getIcon = React.useMemo(() => {
    return getMenuIcon(name);
  }, [name]);

  return <>{getIcon}</>;
};

export default DefaultAsideItemsIcon;
