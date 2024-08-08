import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import MovieForm from '../components/form/MovieForm';

function CreateMovie() {
    const [name, setName] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [imgData, setImgData] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveMovie = () => {
        const data = {
            name,
            director,
            year,
            genre: selectedGenre,
            imgData,
            description,
        };
        setLoading(true);
        axios
            .post(`http://localhost:5001/api/movies/`, data)
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
            <h1 className='text-3xl my-4'>Create Movie</h1>
            {loading ? <Spinner/> : ''}
            <MovieForm
                name={name}
                setName={setName}
                director={director}
                setDirector={setDirector}
                year={year}
                setYear={setYear}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                description={description}
                setDescription={setDescription}
                imgData={imgData}
                setImgData={setImgData}
                onSaveFormClick={handleSaveMovie}
            />
        </div>
    )
}

export default CreateMovie;