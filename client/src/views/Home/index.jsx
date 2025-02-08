import './index.css'
import Header from '../../components/Header'
import { lazy } from 'react';

const DataComponent = lazy(() => import('../../components/Tasks'))

function Home() {
  return (
    <>
      <Header />
      <DataComponent/>
    </>
  )
}

export default Home
