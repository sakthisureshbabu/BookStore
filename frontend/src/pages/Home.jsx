import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';
import BooksTable from '../components/Home/BooksTable';
import BooksCard from '../components/Home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/books')
      .then(res => {
        setBooks(res.data.books);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, []);

  return (
    <div className='p-4'>
        <div className="flex justify-center items-center gap-x-4">
          <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('table')}
          >Table</button>
          <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('card')}
          >Card</button>
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Books List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
      {loading ? (<Spinner />) : 
        showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)
      }
    </div>
  )
}

export default Home;
