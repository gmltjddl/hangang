import React from 'react';
import '../index.css';
import Banner from '../component/Banner/Banner';
import Content from '../component/Content/Content';
import Benefits from '../component/Benefits/Benefits';
import Weather  from './Weather';

const Home = () => {
  return (
    <div>

      <Weather />
      <Banner />
      <Content />
      <Benefits /> 
    </div>
  );
};

export default Home;
