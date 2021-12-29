export default () => ({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b1ff',
    },
    secondary: {
      main: '#0082d1',
      transparent: 'rgba(0,130,209,0.2)',
    },
    background: {
      default: '#0a1929',
      paper: '#001e3c',
      header: '#071a2e',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#001e3c',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#00325a',
            minHeight: 24,
            border: '3px solid #001e3c',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
              {
                backgroundColor: '#00325a',
              },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
              {
                backgroundColor: '#00325a',
              },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              {
                backgroundColor: '#00325a',
              },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#00325a',
          },
          html: {
            WebkitFontSmoothing: 'auto',
          },
          a: {
            color: '#00b1ff',
          },
          'input:-webkit-autofill': {
            '-webkit-animation': 'autofill 0s forwards',
            animation: 'autofill 0s forwards',
            '-webkit-text-fill-color': '#ffffff !important',
            caretColor: 'transparent !important',
            '-webkit-box-shadow':
                '0 0 0 1000px rgba(4, 8, 17, 0.88) inset !important',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          },
          pre: {
            background: '#0059b2',
          },
          code: {
            background: '#0059b2',
          },
          '.react-mde': {
            border: '0 !important',
            borderBottom: '1px solid #b9bfc1 !important',
            '&:hover': {
              borderBottom: '2px solid #ffffff !important',
              marginBottom: '-1px !important',
            },
          },
          '.error .react-mde': {
            border: '0 !important',
            borderBottom: '2px solid #f44336 !important',
            marginBottom: '-1px !important',
            '&:hover': {
              border: '0 !important',
              borderBottom: '2px solid #f44336 !important',
              marginBottom: '-1px !important',
            },
          },
          '.mde-header': {
            border: '0 !important',
            backgroundColor: 'transparent !important',
            color: '#ffffff !important',
          },
          '.mde-header-item button': {
            color: '#ffffff !important',
          },
          '.mde-tabs button': {
            color: '#ffffff !important',
          },
          '.mde-textarea-wrapper textarea': {
            color: '#ffffff',
            backgroundColor: '#14262c',
          },
          '.react-grid-placeholder': {
            backgroundColor: 'rgba(0, 188, 212, 0.8) !important',
          },
          '.react_time_range__track': {
            backgroundColor: 'rgba(1, 226, 255, 0.1) !important',
            borderLeft: '1px solid #00bcd4 !important',
            borderRight: '1px solid #00bcd4 !important',
          },
          '.react_time_range__handle_marker': {
            backgroundColor: '#00bcd4 !important',
          },
        },
      },
    },
  },
});