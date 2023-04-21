import { Component, FormEvent, MouseEventHandler } from 'react';
import { TPixabayResult } from './App.types';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';

type TAppState = TPixabayResult & {
  page: number;
  isLoading: boolean;
};

export class App extends Component<{}, TAppState> {
  state: TAppState = {
    hits: [],
    total: 0,
    totalHits: 0,
    page: 0,
    isLoading: true,
  };

  private filter: string = '';

  componentDidMount() {
    this.loadPhotos({
      currentPage: 0,
    });
  }

  loadPhotos = async ({ currentPage }: { currentPage: number }) => {
    const { filter } = this;
    const nextPage = currentPage + 1;

    this.setState({
      isLoading: true,
    });

    const { hits, ...result }: TPixabayResult = await fetch(
      `https://pixabay.com/api/?q=${filter}&page=${nextPage}&key=34819237-929003d04d64445866cd0fd69&image_type=photo&orientation=horizontal&per_page=12`
    ).then((response) => response.json());

    this.setState(({ hits: currentHits }) => ({
      ...result,
      hits: [...currentHits, ...hits],
      page: nextPage,
      isLoading: false,
    }));
  };

  /**
   * Performs a request asking for the images which match the filter
   */
  onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const filter = data.values().next().value as string;

    this.filter = filter.toLocaleLowerCase().trim();

    this.setState({
      hits: [],
      total: 0,
      totalHits: 0,
      page: 0,
    });

    this.loadPhotos({ currentPage: 0 });
  };

  drawBatchOfHits = () => {};

  onClick: MouseEventHandler<HTMLButtonElement> = (event) => {};

  handleLoadMore = () => {
    const { page: currentPage } = this.state;

    this.loadPhotos({ currentPage });
  };

  render() {
    const { hits, total, isLoading } = this.state;
    const shouldDisplayLoadMore = !isLoading && hits.length < total;

    return (
      <div style={{ marginBottom: '200px' }}>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>

        <ImageGallery hits={hits} />

        {shouldDisplayLoadMore && (
          <Button onClick={this.handleLoadMore}></Button>
        )}
      </div>
    );
  }
}
