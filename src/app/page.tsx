import MainLayout from '@/components/main'
import '@/styles/global/index.scss'
import HeaderLayout from '@/components/header'

export default function Home() {
  return (
    <div>
      <HeaderLayout />
      <MainLayout />
    </div>
  )
}
