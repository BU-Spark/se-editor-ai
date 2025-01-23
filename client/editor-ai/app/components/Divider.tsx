import React from 'react';

const Divider = () => {
    return (
        <div className='max-w-full m-4 mx-auto divider-line'
            style={{
                height: '1.5px',
                background: 'rgba(128, 18, 18, 0.5)',
                opacity: 1,
                width: '96%',
                position: 'relative',
                top: '10px',
            }}>
        </div>
    );
};

export default Divider;

