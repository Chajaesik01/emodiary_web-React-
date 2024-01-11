import { Link, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { BellOutlined, BarChartOutlined, HomeOutlined, PictureOutlined } from '@ant-design/icons';
import Router from './routes/router'
import PasswordCheck from './components/PasswordCheck'
import { useEffect, useState } from 'react';
import NotFound from './components/Notfound'
import Check_access from './components/check_access'
const { Header, Content, Footer, Sider } = Layout;

// 헤더와 푸터를 렌더링하는 컴포넌트
const DefaultLayout = () => {
    return (
        <Layout>
            <StyledSider>
                <Menu mode="inline" defaultSelectedKeys={['1']}>
                    <StyledMenuItem key="1">
                        <Link to='/'>
                            <BellOutlined />
                            <span>공지사항</span>
                        </Link>
                    </StyledMenuItem>
                    <StyledMenuItem key="2">
                        <Link to="/charts">
                            <BarChartOutlined />
                            <span>이용자 통계</span>
                        </Link>
                    </StyledMenuItem>
                    <StyledMenuItem key="3">
                        <Link to="/picture">
                            <PictureOutlined />
                            <span>앨범 주문 현황</span>
                        </Link>
                    </StyledMenuItem>
                </Menu>
            </StyledSider>
            <Layout>
                <StyledContent>
                    <Router />
                </StyledContent>
            </Layout>
        </Layout>
    );
};

const StyledMenuItem = styled(Menu.Item)`
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

const StyledSider = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  background-color: black;
  width: 100vh;
`;

const StyledContent = styled(Content)`
    height: 100vh;
    padding: 10px;
    overflow: initial;
`;

// 헤더와 푸터를 렌더링하지 않을 경로의 컴포넌트
const NoHeaderFooterRoute = ({ element, ...rest }) => {
    return <Route {...rest} element={element} />;
};

function App() {
    //const [uuid, setUuid] = useState(null);
    const [uuid, setUuid] = useState("5da26db7-3869-4ba9-a514-23f91383946e");

    useEffect(() => {
        const fetchUuid = async () => {
            try {
                const response = await fetch('http://localhost:8080/getUuid'); // 서버 주소와 경로는 실제 상황에 맞게 수정하세요.
                const uuid = await response.text();
                setUuid(uuid);
            } catch (error) {
                console.error("Failed to fetch UUID: ", error);
            }
        };

        fetchUuid();
    }, []);

    if (!uuid) {
        return <Navigate to="/NotFound"/>
    }


    return (
        <Routes>
            <Route path={`/api/v1/shared-diaries/${uuid}/check-accessibility`} element={<Check_access/>}/>
            <Route path="*" element={<DefaultLayout />} />
        </Routes>
    );
}

export default App;
