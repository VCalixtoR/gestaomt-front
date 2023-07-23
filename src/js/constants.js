// theme colors
const DYNAMIC_CSS_COLORS = [
  { 'label': '--color-black1', 'value': 'rgb(0,0,0)' },
  { 'label': '--color-black2', 'value': 'rgb(54,52,52)' },
  { 'label': '--color-gray1', 'value': 'rgb(240,242,245)' },
  { 'label': '--color-gray2', 'value': 'rgb(203,203,203)' },
  { 'label': '--color-gray3', 'value': 'rgb(167,167,167)' },
  { 'label': '--color-pink1', 'value': 'rgb(255,245,244)' },
  { 'label': '--color-pink2', 'value': 'rgb(249,229,228)' },
  { 'label': '--color-pink3', 'value': 'rgb(241,170,167)' },
  { 'label': '--color-white', 'value': 'rgb(255,255,255)' },
  { 'label': '--color-black1-hover', 'value': 'rgba(0,0,0,0.5)' },
  { 'label': '--color-black2-hover', 'value': 'rgba(54,52,52,0.5)' },
  { 'label': '--color-gray1-hover', 'value': 'rgba(240,242,245,0.5)' },
  { 'label': '--color-gray2-hover', 'value': 'rgba(203,203,203,0.5)' },
  { 'label': '--color-gray3-hover', 'value': 'rgba(167,167,167,0.5)' },
  { 'label': '--color-pink1-hover', 'value': 'rgba(255,245,244,0.5)' },
  { 'label': '--color-pink2-hover', 'value': 'rgba(249,229,228,0.5)' },
  { 'label': '--color-pink3-hover', 'value': 'rgba(241,170,167,0.5)' },
  { 'label': '--color-white-hover', 'value': 'rgba(255,255,255,0.5)' }
];

// text sizes for big screens
const DYNAMIC_TEXT_SIZES_DESKTOP = [
  { 'label': '--text-page-title', 'value': '27px' },
  { 'label': '--text-title', 'value': '22px' },
  { 'label': '--text-normal', 'value': '18px' },
  { 'label': '--text-small', 'value': '15px'},
  { 'label': '--text-warn', 'value': '10px'}
];

// text sizes for small screens
const DYNAMIC_TEXT_SIZES_MOBILE = [
  { 'label': '--text-page-title', 'value': '29px' },
  { 'label': '--text-title', 'value': '24px' },
  { 'label': '--text-normal', 'value': '19px' },
  { 'label': '--text-small', 'value': '17px'},
  { 'label': '--text-warn', 'value': '11px'}
];

// do not change this, used in responsivity
const VIEWPORT_CHANGE_SIZE = 1200;

export default {
  DYNAMIC_CSS_COLORS,
  DYNAMIC_TEXT_SIZES_DESKTOP,
  DYNAMIC_TEXT_SIZES_MOBILE,
  VIEWPORT_CHANGE_SIZE
};