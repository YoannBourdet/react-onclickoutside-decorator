/*
 * OnClickOutSide Decorator
 */
'use strict';

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import errors from './errors';

export default (WrappedComponent) => (
  class onClickOutside extends Component {
    componentDidMount() {
      window.addEventListener(
        'mousedown',
        this.handleClickOutside.bind(this)
      );
    }

    componentWillUnmount() {
      window.removeEventListener(
        'mousedown',
        this.handleClickOutside.bind(this)
      );
    }

    /* Get wrapped Component Reference */
    getWCR() {
      return this.refs.wcr;
    }

    /*
     * Handle the 'click outside' event.
     * Get the ref of the wrapped component and
     * call this handleClickOutside() function.
     */
    handleClickOutside(e) {
      e.stopPropagation();

      const ref = this.getWCR();

      if (typeof ref.handleClickOutside !== 'function') {
        throw new Error(errors.notFunction);
      }

      const component = findDOMNode(ref);

      if (component && !component.contains(e.target)) {
        ref.handleClickOutside();
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} ref="wcr"/>
      );
    }
  }
);
