import RemoveIcon from '@material-ui/icons/Remove';
import React from 'react';
import { WHITE } from '../../configs/colors';
import { ServiceType } from '../../models/permission';
import '../../scss/svg.scss';
import { ReactComponent as AdminApprovingCorporateAccountIcon } from '../../svg/menu/ic_adminApprovingCorporateAccount.svg';
import { ReactComponent as AdminCorporateManagementIcon } from '../../svg/menu/ic_adminCorporateManagement.svg';
import { ReactComponent as GeneralSettingIcon } from '../../svg/menu/ic_generalSetting.svg';
import { ReactComponent as InvoicesIcon } from '../../svg/menu/ic_invoices.svg';
import { ReactComponent as Report } from '../../svg/menu/ic_report.svg';
import { ReactComponent as TransactionsIcon } from '../../svg/menu/ic_transactions.svg';
import { ReactComponent as TripManagementIcon } from '../../svg/menu/ic_tripManagement.svg';

interface Item {
  name: ServiceType | string;
  icon: any;
}
export const getMenuIcon = (name: ServiceType | string) => {
  switch (name) {
    case 'generalSetting':
      return <GeneralSettingIcon style={{ width: 32, height: 32 }} />;
    case 'invoices':
      return <InvoicesIcon style={{ width: 32, height: 32 }} />;
    case 'transactions':
      return <TransactionsIcon style={{ width: 32, height: 32 }} />;
    case 'admin.corporate':
      return <AdminCorporateManagementIcon style={{ width: 32, height: 32 }} />;
    case 'admin.approval':
      return <AdminApprovingCorporateAccountIcon style={{ width: 32, height: 32 }} />;
    case 'report':
      return <Report style={{ width: 32, height: 32 }} />;
    case 'tripManagement':
      return <TripManagementIcon style={{ width: 32, height: 32 }} />;
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
