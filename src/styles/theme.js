import { createTheme } from "@material-ui/core/styles";

// customized theme for material-ui

const theme = createTheme({
  palette: {
    primary: {
      main: '#2699FB',
      inherit: '#fff',
      contrastText: '#fff',
    },
    background: {
      default: '#efefef'
    },
  }, 
  typography: {
    button: {
      textTransform: 'none',
    },
    h1: {
      color: '#2699FB'
    }, 
    h2: {
      color: '#2699FB'
    }, 
    h3: {
      color: '#2699FB'
    }, 
    h4: {
      color: '#2699FB'
    }, 
    h5: {
      color: '#fff',
    },
    subtitle1: {
      color: '#7f7f7f'
    },
    subtitle2: {
      color: '#fff',
    },
    body2: {
      color: '#2699FB',
    }
  },
  
});

export default theme;