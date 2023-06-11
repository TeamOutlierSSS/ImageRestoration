import '../styles/footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


export const Footer = () => {
    return (
        <footer>
            <div className='contents'>
                <a href="https://github.com/TeamOutlierSSS/ImageRestoration"><FontAwesomeIcon icon={faGithub} /></a>
            </div>
        </footer>
    )
}