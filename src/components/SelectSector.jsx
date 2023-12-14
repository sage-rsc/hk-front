import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


const SelectSector = ({sectors, onChange}) => (
    <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={sectors}
        onChange={onChange}
        required={true}
        placeholder="Select Sectors"
    />
);

export default SelectSector;
