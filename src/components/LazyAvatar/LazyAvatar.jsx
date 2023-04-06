import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { Fade } from '@mui/material';

function LazyAvatar({ src, alt, ...restProps }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, [setImageLoaded]);

  return src && src.length ? (
    <Fade
      in={imageLoaded}
      style={{ transitionDelay: imageLoaded ? '0ms' : '300ms' }}
    >
      <Avatar src={src} alt={alt} onLoad={handleImageLoad} {...restProps} />
    </Fade>
  ) : (
    <Avatar {...restProps} />
  );
}

LazyAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

export default LazyAvatar;
