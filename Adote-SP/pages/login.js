import React, { useState } from 'react';
import styles from '../styles/login.module.css'; // Ajuste o caminho se necessário
import Link from 'next/link';
import axios from 'axios'; // Importando axios
import { useRouter } from 'next/router'; // Importando o useRouter

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null); // Mensagem de alerta (erro ou sucesso)
    const [loading, setLoading] = useState(false); // Para controlar o estado de carregamento
    const router = useRouter(); // Inicializando o useRouter

    // Função de validação de email
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Começar o carregamento
    
        // Verificação de email vazio ou inválido
        if (!email) {
            setAlert({ type: 'error', message: 'Por favor, insira um e-mail.' });
            setLoading(false);
            return;
        }
    
        if (!validateEmail(email)) {
            setAlert({ type: 'error', message: 'Por favor, insira um e-mail válido.' });
            setLoading(false);
            return;
        }
    
        // Verificação de senha vazia
        if (!password) {
            setAlert({ type: 'error', message: 'Por favor, insira a sua senha.' });
            setLoading(false);
            return;
        }
    
        try {
            // Envia os dados para o backend usando Axios
            const response = await axios.post('http://localhost:5000/api/admin/login', {
                email,
                senha: password,
            });
    
            // Sucesso: salvar o token ou dados de sessão, se necessário
            console.log('Login bem-sucedido:', response.data);
    
            // Redirecionar o usuário para a página de início (ou dashboard)
            router.push('/admin'); // Substitua '/inicio' pela página de destino desejada
    
            // Limpar os campos e exibir mensagem de sucesso
            setEmail('');
            setPassword('');
            setAlert({ type: 'success', message: 'Login realizado com sucesso!' }); // Mensagem de sucesso
        } catch (err) {
            console.error('Erro ao fazer login:', err);
    
            // Verifique se há uma resposta do servidor e se a resposta contém um código de erro 401
            if (err.response) {
                // Se o código de status for 401, significa que a senha está incorreta
                if (err.response.status === 401) {
                    setAlert({ type: 'error', message: 'Senha incorreta. Tente novamente.' });
                } else {
                    // Caso contrário, mensagem padrão de erro de credenciais
                    setAlert({ type: 'error', message: err.response.data.message || 'Credenciais inválidas, tente novamente!' });
                }
            } else {
                // Erro na conexão com o servidor
                setAlert({ type: 'error', message: 'Erro na conexão com o servidor. Tente novamente mais tarde.' });
            }
        } finally {
            setLoading(false); // Parar o carregamento
        }
    };
    
    return (
        <div className={styles.container}>
            {/* Imagem de fundo */}
            <div className={styles.imageContainer}>
                <img src="/images/gatoLogin.jpg" alt="Imagem de fundo" className={styles.image} />
            </div>

            {/* Container do formulário de login */}
            <div className={styles.loginContainer}>
                <h1 className={styles.welcomeTitle}>LOGIN</h1>
                <h2 className={styles.title}>ADMINISTRADOR</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <img src="/images/cat.png" alt="Eu acho que vi um gatinho" className={styles.cat} />
                        <label className={styles.label} htmlFor="email">Email:</label>
                        <input
                            className={styles.input}
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Senha:</label>
                        <input
                            className={styles.input}
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Exibição do Alerta com Estilo de Modal, logo abaixo do campo de senha */}
                    {alert && (
                        <div className={`${styles.alert} ${alert.type === 'error' ? styles.alertError : styles.alertSuccess}`}>
                            <p>{alert.message}</p>
                        </div>
                    )}

                    <p className={styles.forgotPassword}>Esqueceu a sua senha?</p>

                    {/* Botão de envio */}
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : 'Entrar'}
                        </button>
                    </div>
                   
                </form>
            </div>

            {/* Ícone de patas */}
            <div className={styles.pawsIconContainer}>
                <img src="/images/patas.png" alt="Ícone de Patas" className={styles.pawsIcon} />
            </div>
        </div>
    );
};

export default Login;
