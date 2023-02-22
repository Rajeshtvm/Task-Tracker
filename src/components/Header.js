import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()
  // const onClick = () => {
  //   console.log('Click');
  // }
  return (
    <header className='header'>
      {/* <h1 style={headingStyle}>{title}</h1> */}
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
      )}
      {/* <Button color='blue' text='Hello1'/> */}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

//CSS in JS
const headingStyle = {
  color: 'red',
  backgroundColor: 'yellow'
}
export default Header
