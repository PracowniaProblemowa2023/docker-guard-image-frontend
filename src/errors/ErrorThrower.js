import { json } from 'react-router-dom';
import { ERROR } from '../miscellanous/Constants';

export function ThrowError(type = ERROR.INTERNAL_SERVER_ERROR) {
  switch (type) {
    case ERROR.NOT_FOUND:
      throw json({}, ERROR.NOT_FOUND);
    case ERROR.UNAUTHENTICATED:
      throw json({}, ERROR.UNAUTHENTICATED);
    case ERROR.UNAUTHORIZED:
      throw json({}, ERROR.UNAUTHORIZED);
    case ERROR.INTERNAL_SERVER_ERROR:
      throw json({}, ERROR.INTERNAL_SERVER_ERROR);
  }
}
