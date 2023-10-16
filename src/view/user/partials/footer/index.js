import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;
const AppFooter = () => {
  const styles = {
    footerStyles: {
      textAlign: "center",
    }
  };
  return (<Footer
    style={styles.footerStyles}
  >
        Ant Design ©2023 Created by Ant UED
  </Footer>)
};
export default AppFooter;