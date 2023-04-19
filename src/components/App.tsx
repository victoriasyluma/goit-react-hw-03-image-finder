import { Component } from 'react';
import { TPixabayResult } from './App.types';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component<{}, TPixabayResult> {
  state: TPixabayResult = {
    hits: [],
    total: 0,
    totalHits: 0,
  };

  async componentDidMount() {
    const result: TPixabayResult = await fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=34819237-929003d04d64445866cd0fd69&image_type=photo&orientation=horizontal&per_page=12'
    ).then((response) => response.json());

    this.setState(result);
  }

  render() {
    const { hits } = this.state;

    return (
      <>
        <Searchbar onSubmit={onsubmit}></Searchbar>
        <ImageGallery hits={hits} />
      </>
    );
  }
}
