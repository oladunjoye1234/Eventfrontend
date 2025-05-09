import React from 'react'

const Spinner = () => {
    return (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      );
    };

export default Spinner
