import * as React from 'react';
import { Layout as AntLayout, Menu as AntMenu } from 'antd';
import styled from 'styled-components';

import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IExposedProps {
  children?: React.ReactNode;
}

const RootLayout = styled(AntLayout)`
  .ant-layout {
    min-height: 100vh;
    background-color: #FFF;
  }
  .ant-layout-header {
    > .ant-menu {
      line-height: 64px;
    }
    background-color: #FFF;
  }
  .ant-layout-content {
    padding: 0 24px 24px;
    margin: 0;
    min-height: calc(100vh - 65.43px);
    background-color: #FFF;
  }
`;

const Logo = styled.div`
  width: 120px;
  height: 31px;
  margin: 16px 28px 16px 0;
  float: left;
  color: #000;
`;

type IProps = IExposedProps & RouteComponentProps;

const AppLayout = (props: IProps) => {
  return (
    <RootLayout>
      <AntLayout.Header>
        <Logo>React</Logo>
        <AntMenu mode="horizontal" defaultSelectedKeys={['2']}>
          <AntMenu.Item key="1">Home</AntMenu.Item>
          <AntMenu.Item key="2">Product</AntMenu.Item>
        </AntMenu>
      </AntLayout.Header>
      <AntLayout.Content>
        {props.children}
      </AntLayout.Content>
    </RootLayout>
  );
}

export default withRouter(AppLayout);
