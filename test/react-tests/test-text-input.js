/**
 * MUI test react textinput library
 * @module test/react-tests/test-textinput
 */

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';

import TextInput from '../../src/react/text-input';
import TextareaInput from '../../src/react/textarea-input';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/text-input', function() {
  let errFn;


  before(function() {
    errFn = console.error;
    console.error = function(msg) {throw Error(msg);};
  });
  
  
  after(function() {
    console.error = errFn;
  });


  it('renders wrapper properly', function() {
    let instance = ReactUtils.renderIntoDocument(<TextInput></TextInput>);
    let wrapperEl = ReactDOM.findDOMNode(instance);

    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(wrapperEl.className, 'mui-textfield');
  });

  
  it('renders native input element', function() {
    let elem = <TextInput defaultValue="my input"></TextInput>;
    let instance = ReactUtils.renderIntoDocument(elem);
    let inputEl = ReactUtils
      .findRenderedDOMComponentWithTag(instance, 'input');

    assert.equal(inputEl.value, 'my input');
  });

  
  it('adds dirty class on focus', function() {
    let instance = ReactUtils.renderIntoDocument(<TextInput></TextInput>);
    let inputEl = ReactUtils
      .findRenderedDOMComponentWithTag(instance, 'input');
    
    // starts with empty class
    assert.equal(inputEl.className, 'mui--is-empty');

    // adds dirty class on focus
    ReactUtils.Simulate.focus(inputEl);
    assert.equal(/mui--is-dirty/.test(inputEl.className), true);
    assert.equal(/mui--is-empty/.test(inputEl.className), true);
    assert.equal(/mui--is-not-empty/.test(inputEl.className), false);

    // modify input
    ReactUtils.Simulate.change(inputEl);
  });

  
  it('does controlled component validation', function() {
    // raises error when `value` defined and `onChange missing
    assert.throws(
      function() {
        let elem = <TextInput value="my value"></TextInput>;
        let instance = ReactUtils.renderIntoDocument(elem);
      },
      /MUI Warning/
    );
  });


  it('can be used as controlled component', function() {
    var TestApp = React.createClass({
      getInitialState: function() {
        return {value: this.props.value};
      },
      onChange: function(ev) {
        this.setState({value: ev.target.value});
      },
      render: function() {
        return (
          <TextInput
            value={this.state.value}
            defaultValue="ignored value"
            onChange={this.onChange}
          />
        );
      }
    });
    
    let elem = <TestApp value="test" />;
    let instance = ReactUtils.renderIntoDocument(elem);
    let findComponent = ReactUtils.findRenderedDOMComponentWithTag;
    let inputEl = findComponent(instance, 'input');

    // check default value
    assert.equal(inputEl.value, 'test');

    // update TestApp and check inputEl value
    instance.setState({value: 'test2'});
    assert.equal(inputEl.value, 'test2');

    // update inputEl and check state
    inputEl.value = 'test3';
    ReactUtils.Simulate.change(inputEl);
    assert.equal(instance.state.value, 'test3');
  });
});


describe('react/textarea-input', function() {
  // capture console error messages
  let errFn, elem;


  before(function() {
    errFn = console.error;
    console.error = function(msg) {throw Error(msg);};
  });
  
  
  after(function() {
    console.error = errFn;
  });


  beforeEach(function() {
    elem = <TextareaInput defaultValue="my input"></TextareaInput>;
  });


  it('renders wrapper properly', function() {
    let instance = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = ReactDOM.findDOMNode(instance);

    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(wrapperEl.className, 'mui-textfield');
  });  


  it('renders native textarea element', function() {
    let instance = ReactUtils.renderIntoDocument(elem);

    let fn = ReactUtils.findRenderedDOMComponentWithTag;
    let textareaEl = fn(instance, 'textarea');

    assert.equal(textareaEl.textContent, 'my input');
  });


  it('does controlled component validation', function() {
    // raises error when `value` defined and `onChange missing
    assert.throws(
      function() {
        let elem = <TextareaInput value="my value"></TextareaInput>;
        let instance = ReactUtils.renderIntoDocument(elem);
      },
      /MUI Warning/
    );
  });


  it('can be used as controlled component', function() {
    var TestApp = React.createClass({
      getInitialState: function() {
        return {value: this.props.value};
      },
      onChange: function(ev) {
        this.setState({value: ev.target.value});
      },
      render: function() {
        return (
          <TextareaInput
            value={this.state.value}
            defaultValue="ignored value"
            onChange={this.onChange}
          />
        );
      }
    });
    
    let elem = <TestApp value="test" />;
    let instance = ReactUtils.renderIntoDocument(elem);
    let findComponent = ReactUtils.findRenderedDOMComponentWithTag;
    let inputEl = findComponent(instance, 'textarea');

    // check default value
    assert.equal(inputEl.value, 'test');

    // update TestApp and check inputEl value
    instance.setState({value: 'test2'});
    assert.equal(inputEl.value, 'test2');

    // update inputEl and check state
    inputEl.value = 'test3';
    ReactUtils.Simulate.change(inputEl);
    assert.equal(instance.state.value, 'test3');
  });
});
