// @flow
import ToastOptions, { DEFAULT_TIMEOUT_BEFORE_REMOVE, DEFAULT_SHOW_DURATION } from './optionsLib';
import { setClass } from './helper';
import styles from './index.scss';

import type { ToastActionType, ToastOptionsType } from './types';

export default class ToastMeClass {
  static getContainer(position): Element {
    const onBottom = position === 'bottom';
    const selector = `.${styles.container} ${onBottom ? `.${styles.bottom}` : ''}`;
    let node = document.querySelector(selector);
    if (!node) {
      node = document.createElement('div');
      node.classList.add(styles.container);
      if (onBottom) node.classList.add(styles.bottom);
      document.body.appendChild(node);
    }
    return node;
  }

  static removeAll(position) {
    const node = ToastMeClass.getContainer(position);
    const closeButtons = node.querySelectorAll(`.${styles.close}`);
    for (let i = 0, l = closeButtons.length; i < l; i += 1) {
      closeButtons[i].click();
    }
  }

  /**
   * @param content {String} - text to show
   * @param receivedOptions {Object} - options object
   * @param action {Object} - actions object
   */
  constructor(
    content: string,
    receivedOptions?: null | ToastOptionsType | 'error' | 'notify' = 'notify',
    action?: ToastActionType,
  ) {
    let options = { ...ToastOptions.default };
    if (typeof receivedOptions === 'string' && ToastOptions[receivedOptions]) {
      options = { ...options, ...ToastOptions[receivedOptions] };
    } else if (typeof receivedOptions === 'object') {
      options = { ...options, ...receivedOptions };
    }

    ToastMeClass.removeAll(options.position);

    this.options = options;
    this.content = content;
    this.domNode = this.createToastNode.call(this, action);
    ToastMeClass
      .getContainer(options.position)
      .appendChild(this.domNode);
    this.startTimer();
  }

  options: ToastOptionsType;

  content: string;

  domNode: Element;

  createToastNode(action?: ToastActionType) {
    const node = document.createElement('div');
    setClass(node, styles.toast);

    const messageNode = document.createElement('div');
    setClass(messageNode, styles.message);
    messageNode.textContent = this.content;
    node.appendChild(messageNode);
    node.title = this.content;

    if (this.options && this.options.toastClass) {
      setClass(node, this.options.toastClass);
    }

    if (this.options && this.options.position === 'bottom') {
      setClass(node, styles.toastBottom);
    }

    if (action) {
      const actionNode = document.createElement('button');
      setClass(actionNode, styles.action);
      setClass(actionNode, styles.button);
      if (action.class) {
        setClass(actionNode, action.class);
      }
      actionNode.textContent = action.label;
      actionNode.addEventListener('click', () => {
        action.action();
        this.close();
      });
      actionNode.title = action.label;
      node.appendChild(actionNode);
    }

    const closeNode = document.createElement('button');
    setClass(closeNode, styles.close);
    setClass(closeNode, styles.button);
    if (this.options && !this.options.closeable) {
      setClass(closeNode, styles.hidden);
    }
    closeNode.title = 'Close';
    closeNode.addEventListener('click', () => this.close());
    node.appendChild(closeNode);

    node.addEventListener('mouseenter', () => this.stopTimer());
    node.addEventListener('mouseleave', () => this.startTimer());

    return node;
  }

  close() {
    this.stopTimer();
    if (!this.domNode) return;

    setClass(this.domNode, styles.remove);
    if (this.options.removedToastClass) {
      setClass(this.domNode, this.options.removedToastClass);
    }

    setTimeout(
      () => { this.domNode.remove(); },
      this.options.timeoutOnRemove || DEFAULT_TIMEOUT_BEFORE_REMOVE,
    );
  }

  startTimer() {
    this.stopTimer();
    this.timerShow = setTimeout(
      () => this.close(),
      this.options.duration || DEFAULT_SHOW_DURATION,
    );
  }

  stopTimer() {
    clearTimeout(this.timerShow);
  }
}

export { ToastOptions };