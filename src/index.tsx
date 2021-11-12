import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import colors from './assets/colors';
import {IntlProvider} from "react-intl";
import messages_en from "./translation/en.json";

import './translation/i18next';


const messages: any = {
  'en': messages_en
};

const language: string = navigator.language.split(/[-_]/)[0];


const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondaryBlue,

    },
  },
  typography: {
    fontFamily: [
      'Inter'
    ].join(','),
  }
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <IntlProvider locale={language} messages={messages[language]}>
          <App />
        </IntlProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
