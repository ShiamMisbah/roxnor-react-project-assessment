import { Button, Drawer, Form, Input, Select, type FormProps } from 'antd';
import React from 'react'
import type { Product } from '../types/Product';
import FormComponent from './FormComponent';

type DrawerComponentProps = {
  open: boolean;
  onClose: () => void;
};

const DrawerComponent = ({open, onClose}: DrawerComponentProps) => {
    
  return (
    <Drawer
      title="Edit product"
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      open={open}
      size={"50%"}
    >
      <FormComponent />
    </Drawer>
  );
};

export default DrawerComponent