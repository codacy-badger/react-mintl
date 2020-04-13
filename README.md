# react-mintl 🌿

Yeah, this is another i18n library. But this one is easier to use and it's already set up. Just install, `init()` it with your .json files and there you go! 🎉

> Please note that react-mintl is still in early stages of development. We don't recommend using it in production apps.

## Quick-start 🎯

There are three main steps to get your app up and running. The first one is to install the react-mintl library. Run the following command in your command line.

`npm install react-mintl`

Now, in your src/index.js file, import the library and `init()` with your configurations preferences. Actually, you don't need to configure anything but your language resources/files. The library will handle everything else to get your app operating.

> The languages files must be JS objects or JSON files. If you're using JS objects, you can write them directly into the function.

```js
// src/index.js

import ReactDOM from 'react-dom';
import Mintl from 'react-mintl';
import App from './App.jsx';
import jp from './translations/japanese.json';
import kr from './translations/korean.json';
import es from './translations/spanish.json';

Mintl.init({
  resources: {
    // ...your languages here!
    pt: {
      hello: 'Olá'
    },
    en: {
      hello: 'Hello'
    },
    jp,
    kr,
    es
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

```

But how should you format your languages files? We don't support namespaces or nested objects yet, so they should and must be only the key and its translation, being the object name the language it's representing.

After initializing the library, it'll set the current language automatically by searching the user's browser configuration.

Now the fun part begins. We currently have two ways to translate a key into a string. If you're using a functional component, we highly recommend you to use the `useMintl()` hooks. Check below its implementation:

```js
import React from 'react';
import { useMintl } from 'react-mintl';

const Title = () => {
  const [t, changeLang] = useMintl();
  
  return (
    <h1>{ t('hello') }</h2>
  );
};

export default Title;
```

If you're not using a functional component, you need to import the react-mintl library and use its `t` function. 

```js
import React from 'react';
import Mintl from 'react-mintl';

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>{ Mintl.t('hello') }</h1>
    )
  }
}

export default Title;
```

And that's all you need to know to get started with react-mintl.

## To-do 📃

We have so many things planned! Here are our list of planned future features.

- [ ] CLI tool. 
- [ ] Namespaces support.
- [ ] HOCs.
- [ ] Currency and number formatter (it's under way and will be released soon!).

## Contributors 💻

- Pedro Henrique Windisch - _concept, idea and design_ - [GitHub](https://github.com/pedrowindisch)