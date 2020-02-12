//import Vue from 'vue'
import ButtonField from './ButtonField'
import Whoosh from './Whoosh/Whoosh'
import {
  events
} from './Whoosh/events'
//const myWhoosh = new(Vue.extend(Whoosh));

const WhooshOn = {
  install(Vue, args = {}) {
    console.log('Installed')
    this.params = args

    Vue.component('ButtonField', ButtonField)
    Vue.component('Whoosh', Whoosh)


    Vue.prototype.$whoosh = (params) => {
      events.$emit('startWhoosh', params)
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WhooshOn)
}

export default WhooshOn
export {
  ButtonField,
  Whoosh
}