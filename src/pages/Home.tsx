import React from 'react';
import InteractiveHero from '../components/InteractiveHero';
import BakeryHistory from '../components/BakeryHistory';
import InteractiveMenu from '../components/InteractiveMenu';
import SecretsExplorer from '../components/SecretsExplorer';

const Home: React.FC = () => {
  return (
    <div className="space-y-0 pb-0">
      <InteractiveHero />
      <BakeryHistory />
      <InteractiveMenu />
      <SecretsExplorer />
    </div>
  );
};

export default Home;
