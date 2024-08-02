import React from 'react';

function PlayerCounter({ count }) {
    return (
        <div className="absolute top-0 left-0 bg-black text-white rounded-full px-4 py-2 m-5">
            {count}/10
        </div>
    );
}

export default PlayerCounter;
