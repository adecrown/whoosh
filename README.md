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

  // (optional) This will override the default duration and the provided prop duration
  duration: 5,

  // (optional) This will override the default size and the provided prop size
  size: {
    width: 400,
    height: 250
  }

  // (optional) Provide a callback function that gets called when the notification closes
  onClose: () =>{}

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
| messageStyle  | Object  |                        | give a custom style to the message section                             |
| titleStyle    | Object  |                        | give a custom style to the title section                               |
|display| left or right | right| controls which side the notification should come out from |

#### Custom Status

If the default status (success, error, warn) are not enough or not to your taste, you can create your own custom statuses which is an array of objects status and each object requires a name and color.

Inside your main.js file add the options parameter like below.

```javascript
import Whoosh from "@adecrown/whoosh";
Vue.use(Whoosh, {
  statuses: [
    {
      name: "Testing",
      color: "red"
    },
    {
      name: "Testing 3",
      color: "green"
    }
  ]
});
```

Use Whoosh as normal to call your custom status

```javascript
this.$whoosh({
  status: "Testing",
  title: "This is my custom status",
  message: "Hello Testing"
});
```

The defualt statuses are still available along with your custom ones but you can also override the color of the default statuses by adding it to the statuses array

```javascript
  {
    name: 'error',
    color: 'black'
  }
```
