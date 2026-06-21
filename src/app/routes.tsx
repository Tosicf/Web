import { createHashRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Exhibitions } from './pages/Exhibitions';
import { Collection } from './pages/Collection';
import { News } from './pages/News';
import { Contacts } from './pages/Contacts';
import { NotFound } from './pages/NotFound';

export const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'exhibitions', Component: Exhibitions },
      { path: 'collection', Component: Collection },
      { path: 'news', Component: News },
      { path: 'contacts', Component: Contacts },
      { path: '*', Component: NotFound }
    ]
  }
]);
