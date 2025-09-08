import React from 'react'
import CardGrid from './CardGrid'

const items = [
  {
    image:
      'https://images.unsplash.com/photo-1747697006653-569b3f418cf9?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Природа',
    description: 'Красивый пейзаж с горами и лесом',
  },
  {
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0',
    alt: 'Море',
    description: 'Спокойное море на закате',
  },
  {
    image:
      'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0',
    alt: 'Город',
    description: 'Вечерний городской пейзаж с огнями',
  },
  {
    image:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0',
    alt: 'Цветы',
    description: 'Яркие цветы в солнечном саду',
  },
]

const MainModalContent = () => {
  return (
    <main style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Галерея картинок
      </h1>
      <CardGrid items={items} />
    </main>
  )
}

export default MainModalContent
