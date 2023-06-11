import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'

export const Header = () => {
  return (
    <>
      <div className='navbar'>
        <div className='navItem'>
          <a href='/'>
            <FontAwesomeIcon icon={faImage} /> Image Restoration
          </a>
        </div>
      </div>
    </>
  )
};