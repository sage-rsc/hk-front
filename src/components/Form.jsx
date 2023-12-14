import React, {useEffect, useState} from 'react';
import SelectSector from './SelectSector';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [name, setName] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [sectors, setSectors] = useState([]);
    const [selectedSectors, setSelectedSectors] = useState([]);

    const getSectors = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/sector');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const sectors = await (await response.json())?.data;
            setSectors(sectors);
        } catch (error) {
            console.error('Error fetching sectors:', error.message);
        }
    };
    useEffect(() => {
        // Call the function when the component mounts
        getSectors();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            const selectedSids = selectedSectors.map(sector => sector.sid);

            const formData = {
                name,
                sectors: selectedSids,
                agreeToTerms,
            };

            const response = await fetch('http://localhost:3000/api/v1/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const msg = await (await response.json())?.message
            if (!response.ok) {
                throw new Error(msg);
            }

            // Show success toast
            toast.success(msg, {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (error) {
            toast.error(error.message, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <form onSubmit={handleSave}>
            <p>Please enter your name and pick the Sectors you are currently involved in.</p>
            <div className="input-group">
                <label className="label">
                    Name:
                    <input type="text" required={true} value={name} className="input"
                           onChange={(e) => setName(e.target.value)}/>
                </label>
            </div>
            <div className="input-group">
                <label className="label">
                    Sectors:
                    <SelectSector className="input" sectors={sectors}
                                  onChange={setSelectedSectors}/>
                </label>
            </div>
            <div className="input-group">
                <label className="label">
                    <input type="checkbox" required={true} checked={agreeToTerms}
                           onChange={() => setAgreeToTerms(!agreeToTerms)}/> Agree to
                    terms
                </label>
            </div>

            <br/>
            <br/>
            <input type="submit" value="Save" className="button"/>
        </form>
    );
};

export default Form;