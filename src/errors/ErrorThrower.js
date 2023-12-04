import { json } from 'react-router-dom';
import { ERROR } from '../miscellanous/Constants';

export function ThrowError(type) {
  switch (type) {
    case ERROR.NOT_FOUND:
      throw new json({}, ERROR.NOT_FOUND);
    case ERROR.UNAUTHORIZED:
      throw new json({}, ERROR.UNAUTHORIZED);
    case ERROR.FORBIDDEN:
      throw new json({}, ERROR.FORBIDDEN);
    case ERROR.INTERNAL_SERVER_ERROR:
      throw new json({}, ERROR.INTERNAL_SERVER_ERROR);
    default:
      throw new json({}, ERROR.UNKNOWN);
  }
}
