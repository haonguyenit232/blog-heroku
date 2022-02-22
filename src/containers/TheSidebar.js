import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
  CLabel
} from '@coreui/react'

// import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
    show={show}
    onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
  >
    <div className="c-avatar">
        <CImg
          src={'/image/user_3.png'}
          className="c-avatar-img"
          alt="profile-pic"
        />
        <CLabel>Bamawl User</CLabel>
    </div>
    <CSidebarNav>

      <CCreateElement
        items={navigation}
        components={{
          CSidebarNavDivider,
          CSidebarNavDropdown,
          CSidebarNavItem,
          CSidebarNavTitle
        }}
      />
    </CSidebarNav>
    <CImg
        src={'/image/wav_bg.png'}
        className="sidebar-bg "
        alt="wave-bg"
    />
  </CSidebar>
  )
}

export default React.memo(TheSidebar)
