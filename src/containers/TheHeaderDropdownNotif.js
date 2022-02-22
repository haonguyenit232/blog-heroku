import React, { useState } from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import i18next from 'i18next';
import { reactLocalStorage } from 'reactjs-localstorage'
const TheHeaderDropdownNotif = () => {

  const [items, setItems] = useState([
    {
      label: 'English',
      value: 'English',
      img: 'image/english.png'
    },
    {
      label: 'Zawgyi',
      value: "Zawgyi", img: 'image/Zawgyi.png'
    },

    { label: "Unicode", value: "Unicode", img: 'image/Unicode.png' }
  ]);

  const [dValue, setdValue] = useState("English");

  let changeValue = (e) => {
    let data = e;
    let lng = data['value'];
    let language = data['label'];
    i18next.changeLanguage(lng);
    setdValue(language);
    reactLocalStorage.remove('LANGUAGE');
    reactLocalStorage.set('LANGUAGE', lng);
    window.location.reload(false);
  }

  return (
    <CDropdown
      inNav
    >
      <CDropdownToggle color="primary">
        <div className="float-left">
          <div >
            <CImg
              src={'image/' + dValue + '.png'}
              className="d-img"
              alt="admin@bootstrapmaster.com"
            />
            <span className="c-avatar-status bg-success"></span>
          </div>
        </div>{dValue}
      </CDropdownToggle>
      <CDropdownMenu>
        {items.map(item => (
          <CDropdownItem
            key={item.value}
            value={item.value}
            onClick={changeValue.bind(this, item)}
          >
            <div className="float-left">
              <div >
                <CImg
                  src={item.img}
                  className="d-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            {item.label}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif



