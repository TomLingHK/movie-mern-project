import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5001/api/contacts')
            .then(response => {
                setContacts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>
                    Contacts List
                </h1>
                <Link to='/contacts'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl'/>
                </Link>
            </div>
            {loading ? (
                <Spinner/>
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Name</th>
                            <th className='border border-slate-600 rounded-md'>Email</th>
                            <th className='border border-slate-600 rounded-md'>Phone</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => 
                            <tr key={contact._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {contact.name}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {contact.email}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {contact.phone}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/contacts/details/${contact._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800'/>
                                        </Link>
                                        <Link to={`/contacts/edit/${contact._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600'/>
                                        </Link>
                                        <Link to={`/contacts/delete/${contact._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600'/>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home