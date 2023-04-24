import { Component, FormEvent } from 'react';
import { TPixabayResult } from './App.types';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import styles from './App.module.scss';

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
    isLoading: false,
  };

  private filter: string = '';
  private cleaningSearchCriteria: boolean = false;

  componentDidUpdate = (_: {}, previousState: TAppState) => {
    const { state } = this;

    const didPageChanged = state.page !== previousState.page;

    // todo fix this
    if (didPageChanged || this.cleaningSearchCriteria) {
      this.loadPhotos();
    }
  };

  loadPhotos = async () => {
    this.cleaningSearchCriteria = false;

    const { filter } = this;
    const page = this.state.page;

    this.setState({
      isLoading: true,
    });

    const per_page = 12;
    const { hits, ...result }: TPixabayResult = await fetch(
      `https://pixabay.com/api/?q=${filter}&page=${page}&key=34819237-929003d04d64445866cd0fd69&image_type=photo&orientation=horizontal&per_page=${per_page}`
    ).then((response) => response.json());

    this.setState(({ hits: currentHits }) => {
      return {
        ...result,
        hits: [...currentHits, ...hits],
        isLoading: false,
      };
    });
  };

  /**
   * Performs a request asking for the images which match the filter
   */
  onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const filter = data.values().next().value as string;

    this.filter = filter.toLocaleLowerCase().trim();
    this.cleaningSearchCriteria = true;

    this.setState({
      hits: [],
      total: 0,
      totalHits: 0,
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState((state) => {
      return {
        page: state.page + 1,
      };
    });
  };

  render() {
    const { hits, total, isLoading } = this.state;
    const shouldDisplayLoadMore = ((!isLoading && hits?.length) ?? 0) < total;

    return (
      <div className={styles.container}>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        {isLoading && <Loader />}

        {!!hits?.length && <ImageGallery hits={hits} />}

        {shouldDisplayLoadMore && (
          <Button onClick={this.handleLoadMore}></Button>
        )}
      </div>
    );
  }
}
