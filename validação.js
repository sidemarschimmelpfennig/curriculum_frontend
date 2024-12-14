beforeEnter: (to, from, next) => {
    const token = localStorage.getItem('token');
    if (token) {
      next(); 
    } else {
      next({ name: 'login' }); 
    }
  }


  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
  },



  // Exemplo de método de login
methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          username: this.username,
          password: this.password,
        });
  
        // Verifica se a resposta contém o token ou as informações de login
        if (response.data.token) {
          // Salva o token e/ou outros dados no localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user)); // Opcional
  
          // Redireciona para uma página protegida ou exibe uma mensagem de sucesso
          this.$router.push('/dashboard');
        } else {
          alert('Login falhou. Verifique suas credenciais.');
        }
      } catch (error) {
        console.error('Erro de login:', error);
        alert('Erro de login. Tente novamente.');
      }
    },
  },
  
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem('user')); // Opcional
    }
  },