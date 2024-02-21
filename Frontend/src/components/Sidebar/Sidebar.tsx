import React, { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div id="mySidenav" className={`${styles.sidenav} ${isOpen ? styles.open : ''}`}>
        <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>&times;</a>
      </div>

      <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776;</span>
    </div>
  );
};

export default Sidebar;
