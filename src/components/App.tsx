import { Component } from 'react';
import { TPixabayResult } from './App.types';

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
      <ul>
        {hits.map((hit) => (
          <li key={hit.id}>
            <img style={{ height: '100px' }} src={hit.largeImageURL} />
          </li>
        ))}
      </ul>
    );
  }
}
