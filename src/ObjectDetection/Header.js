import React from 'react';
import PropTypes from 'prop-types';

const mystyle = {
    title: {
        color: 'blue',
        textAlign: 'center',
        fontSize: '35px',
        marginBottom: '5px'
    },
    content: {
        textAlign: 'center',
        fontSize: '25px',
        marginBottom: '5px'
    },
    buttonContainer: {
        marginLeft: '47%',
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
    }
  };

const Header = ({ handleToggleCamera, isCamOn }) => (
  <>
    <div style={mystyle.title}>
        Object Detection
    </div>
    {!isCamOn && <div style={mystyle.content}>
        Please Click Turn on Camera button to continue
    </div>}
    {!isCamOn && <div style={mystyle.buttonContainer}>
        <button style={mystyle.button} onClick={handleToggleCamera}>Turn on Camera</button>
    </div>}
  </>
);

Header.propTypes = {
    handleToggleCamera: PropTypes.func.isRequired,
    isCamOn: PropTypes.bool.isRequired,
};

export default Header;
