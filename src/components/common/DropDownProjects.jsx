import React from 'react';
import { Dropdown } from 'react-bootstrap';

export default function DropDownProjects({ style, className, variant }) {
  return (
    <Dropdown style={style} >
      <Dropdown.Toggle variant={variant} id="dropdown-basic" >
        Ver Proyectos
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item 
          style={{ fontWeight: 800 }} 
          href={process.env.REACT_APP_ENV === 'TEST' ? 'https://internal-marketplace.terrasacha.com/' : 'https://marketplace.terrasacha.com/'}
        >
          Terrasacha marketplace
        </Dropdown.Item>
        <Dropdown.Divider />
      </Dropdown.Menu>
    </Dropdown>
  );
}
