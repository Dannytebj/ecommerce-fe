import jwt from 'jsonwebtoken';

export default function verifyToken () {
  const token = localStorage.getItem('jwtoken');
  if (token) {
    const decoded = jwt.decode(token.split('Bearer ')[1], { complete: true });
    const currentTime = new Date();
    if (decoded.exp < currentTime.getTime()) {
      return false;
    }
    return true;
  }
}