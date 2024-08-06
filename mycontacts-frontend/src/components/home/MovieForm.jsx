import React from 'react'
import GenreCheckbox from './GenreCheckbox';

function MovieForm({ name, setName, director, setDirector, year, setYear, selectedGenre, setSelectedGenre, description, setDescription, imgData, setImgData, onSaveFormClick }) {
    const genreArr = ["Action", "Adventure", "Animation", "Comedy", "Fantasy", "Horror", "Romance", "Sci-Fic"];

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        const fileSizeInMb = bytesToMB(file.size);

        if (fileSizeInMb >= 5) {
            alert("Please select an image smaller than 5MB!");
            return;
        }

        setImgData(base64);

        function bytesToMB(bytes) {
            return (bytes / (1024 * 1024)).toFixed(2);
            // return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
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
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Director</label>
                <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Year</label>
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Genre</label>
                <div className='flex flex-row flex-wrap justify-start'>
                    {genreArr.map(genre => <GenreCheckbox key={genre} GenreType={genre} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>)}
                </div>
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Description</label>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full h-48 text-xl rounded-2xl' />
            </div>
            <img src={imgData} alt="" />
            <div className='my-4'>
                <input
                    type="file"
                    label="Image"
                    name="myFile"
                    id="file-upload"
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) => handleFileUpload(e)} />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={onSaveFormClick}>
                Save
            </button>
        </div>
    )
}

export default MovieForm;