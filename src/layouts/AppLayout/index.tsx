import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface IExposedProps {
  children?: React.ReactNode;
}

type IProps = IExposedProps & RouteComponentProps;

const AppLayout = (props: IProps) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Product</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="sider">
          <Menu
            mode="vertical"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" title={<span><Icon type="user" />Page 1</span>}>
              <Menu.Item key="1">Item 1</Menu.Item>
              <Menu.Item key="2">Item 2</Menu.Item>
              <Menu.Item key="3">Item 3</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ margin: 0, minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withRouter(AppLayout);
