import Vue from 'vue'
import {
  Carousel,
  CarouselItem,
  Rate,
  Menu,
  MenuItem,
  Cascader,
  Radio,
  RadioGroup,
  Table,
  Tabs,
  Breadcrumb, Form, Upload, MessageBox,Card
} from 'element-ui'

// 引入 element-ui
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Rate)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Cascader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Breadcrumb)
Vue.use(Form)
Vue.use(Upload)
Vue.use(Card)
Vue.component(MessageBox.name, MessageBox)
