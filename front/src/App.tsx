import {Container, Typography} from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import {Route, Routes} from 'react-router-dom';
import Products from './features/products/Products.tsx';
import NewProduct from './features/products/NewProduct.tsx';
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import EditProduct from "./features/products/EditProduct.tsx";

function App() {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header>
                <AppToolbar></AppToolbar>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Products/>}/>
                        <Route path="/products/new" element={
                            <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                                <NewProduct/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/products/:id/edit" element={
                            <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                                <EditProduct/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Typography variant="h2">Not found!</Typography>}/>
                    </Routes>
                </Container>
            </main>

        </>
    );
}

export default App;
