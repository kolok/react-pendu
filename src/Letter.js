import React from 'react';
import PropTypes from 'prop-types'

const Letter = ({ letter, status, onClick }) => (
    <li className={`Content__Letter ${status}`} onClick={() => onClick(letter)}>{letter}</li>
)

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['active','inactive']).isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Letter;
