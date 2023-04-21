import { Component } from 'react';

import styles from './ImageGalleryItem.module.scss';
import { TPixabayHit } from '../App.types';
import { Modal } from '../Modal/Modal';

type TImageGalleryItemState = {
  isModalOpen: boolean;
};

export class ImageGalleryItem extends Component<
  {
    hit: TPixabayHit;
  },
  TImageGalleryItemState
> {
  state: TImageGalleryItemState = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const { hit } = this.props;

    return (
      <li className={styles.gallery_items}>
        <button onClick={this.openModal}>
          <img src={hit.webformatURL} alt={hit.tags} />
        </button>

        {isModalOpen && <Modal hit={hit} closeModal={this.closeModal} />}
      </li>
    );
  }
}
