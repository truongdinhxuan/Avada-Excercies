import { AppProvider, Frame } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import './App.css';
import Header from './TopBar/TopBar';
import MainPage from './Page/MainPage';
import en from '@shopify/polaris/locales/en.json';
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
      <AppProvider i18n={en}>
        <Frame style={{ height: '250px' }}
          topBar={<Header />}
          logo={Logo}
        >
          <MainPage />
        </Frame>
      </AppProvider>
    </>
  )
}

export default App;
