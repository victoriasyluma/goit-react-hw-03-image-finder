import styles from './Modal.module.scss';
import { Component } from 'react';
import { TPixabayHit } from '../App.types';

export class Modal extends Component<{
  hit: TPixabayHit;
  closeModal: () => void;
}> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.hit;

    return (
      <div className={styles.overlay} onClick={this.handleOverlayClick}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
