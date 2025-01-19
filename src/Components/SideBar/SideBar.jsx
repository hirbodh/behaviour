import React,{useState, useEffect} from 'react'
import './SideBarStyle.css'
import './SideBarMenuItems'
import SideBarMenuItems from './SideBarMenuItems'

export default function SideBar() {
  const [themeColor, setThemeColor] = useState()
  const [activeItemId, setActiveItemId] = useState();
  const changeColor = (color, secondColor, focused) => {
    document.documentElement.style.setProperty('--primary-color', color)
    document.documentElement.style.setProperty('--secondary-color', secondColor)
    document.documentElement.style.setProperty('--color-focused', focused)
    setThemeColor(color)
  }
  useEffect(() => {
    console.log('active id > ' + activeItemId)
    if(activeItemId === 4) {
      // red
      changeColor('#5b1919', '#e74c3c', '#ffccc6')
      // green
    } else if(activeItemId === 3) {
      changeColor('#012d00', '#08ad33', '#93cea2')
      // blue
    } else if(activeItemId === 2) {
      changeColor('#001831', '#0e7dc7', '#97d2fa')
    }
  }, [activeItemId])

  const menuItems = [
    { id: 1, title: 'صفحه اول', path: '/' },
    { id: 2, title: 'مهارتهای پایه ای و رفتاری', path: '/BasicBehaviour' },
    { id: 3, title: 'منو 3', path: '/BasicBehaviour' },
    { id: 4, title: 'منو 4', path: '/BasicBehaviour' },
  ]
  return (
    <div>
      <div className='sidebar-menu'>
        <ul>
          {menuItems.map((item) => (
            <SideBarMenuItems activeItemId={activeItemId} setActiveItemId={setActiveItemId} key={item.id} menuItems={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}
