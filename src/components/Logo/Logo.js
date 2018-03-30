import React from 'react';
import BurgerLogo from '../../assets/img/burger-logo.png';
import './Logo.css';

const logo = (props) => (
	<div className = "Logo" style = {{height: props.height}}>
		<img src={BurgerLogo} alt="BurgerMan" />
	</div>
);

export default logo;