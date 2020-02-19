import Vue, { VueConstructor } from "vue";
import {CardContent} from '../types/index'
declare module "vue/types/vue" {
  interface Vue {
    $whoosh: CardContent;
  }

  interface VueConstructor {
    $whoosh: CardContent;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    $whoosh?: CardContent;
  }
}
