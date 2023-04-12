import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
  const [search, setSearch] = useState('');
  console.log(search)
  const [state, setState] = useState({loading: true, items: [], categories: []})
  async function loadData() {
    const uri = 'http://localhost:5000'
    const promises = [];
    promises.push(fetch(uri + '/items'));
    promises.push(fetch(uri + '/category'))
    const res = await Promise.all(promises)
    const items = await res[0].json()
    const categories = await res[1].json()
    const itemsByCat = {};
    categories.categories.forEach(cat => {
      itemsByCat[cat.CategoryName] = items.items.filter(i => i.CategoryName === cat.CategoryName);
    })
    setState({
      loading: false,
      items: itemsByCat,
      categories: categories.categories
    })
  }
  console.warn('state==>', state)
  useEffect(()=>{
    console.log('useEffect working')
    loadData();
  }, [])
  if(state.loading) {
    return <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  }
  return (<>
    <div><Navbar/></div>
    <div><Carousel handleSearch={setSearch} /></div>
    <div className='items'>{state.categories.map((cat) => <div key={cat._id} id={cat._id} className='m-3'>
    <h4> {cat.CategoryName} </h4>
    <div className='items mt-3 container'>
    <div className='row'>
      {search.length > 2 
      ? state.items[cat.CategoryName]
        .filter(item => item.name.toLowerCase().includes(search))
        .length === 0 ? <div className='fs-4 fst-italic'> No Items Found</div>:
        state.items[cat.CategoryName]
        .filter(item => item.name.toLowerCase().includes(search))
        .map(item => <Card key={item._id} item={item}></Card>)
      : state.items[cat.CategoryName].map(item => <Card key={item._id} item={item}></Card>)}
    </div>
    </div>

    </div>)}</div>
    <div><Footer/></div>
    </>
  )
}
