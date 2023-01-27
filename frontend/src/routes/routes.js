//Config
import config from '@/config';
//Layout
// import { HeaderOnly } from '@/layouts';
//Pages
import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Profile from '@/pages/Profile';
import ManagerAccount from '@/pages/ManagerAccount';
import MedicalChecklist from '@/pages/MedicalChecklist';

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
    {
        path: config.routes.medicalChecklist,
        component: MedicalChecklist,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
