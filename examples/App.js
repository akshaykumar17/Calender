import React from 'react';
import Api from './Api';
import Intro from './Intro.md';
import cn from 'classnames';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { fromJS } from 'immutable';

import localizer from 'react-big-calendar/lib/localizers/globalize';
import globalize from 'globalize';

localizer(globalize);

import Basic from './demos/basic';
import reducer from './reducer';
import 'react-big-calendar/lib/less/styles.less';
import './styles.less';
import './prism.less';

let demoRoot = 'https://github.com/intljusticemission/react-big-calendar/tree/master/examples/demos'

const Example = React.createClass({
  getInitialState() {
    return {
      selected: 'basic'
    };
  },

  render() {
    let selected = this.state.selected;
    return (
      <div className='app'>
        <div className='example'>
          <Basic className='demo' />
        </div>
      </div>
    );
  },

  select(selected, e) {
    e.preventDefault();
    this.setState({ selected })
  }
});


const initialState = {
  events:
  [
    {
      'title': "balvikas",
      'start': new Date(2017, 0, 0, 0, 0, 0),
      'end': new Date(2017, 0, 7, 0, 0, 0),
      'color': '#d66757'
    },
    {
      'title': "swach bharat",
      'start': new Date(2017, 1, 1, 0, 0, 0),
      'end': new Date(2017, 2, 30, 0, 0, 0),
      'color': '#3b6f48'
    },
    {
      'title': "beti bachao",
      'start': new Date(2017, 1, 4, 0, 0, 0),
      'end': new Date(2017, 2, 7, 0, 0, 0),
      'color': 'orange'
    }
  ]
};


const store = createStore(
  reducer,
  initialState
);

render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('root')
);
