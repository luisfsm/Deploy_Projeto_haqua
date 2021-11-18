import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';

function Navbar() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let history = useHistory();

    const dispatch = useDispatch();


    function goLogout() {
        dispatch(addToken(''))
        toast.info("Usuario deslogado", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        })
        history.push('/login')
    }

    var navbarComponent;


    if (token !== "") {
        navbarComponent = <div>
            <AppBar position="fixed" className="navcor div">
                <Toolbar variant="regular">
                    <Box className="cursor">
                        <Typography variant="h5" color="inherit" >
                            <Link to="/home">
                                <img src="https://cdn-icons-png.flaticon.com/512/758/758729.png" alt="logo" height="25px" />
                            </Link>
                        </Typography>
                    </Box>

                    <Box display="flex">

                        <Box mx={1} className="cursor">
                        </Box>



                        <Link to="/temas" className='text-decorator-none'>
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Temas
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/formularioTema" className="text-decorator-none">
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Novo Tema
                                </Typography>
                            </Box>
                        </Link>
                        <Box mx={1} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Notícias
                            </Typography>
                        </Box>


                        <Link to="/sobre" className="text-decorator-none">
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Sobre Nós
                                </Typography>
                            </Box>
                        </Link>




                        <Link to="/login" className="text-decorator-none">
                            <Box mx={1} className="cursor" onClick={goLogout}>
                                <Typography variant="h6" color="inherit">
                                    Logout
                                </Typography>
                            </Box>
                        </Link>

                    </Box>
                    <Box display="flex" justifyContent="flex-end" >
                    </Box>

                </Toolbar>
            </AppBar>
        </div >

    }

    return (
        <>
            {navbarComponent}
        </>

    )
}

export default Navbar
