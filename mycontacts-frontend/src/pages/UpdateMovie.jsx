import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import MovieForm from '../components/home/MovieForm';

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

    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3xl my-4'>Update Movie</h1>
            {loading ? <Spinner/> : ''}
            <MovieForm
                name={name}
                setName={setName}
                director={director}
                setDirector={setDirector}
                year={year}
                setYear={setYear}
                description={description}
                setDescription={setDescription}
                imgData={imgData}
                setImgData={setImgData}
                onSaveFormClick={handleUpdateMovie}
            />
        </div>
    )
}

export default UpdateMovie;