import MemoriesPageShell from '@/components/MemoriesPageShell';
import foodData from '@/content/our-memories/food.json';
import loveWordsData from '@/content/our-memories/love-words.json';
import placesData from '@/content/our-memories/places.json';
import playlistData from '@/content/our-memories/playlist.json';
import { getLovePhotos } from '@/lib/photos';

export const metadata = {
  title: 'Memories · Through the Years',
  description: 'Places visited, things heard, and words of love — kept, year by year.',
};

export default function OurMemoriesPage() {
  const lovePhotos = getLovePhotos();
  return (
    <MemoriesPageShell
      foodData={foodData}
      loveWordsData={loveWordsData}
      placesData={placesData}
      playlistData={playlistData}
      lovePhotos={lovePhotos}
    />
  );
}
