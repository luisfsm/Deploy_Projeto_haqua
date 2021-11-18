import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';
import Postagem from '../../../models/Postagem';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

import './ListarPostagem.css';


function ListarPostagem() {

    const [posts, setPosts] = useState<Postagem[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let history = useHistory();

    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa estar logado", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
            history.push("/login")

        }
    }, [token])

    async function getPost() {
        await busca("/postagens", setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {

        getPost()

    }, [posts.length])

    return (
        <>

            {
                posts.map(post => (

                    <Box m={2} padding={2} className='hr'>
                        <Card variant="outlined" className="cardColor">
                            <CardContent>
                                <Typography variant="body2" component="p" className="textoTema">
                                    {post.temas?.descricao}
                                </Typography>

                                <Typography variant="h5" component="h2" className="tituloPostagem">
                                    {post.titulo}
                                </Typography>

                                <Typography variant="body2" component="p" className="textoPostagem">
                                    {post.texto}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Box display="flex" justifyContent="center" mb={1.5}>
                                    <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                                        <Box mx={1}>
                                            <Button variant="contained" className="abotao"  >
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" className="ebotao">
                                                DELETAR
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>

                        </Card>
                    </Box>
                ))
            }
        </>)
}
export default ListarPostagem;

