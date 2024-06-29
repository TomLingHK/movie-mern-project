import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateContact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
    setLoading(true);
    axios
        .get(`http://localhost:5001/api/contacts/${id}`)
        .then((response) => {
            setName(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            alert('An error happened. Please check console.');
            console.log(error);
        })
    }, [])
    
    const handleUpdateContact = () => {
        const data = {
            name,
            email,
            phone,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5001/api/contacts/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console.');
                console.log(error);
            });
    }

    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3xl my-4'>Update Contact</h1>
            {loading ? <Spinner/> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Email</label>
                    <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Phone</label>
                    <input 
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateContact}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default UpdateContact;