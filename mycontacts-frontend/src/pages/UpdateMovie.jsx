import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMovie() {
    const [name, setName] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [imgData, setImgData] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5001/api/movies/${id}`)
            .then((response) => {
                setName(response.data.name);
                setDirector(response.data.director);
                setYear(response.data.year);
                setImgData(response.data.imgData);
                setDescription(response.data.description);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console.');
                console.log(error);
        })
    }, [])
    
    const handleUpdateMovie = () => {
        const data = {
            name,
            director,
            year,
            imgData,
            description,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5001/api/movies/${id}`, data)
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

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImgData(base64);
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            };
        })
    }

    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3xl my-4'>Update Movie</h1>
            {loading ? <Spinner/> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full rounded-xl'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Director</label>
                    <input 
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full rounded-xl'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Year</label>
                    <input 
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full rounded-xl'
                    />
                </div>
                <div className='my-4' >
                    <label className='text-xl mr-4 text-gray-500'>Description</label>
                    <textarea 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full h-48 text-xl rounded-2xl'
                    />
                </div>
                <img src={imgData} alt="" />
                <div className='my-4'>
                    <input 
                        type="file" 
                        label="Image"
                        name="myFile"
                        id="file-upload"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => handleFileUpload(e)}
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateMovie}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default UpdateMovie;