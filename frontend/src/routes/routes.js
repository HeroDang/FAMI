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
import ManageBill from '@/pages/ManageBill';
import ManageDrugBook from '@/pages/ManageDrugBook';
import ManageDrug from '@/pages/ManageDrug';

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
    {
        path: config.routes.manageBill,
        component: ManageBill,

    },
    {
        path: config.routes.manageDrugBook,
        component: ManageDrugBook,

    },
    {
        path: config.routes.manageDrug,
        component: ManageDrug,

    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
