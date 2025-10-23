import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import RoomsPage from './nestedPages/RoomsPage';
import CreateRoomPage from './nestedPages/CreateRoomPage';
import GuestProfile from './nestedPages/GuestProfile';
import RoomStatusUpdatePage from './nestedPages/RoomStatusUpdatePage';
import RoomBooking from './nestedPages/RoomBooking';
import ScheduleTask from './nestedPages/ScheduleTask';
import UpdateRoomDetails from './nestedPages/UpdateRoomDetails';
import { useNavigate } from 'react-router-dom';
import { AccessibilityNew,  BookmarkAdd, Create, Logout, Report, Room, RoomServiceSharp, Update } from '@mui/icons-material';

// Dummy Components for Pages
const NAVIGATION = [


  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'roommanagement',
    title: 'Room Management',
    icon: <Room/>,
    children: [
      {
        segment: 'createroom',
        title: 'Create Room',
        icon: <Create/>,
      },
      {
        segment: 'updateroom',
        title: 'Update Room Details',
        icon: <Update/>,
      },
      {
        segment: 'rooms',
        title: 'Rooms',
        icon: <RoomServiceSharp />,
      },
    ],
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <AccessibilityNew />,

  },
  {
    segment: 'bookroom',
    title: 'Book Room',
    icon: <BookmarkAdd />,
  },
  {
    segment: 'reportissue',
    title: 'Report Issue',
    icon: <Report />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'User',
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <Logout />,  
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    const params = {}
    const pathParts = pathname.split('/')
    if (pathParts[1] === "roommanagement" && pathParts[2] === "rooms") {
      params.id = pathParts[3]
    }
    return {
      pathname,
      params,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function RecepitionistDashboard(props) {
  const { window, children,handleLogout } = props;

  const router = useDemoRouter('/roommanagement');


  // Map routes to components
  const renderPage = () => {
    switch (router.pathname) {
      case '/roommanagement':
        return <RoomsPage router={router} />;
      case '/roommanagement/createroom':
        return <CreateRoomPage router={router} />;
      case '/roommanagement/rooms':
        return <RoomsPage router={router} />;
      case `/roommanagement/rooms/${router.params.id}`:
        return <RoomStatusUpdatePage router={router} />;
        case '/roommanagement/updateroom':
          return <UpdateRoomDetails router={router}/>;
      case '/users':
        return <GuestProfile />;
      case '/bookroom':
        return <RoomBooking />;
      case '/reportissue':
        return <ScheduleTask />;
        case '/logout':
          return handleLogout();
      default:
        return <div>Page Not Found</div>;
    }
  };

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="../../public/assets/img/logo2.png" alt="MUI logo2" />,
        title: '',
        homeUrl:"roommanagement"
      }}
    >
      <DashboardLayout>
        <PageContainer>
          {renderPage()}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}