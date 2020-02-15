import ButtonField from './ButtonField'
import Whoosh from './Whoosh/Whoosh'
import {
  events
} from './Whoosh/events'
import {isCustomStatusesDefined} from './Whoosh/Util'

const WhooshOn = {
  install(Vue, args = {}) {
    this.params = args

    Vue.component('ButtonField', ButtonField)
    Vue.component('Whoosh', Whoosh)


    Vue.prototype.$whoosh = (params) => {
      isCustomStatusesDefined(args.statuses) ? params.statuses = args.statuses : null;
      args.size && (args.size.width || args.size.height) ? params.generalSize = args.size : null;
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