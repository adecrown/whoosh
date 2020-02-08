import Vue from 'vue'
import ButtonField from './ButtonField'
import Whoosh from './Whoosh'

const myWhoosh = new (Vue.extend(Whoosh));

export default function install (Vue) {
        Vue.component('ButtonField',ButtonField)

        //Vue.prototype.$whoosh = (name, age) => info(name, age)

        Vue.prototype.$whoosh = {
          success(message){
            myWhoosh.success(message)
          },
          error(message){
            myWhoosh.success(message)
          }
        }
    
  }

  export {
    ButtonField
  }