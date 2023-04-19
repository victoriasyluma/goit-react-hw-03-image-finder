import { Component, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export class Button extends Component<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> {
  render() {
    const { onClick } = this.props;

    return (
      <button onClick={onClick} className={styles.button}>
        Load more
      </button>
    );
  }
}
