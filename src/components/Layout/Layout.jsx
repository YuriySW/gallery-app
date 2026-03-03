import PropTypes from 'prop-types';
import style from './Layout.module.css';

const Layout = ({children}) => (
  <div className={style.container}>{children}</div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
