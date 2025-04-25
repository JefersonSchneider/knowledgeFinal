<template>
    <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
        <Header title="PUC - Base de Conhecimento/ Disciplina: Projetos Integrados" 
            :hideToggle="!user"
            :hideUserDropdown="!user" />
        <Menu v-if="user" />
        <Loading v-if="validatingToken" />
        <Content v-else />
        <Footer />
    </div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
import { mapState } from "vuex"
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"

export default {
    name: "App",
    components: { Header, Menu, Content, Footer, Loading },
    computed: mapState(['isMenuVisible', 'user']),
    data: function() {
        return {
            validatingToken: true
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true

            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

            if (!userData) {
                this.validatingToken = false
                // Comentado temporariamente para evitar redirecionamento para a página de login
                // this.$router.push({ name: 'auth' })
                // Simula um usuário para testes
                const tempUser = { id: 1, name: 'Teste', email: 'teste@teste.com', admin: true }
                this.$store.commit('setUser', tempUser)
                return
            }

            console.log('Base URL configurada:', this.$http.defaults.baseURL);
            console.log('Enviando requisição para /validateToken com dados:', userData);
            // Comentado temporariamente para evitar a chamada à rota /validateToken
            /*
            const res = await this.$http.post(`/validateToken`, userData);

            if (res.data) {
                this.$store.commit('setUser', userData)
                
                if (this.$mq === 'xs' || this.$mq === 'sm') {
                    this.$store.commit('toggleMenu', false)
                }
            } else {
                localStorage.removeItem(userKey)
                this.$router.push({ name: 'auth' })
            }
            */

            // Mantém o usuário do localStorage (se existir) ou usa um temporário
            this.$store.commit('setUser', userData || { id: 1, name: 'Teste', email: 'teste@teste.com', admin: true })

            if (this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }

            this.validatingToken = false
        }
    },
    mounted() {
        // Adicionar o script do Dialogflow Messenger
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
        script.async = true;
        document.body.appendChild(script);

        const dfMessenger = document.createElement('df-messenger');
        dfMessenger.setAttribute('intent', 'WELCOME');
        dfMessenger.setAttribute('chat-title', 'KnowledgeBot');
        dfMessenger.setAttribute('agent-id', '91063194-2686-4a38-9aed-a2dcc1f7bc26');
        dfMessenger.setAttribute('language-code', 'pt-br');
        document.body.appendChild(dfMessenger);
    },
    created() {
        // Comentado temporariamente para evitar a validação do token ao iniciar a aplicação
        // this.validateToken()
        
        // Simula um usuário para testes e desativa o estado de "loading"
        const json = localStorage.getItem(userKey)
        const userData = JSON.parse(json)
        this.$store.commit('setUser', userData || { id: 1, name: 'Teste', email: 'teste@teste.com', admin: true })
        this.validatingToken = false

        if (this.$mq === 'xs' || this.$mq === 'sm') {
            this.$store.commit('toggleMenu', false)
        }
    }
}
</script>

<style>
    * {
        font-family: "Lato", sans-serif;
    }

    body {
        margin: 0;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        height: 100vh;
        display: grid;
        grid-template-rows: 60px 1fr 40px;
        grid-template-columns: 300px 1fr;
        grid-template-areas:
            "header header"
            "menu content"
            "menu footer";
    }

    #app.hide-menu {
        grid-template-areas:
            "header header"
            "content content"
            "footer footer";
    }
</style>