import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.scss';

export class Button extends Component {
  render() {
    return <button className={styles.button}>Load more</button>;
  }
}
