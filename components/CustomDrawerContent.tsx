// components/CustomDrawerContent.tsx
import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function CustomDrawerContent(props:any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => alert('Link to help')}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
