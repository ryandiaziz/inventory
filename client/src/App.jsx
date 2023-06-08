import React, { useState, useEffect } from 'react';
import NavbarC from './components/Navbar';
import MainContent from './components/MainContent';
import { readItem, searchItem } from './axios/item';

function App() {
  const [items, setItems] = useState([])
  const [updated, setUpdated] = useState(false)
  const [search, setSearch] = useState('')
  // pagination
  const postPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  const lastPostIndex = currentPage * postPerPage
  const firstPostPostIndex = lastPostIndex - postPerPage
  const currentPosts = items.slice(firstPostPostIndex, lastPostIndex)
  // const currentPostss = temp.slice(firstPostPostIndex, lastPostIndex)
  // pagination

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchItem(search, (result) => { setItems(result) });
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [search]);

  useEffect(() => {
    readItem((result) => {
      setItems(result)
    })
  }, [updated])
  return (
    <>
      <NavbarC
        handleChange={handleChange}
      />
      <MainContent
        items={items}
        updated={updated}
        setUpdated={setUpdated}
        totalPosts={items.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        currentPosts={currentPosts}
      />
    </>
  );
}

export default App;
