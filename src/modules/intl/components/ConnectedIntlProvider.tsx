import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { some } from '../../../constants.js';
import { AppState } from '../../../redux/reducers.js';
import enMessages from '../en.json';
import viMessages from '../vi.json';

function getMessages(locale: string): some {
  if (locale.startsWith('vi')) {
    return viMessages;
  }
  return enMessages;
}

function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
    messages: getMessages(state.intl.locale),
  };
}

interface Props extends ReturnType<typeof mapStateToProps> {}

const ConnectedIntlProvider: React.FunctionComponent<Props> = (props) => {
  return <IntlProvider {...props} />;
};

export default connect(mapStateToProps)(ConnectedIntlProvider);
