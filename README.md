# Whoosh

## Project setup

```
npm install @adecrown/whoosh

or

yarn add @adecrown/whoosh
```

## Basic Usage

Inside your main.js file

```javascript
import Whoosh from "@adecrown/whoosh";
Vue.use(Whoosh);
```

then inside your App.vue file use Whoosh like this

```
<Whoosh/>
```

Whoosh can then be called anywhere like this

```javascript
this.$whoosh({
  status: "error",
  title: "Something went wrong",
  message: "We could not find the id"
});
```

### API

```javascript
this.$whoosh({
  // (optional) Notification status 'success,warn,error'
  // custom status can also be passed here
  status: "success",

  // (optional) Notification title
  title: "I am the title",

  // (optional) Notification message
  message: "I am the message",

  // (optional) This will override the default duration and the provided duration mains.js
  duration: 5,

  // (optional) This will override the size and the provided prop size
  size: {
    width: 400,
    height: 250
  }
});
```

### Props Table

All props below are optional.

| Name          | Type    | Default                | Description                                                            |
| ------------- | ------- | ---------------------- | ---------------------------------------------------------------------- |
| duration      | Number  | 5                      | how long you want the notification to stay on for (5 equals 5 seconds) |
| fill          | Boolean | false                  | fill the whole card with the status color                              |
| closeOnClick  | Boolean | false                  | notification will only close when it's clicked on                      |
| textColor     | String  | black                  | set the text color to what you prefer                                  |
| progressColor | String  | #dcd9d9                | set the progress color to what you prefer                              |
| size          | Object  | {width:500,height:210} | use it to set your prefered width and height                           |
