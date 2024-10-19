import { Link } from 'react-router-dom';
import './logo.module.scss';

function Logo() {
  return (
    <Link to="/">
      <img src="logo.png" width={50} 
      style={{ marginLeft: '20px' }} />
    </Link>
  );
}

export { Logo };
