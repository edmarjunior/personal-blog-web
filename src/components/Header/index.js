import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { MdForward, MdAccountCircle } from 'react-icons/md';
import { Modal, Button } from 'react-bootstrap';
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";

import api from '../../services/api';
import { createUsuario } from "../../store/modules/usuario/actions";
import { HeaderCss, Content, Profile, Menu} from './styles';

export default function Header() {
    const dispatch = useDispatch();
    const usuario = useSelector(state => state.usuario.perfil);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showLogoffModal, setShowLogoffModal] = useState(false);
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    function openModal() {
        if (!usuario) {
            setShowAuthModal(true);
            return;
        }
      
        setShowLogoffModal(true);
    }

    function closeModal() {
        if (!usuario) {
            setShowAuthModal(false);
            return;
        }
      
        setShowLogoffModal(false);
    }

    async function onSuccessAuthLogin(responseAuth) {
        const { email, name, imageUrl: avatarUrl } = responseAuth.profileObj;

        const { data: response } = await api.post('/users', { 
            email, 
            name, 
            avatarUrl 
        });

        if (!response.ok) {
            toast.info(response.messages[0]);
            return;
        }

        const usuario = response.content;

        dispatch(createUsuario(usuario));

        setShowAuthModal(false);

        toast.info(`Bem vindo ${name}`, { position: 'bottom-right' });
    }
    
    function onFailureAuth() {
        toast.error('Desculpe! tivemos um erro com nosso login social, por favor tente mais tarde');
    }

    function handleLogoff() {
        dispatch(createUsuario(null));
        setShowLogoffModal(false);
        toast.info('Sessão encerrada', { position: 'bottom-right' });
    }

    return (
        <>
            <HeaderCss>
                <Content>
                    <div className="name">
                        <strong>Edmar Costa</strong>
                        <span>Conteúdos sobre T.I</span>
                    </div>
                    <Profile>
                        <div className="info_usuario">
                            <strong>{usuario?.name ?? 'Bem vindo'}</strong>
                            {usuario?.email && <span>{usuario.email}</span>}
                            {!usuario?.email && <span>faça login <MdForward /></span>}
                        </div>
                        {!usuario?.avatarUrl && (
                            <MdAccountCircle   
                                size={52} 
                                onClick={openModal}  
                                style={{ cursor: 'pointer'}}
                            />
                        )}
                        {usuario?.avatarUrl && (
                            <img className="round" onClick={openModal} 
                                src={usuario.avatarUrl} 
                                alt="avatar do usuário"
                            />
                        )}
                        
                    </Profile>
                </Content>
            </HeaderCss>
            <Menu>
                <nav>
                    <Link to="/posts" >Conteúdos</Link>
                    <Link to="/about" >Sobre</Link>
                </nav>
            </Menu>

            {!usuario && (
                <Modal show={showAuthModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login social</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="row" style={{ 'paddingTop': "20px" }}>
                        <div className="col-sm-12">
                            Obrigado por interagir com este conteúdo, favor escolher sua forma de acesso.
                        </div>
                    </div>
                    <div className="row" style={{ "paddingTop": "20px", "textAlign":  "center" }}>
                        <div className="col-sm-12">
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Login with Google"
                                onSuccess={onSuccessAuthLogin}
                                onFailure={onFailureAuth} >
                            </GoogleLogin>
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {usuario && (
                <Modal show={showLogoffModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Encerrar sessão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row" style={{ 'paddingTop': "20px" }}>
                            <div className="col-sm-12">
                                Olá <strong>{usuario.nome}</strong>, para encerrar sua sessão clique na opçao "Encerrar sessão"
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleLogoff}>
                            Encerrar sessão
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
