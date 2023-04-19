import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';
import { TPixabayHit } from '../App.types';

export class ImageGalleryItem extends Component<{ hit: TPixabayHit }> {
  render() {
    const { hit } = this.props;

    return (
      <li className={styles.gallery_items}>
        <img src={hit.webformatURL} alt={hit.tags} />
      </li>
    );
  }
}
