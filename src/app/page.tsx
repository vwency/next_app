import MainLayout from '@/components/main';
import MainMenu from '../components/header/main_menu/menu';
import '@/styles/main/index.scss'

export default function Home() {
  return (
    <div>
      <MainMenu />
      <MainLayout />
    </div>
  );
}
