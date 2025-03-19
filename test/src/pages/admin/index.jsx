import React, { useState } from 'react';
import SideBar from './component/SideBar';
import Header from './component/Header';
import styled from 'styled-components';
import AdminProduct from '../adminproduct';
import AdminAccount from "../adminaccount";
import { useUser } from '../../providers/user-provider';
import { Navigate, useNavigate} from 'react-router-dom';
import AdminOrder from '../adminorders';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {user} = useUser();
  if (user?.isAdmin !==1) {
   return <Navigate to={"/"}/>
  }
 

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return <AdminAccount/>;
      case 2:
        return <AdminProduct />;
      case 3:
        return <AdminOrder />;
      default:
        return null;
    }
  };
    return (
      <StyledAdmin>
        {/* Sidebar */}
        <div className='adminpage'>
          <div className="sidebar">
            <SideBar {...{currentPage,setCurrentPage}}/>
          </div>
          {/* Main Content */}
          <div className="header_content">
            {/* Header */}
            <div className="header">
              <Header />
            </div>

            {/* Content */}
            <div className="content">
             {renderContent()}
            </div>
          </div>
        </div>
      </StyledAdmin>
    );
};
const StyledAdmin = styled.div`
  .adminpage {
    display: flex;
    min-height: 100vh;
  }
  .sidebar {
    min-height: 100%;
  }
  .header_content {
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100%; /* Chiều cao 100% để mở rộng theo chiều cao của container cha */
  }
`;
export default Admin;