import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {fade} from 'material-ui/utils/colorManipulator';
import {
    yellow700,
    cyan500,
    white,
    fullBlack,
    grey800,
    grey900,
    grey100,
    grey700,
    grey500,
    green500,
} from 'material-ui/styles/colors';

let theme = getMuiTheme({
  palette: {
    primary1Color: fade(grey800, 0.9),
    primary2Color: grey700,
    primary3Color: grey500,
    accent1Color: green500,
    accent2Color: grey900,
    accent3Color: grey500,
    textColor: white,
    alternateTextColor: grey100,
    canvasColor: fade(grey800, 0.9),
    borderColor: grey900,
    disabledColor: fade(white, 0.3),
    pickerHeaderColor: grey800,
    clockCircleColor: fade(white, 0.07),
    shadowColor: fullBlack,
    alert1Color: yellow700,
    secondary1Color: cyan500,
  },
});

theme.listItem.secondaryTextColor = '#777';

export default theme;
