import React from "react";
import { Layout } from "antd";
import SideMenu from "./SideMenu";
import "./styles.css";

const { Sider } = Layout;
const AppSider = ({ collapsed, onCollapse }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => onCollapse(value)}
    >
      <div className="logo-container" />
      <SideMenu />
    </Sider>
  );
};
export default AppSider;
