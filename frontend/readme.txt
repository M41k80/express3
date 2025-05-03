import { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

const { userName } = useContext(AuthContext);

return <h1>Hola, {userName}</h1>;
