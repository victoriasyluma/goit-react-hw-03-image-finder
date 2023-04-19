export type TPixabayHit = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
};

export type TPixabayResult = {
  hits: TPixabayHit[];
  total: number;
  totalHits: number;
  page: number;
};
