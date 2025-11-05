import { socialLinks } from '../data'
import SocialLink from './SocialLink'

const PageLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass} id='nav-links'>
      {socialLinks.map((link) => {
        return <SocialLink key={link.id} link={link} itemClass={itemClass} />
      })}
    </ul>
  )
}
export default SocialLinks