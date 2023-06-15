import React, { useState, useRef, useEffect } from 'react';
import NextImage from 'next/image';
import ColorThief from 'colorthief';

export default function Pokemon({ data }) {
  const imageRef = useRef(null);
  const [bgColor, setBgColor] = useState('');

  return (
    <>
      <div
        className="flex poke-list-item drop-shadow-lg p-3 flex-col"
        style={{ backgroundColor: `rgb(${bgColor})` }}
      >
        <div
          style={{
            position: 'relative',
            height: '250px',
            width: '100%',
          }}
          className="p-1"
        >
          <div>
            {data.types.map((type, i) => (
              <span key={i} className="mr-1">
                {type}
              </span>
            ))}
          </div>
          <NextImage
            src={data.image}
            alt="pokemon"
            className="drop-shadow-md"
            ref={imageRef}
            priority
            layout="fill"
            objectFit="cover"
            objectPosition="50% 0%"
            onLoad={() => {
              const colorThief = new ColorThief();
              const img = imageRef.current;
              const result = colorThief.getColor(img, 25);
              setBgColor(result.join(','));
            }}
          />
        </div>
        <div className="flex flex-col justify-between">
          <h2>
            <small>#{data.number}</small>
            {data.classification}
          </h2>
          <h3> {data.name}</h3>
        </div>
      </div>
    </>
  );
}
