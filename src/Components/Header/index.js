import React, { useState } from 'react';
import "./index.css";
import { Flex } from 'antd';

const Header = () => {
    const [bookName, setBookName] = useState("");
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isHidden, setIsHidden] = useState(true);

    const handleInputChange = (e) => {
        setBookName(e.target.value);
    };

    const handleAddBook = (e) => {
        e.preventDefault();
        if (bookName.trim()) {
            const updatedBooks = [...books, bookName];
            setBooks(updatedBooks);
            setFilteredBooks(updatedBooks);
            setBookName("");
        }
    };

    const toggleHideContent = () => {
        setIsHidden(!isHidden);
    };

    const handleDeleteBook = (index) => {
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
    };

    const handleSearchBooks = (event) => {
        const query = event.target.value;
        const results = query 
            ? books.filter(book => book.toLowerCase().includes(query.toLowerCase())) 
            : books;
        setFilteredBooks(results);
    };

    return (
        <div className='header'>
            <div className='header-content1'>
                <Flex vertical align='center' gap='small'>
                    <h1 style={{ marginTop: '20px' }}>Library</h1>
                    <p>Books for Students</p>
                    <input 
                        type='text' 
                        placeholder='Search books...' 
                        onChange={handleSearchBooks} 
                    />
                </Flex>
            </div>

            <div className='header-content2' style={{ marginTop: '50px' }}>
                <h2>Books To Read</h2>

                {isHidden && (
                    <div id='content' style={{ fontSize: '18px' }}>
                        {filteredBooks.map((book, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{book}</span>
                                <button className='buttonss' onClick={() => handleDeleteBook(i)}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}

                <Flex vertical align='center' gap='small'>
                    <div className='hidden'>
                        <label>
                            <input type="checkbox" checked={!isHidden} onChange={toggleHideContent} />
                            <span> Hide All Books</span>
                        </label>
                    </div>
                    <form onSubmit={handleAddBook}>
                        <input 
                            type='text' 
                            placeholder='Add a book' 
                            onChange={handleInputChange} 
                            value={bookName} 
                            className='input2' 
                        />
                        <button type='submit' className='button2'>Add</button>
                    </form>
                </Flex>
            </div>
        </div>
    );
};

export default Header;
