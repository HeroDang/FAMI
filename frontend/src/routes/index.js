//Layout
import { HeaderOnly } from '@/components/Layout';
//Pages
import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Profile from '@/pages/Profile';
import ManagerAccount from '@/pages/ManagerAccount';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: '/managerAccount',
        component: ManagerAccount,
    },
    {
        path: '/profile',
        component: Profile,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
