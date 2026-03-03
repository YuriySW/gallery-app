import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Button.module.css';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className,
  ...props
}) => {
  const buttonClass = classNames(
    style.button,
    style[variant],
    {[style.disabled]: disabled},
    className,
  );

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'unsplash', 'rounded']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
