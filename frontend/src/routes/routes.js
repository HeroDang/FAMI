//Config
import config from '@/config';
//Layout
// import { HeaderOnly } from '@/layouts';
//Pages
import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Profile from '@/pages/Profile';
import ManagerAccount from '@/pages/ManagerAccount';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.managerAccount,
        component: ManagerAccount,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
