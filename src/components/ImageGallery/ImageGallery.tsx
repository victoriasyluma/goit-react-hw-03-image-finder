import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.scss';
import { TPixabayHit } from '../App.types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component<{ hits: TPixabayHit[] }> {
  render() {
    const { hits } = this.props;

    return (
      <ul className={styles.gallery}>
        {hits.map((hit) => (
          <ImageGalleryItem key={hit.id} hit={hit} />
        ))}
      </ul>
    );
  }
}
