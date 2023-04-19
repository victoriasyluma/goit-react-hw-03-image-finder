import { Component, FormEvent, MouseEventHandler } from 'react';
import { TPixabayResult } from './App.types';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { object } from 'prop-types';

export class App extends Component<{}, TPixabayResult> {
  state: TPixabayResult = {
    hits: [],
    total: 0,
    totalHits: 0,
    page: 1,
  };

  componentDidMount() {
    this.filterPhotos();
  }

  filterPhotos = async (filter: string = '') => {
    const filterSanitized = filter.toLocaleLowerCase().trim();

    const result: TPixabayResult = await fetch(
      `https://pixabay.com/api/?q=${filterSanitized}&page=1&key=34819237-929003d04d64445866cd0fd69&image_type=photo&orientation=horizontal&per_page=12`
    ).then((response) => response.json());

    this.setState({
      ...result,
      page: 1,
    });
  };

  /**
   * Performs a request asking for the images which match the filter
   */
  onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const filter = data.values().next().value as string;

    this.filterPhotos(filter);
  };

  drawBatchOfHits = () => {};

  onClick: MouseEventHandler<HTMLButtonElement> = (event) => {};

  render() {
    const { hits } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        <ImageGallery hits={hits} />
        <Button onClick={this.onClick}></Button>
      </>
    );
  }
}
