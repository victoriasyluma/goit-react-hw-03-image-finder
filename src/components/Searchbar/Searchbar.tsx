import { Component, FormEvent } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.scss';
import { BiSearch } from 'react-icons/bi';

export class Searchbar extends Component<{
  onSubmit: (event: FormEvent) => void;
}> {
  render() {
    const { onSubmit } = this.props;

    return (
      <header className={styles.searchbar}>
        <form onSubmit={onSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            <span className={styles.button_label}></span>
            <BiSearch fontSize={24} />
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="filter"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
