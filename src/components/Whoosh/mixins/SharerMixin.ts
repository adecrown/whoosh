import { Component, Prop, Vue } from "vue-property-decorator";
import { CardContent,expandData,SpaceController } from "../../types/index";

@Component
export default class SharerMixin extends Vue {
  @Prop({ type: Boolean, required: false }) public fill!: boolean;
  @Prop({ type: Object, required: false }) public expandable!: expandData;
  @Prop({ type: String, required: false }) public textColor!: string;
  @Prop({ type: Object, required: false }) public messageStyle!: object;
  @Prop({ type: Object, required: false }) public titleStyle!: object;
  @Prop({ type: Object, required: false }) public size!: CardContent["size"];
  @Prop({ type: String, required: false }) public mobileDisplay!: string;
  @Prop({ type: Array, required: false }) public list!: Array<CardContent>;
  @Prop({ type: Object, required: false }) public content!: CardContent;
  @Prop({ type: Number, required: false }) public masterDuration!: number;
  @Prop({ type: Boolean, required: false }) public closeOnClick!: boolean;
  @Prop({ type: String, required: false }) public progressColor!: string;
  @Prop({ type: Array, required: false }) public space!: Array<SpaceController>;
  @Prop({ type: Boolean, required: false, default: false }) public isMobile!: boolean;
  @Prop({ type: Number, default: 0 }) public position!: number;
  @Prop({
    type: String,
    required: false,
    validator: value => {
      return value === "right" || value === "left";
    }
  })
  public display!: "right" | "left";
    @Prop({
    type: String,
    required: false,
    default: "default",
    validator: value => {
      return value === "default" || value === "launch";
    }
  })
    public skin!: "default" | "launch";
 

}


