import { Frame } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import './App.css';
import Header from './shared/TopBar';
import MainPage from './features/todos/pages/MainPage';
// import ResourceList from './Resource List/ResourceList';
function App() {
  const Logo = {
    topBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    width: 86,
    url: '#',
    accessibilityLabel: 'Shopify',
  };
  return (
    <>
      <Frame style={{ height: '250px' }}
        topBar={<Header />}
        logo={Logo}
      >
        <MainPage />
      </Frame>
    </>
  )
}

export default App;
