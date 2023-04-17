import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* input masks */
import VueTheMask from 'vue-the-mask'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faArrowRightArrowLeft,
  faBars,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faClockRotateLeft, 
  faHome,
  faList,
  faMoneyBill,
  faPencil,
  faPlus,
  faRightFromBracket,
  faSuitcase,
  faTriangleExclamation,
  faUser,
  faUsers,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faArrowRightArrowLeft,
  faBars,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faClockRotateLeft,
  faHome,
  faList,
  faMoneyBill,
  faPencil,
  faPlus,
  faRightFromBracket,
  faSuitcase,
  faTriangleExclamation,
  faUser,
  faUsers,
  faXmark
)

const app = createApp(App);
app.use(router);
app.use(VueTheMask);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');