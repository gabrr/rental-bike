import { AppState } from 'store';
import 'react-redux';


declare module 'react-redux' {
  interface DefaultRootState extends AppState { }
}