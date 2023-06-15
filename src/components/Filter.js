import React, { useState } from 'react';
import IconClose from './IconClose';

const TYPE = [
  'Bug',
  'Dark',
  'Electric',
  'Normal',
  'Rock',
  'Fairy',
  'Fighting',
  'Fire',
  'Flying',
  'Poison',
  'Steel',
  'Ghost',
  'Glass',
  'Ground',
  'Ice',
  'Psychic',
  'Water',
];
export default React.memo(
  ({ callback = () => {}, close = () => {}, selectedTypes = [] }) => {
    const [selected, setSelected] = useState(selectedTypes);

    function filterPokemon(type) {
      const newSelected = [...selected];
      const selectedIndex = selected.findIndex((t) => t === type);
      if (selectedIndex > -1) {
        newSelected.splice(selectedIndex, 1);
      } else {
        newSelected.push(type);
      }

      setSelected(newSelected);
      callback(newSelected);
    }
    return (
      <div className="modern-modal-wrapper">
        <div className="modern-modal-body" style={{ minHeight: '400px' }}>
          <div className="p-4 flex justify-between">
            <h1>Type</h1>
            <button type="button" onClick={() => close(false)}>
              <IconClose />
            </button>
          </div>
          <div className="filter-wrapper p-4">
            <ul>
              {TYPE.map((t, i) => (
                <li key={i}>
                  <label className="c-container">
                    {t}
                    <input
                      type="checkbox"
                      checked={selected.findIndex((f) => f === t) > -1}
                      onChange={() => {
                        filterPokemon(t, i);
                      }}
                    />
                    <span class="checkmark"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },
);
