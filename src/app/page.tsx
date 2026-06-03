import HomePageShell from '@/components/HomePageShell';
import { getAllPhotoSrcs, getPhuQuyPhotos } from '@/lib/photos';

export default function HomePage() {
  const allPhotos    = getAllPhotoSrcs();
  const phuQuyPhotos = getPhuQuyPhotos();

  return <HomePageShell allPhotos={allPhotos} phuQuyPhotos={phuQuyPhotos} />;
}
