import React from 'react'

export const Loading = () => {
    return (
        <div className="text-PrimaryTextClr font-sourceSansPro animate-pulse w-44 h-44 grid place-content-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-xl">Loading...</h1>
        </div>
      );
}
