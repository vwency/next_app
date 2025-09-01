import MainLayout from '@/components/main';
import MainMenu from '../components/header/menu/menu';
import '@/styles/global/index.scss'

export default function Home() {
  return (
    <div>
      <MainMenu />
      <MainLayout />
    </div>
  );
}
