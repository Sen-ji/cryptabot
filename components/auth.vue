<template>
  <div>
    <div v-if="!$auth.loggedIn" class="text-center">
      <v-dialog v-model="loginDiag" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on">
            Login
          </v-btn>
        </template>

        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="formLogin">
              <v-text-field
                v-model="userInfoLogin.email"
                prepend-icon="mdi-account"
                name="login"
                label="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="userInfoLogin.password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="loginUser(userInfoLogin)" color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
      <v-dialog v-model="registerDiag" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on">
            Register
          </v-btn>
        </template>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field prepend-icon="mdi-account" v-model="userInfoRegister.username" label="Username"
                                required></v-text-field>

                </v-col>
                <v-col cols="12">
                  <v-text-field prepend-icon="mdi-at" v-model="userInfoRegister.email" :rules="emailRules"
                                label="E-mail"
                                required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field prepend-icon="mdi-lock" v-model="userInfoRegister.password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password" hint="At least 8 characters" counter
                                @click:append="show1 = !show1"></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="registerUser(userInfoRegister)" color="primary" :disabled="!valid">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else>
      <v-toolbar-title class="d-inline">{{ this.$auth.user.email }}</v-toolbar-title>
      <v-btn
        icon
        @click="logout()"
      >

        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import error from "../layouts/error";

export default {
  data() {
    return {
      userInfoLogin: {
        email: '',
        password: ''
      },
      userInfoRegister: {
        username: '',
        email: '',
        password: ''
      },
      loginDiag: false,
      registerDiag: false,
      name: 'Login',
      verify: "",
      valid: false,
      password: "",
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail format non valid"
      ],
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters",
      }
    }
  },
  computed: {
    passwordMatch() {
      return () => this.userInfoRegister.password === this.verify || "Password must match";
    },
  },

  methods: {
    ...mapActions({
      show: 'snackbar/show'
    }),
    logout(){
      this.$auth.logout()
      this.show({
        text: "Déconnecté ",
        color: 'red',
        show: true,
        time:2000
      })
    },
    loginUser(loginInfo) {
      this.$auth.loginWith('local', {
        data: {
          username: loginInfo.email,
          password: loginInfo.password
        }
      }).then(() => {
        this.show({
          text: "Connexion réussis ",
          color: 'success',
          show: true,
          time:2000
        })
      }).catch(error => {
        this.show({
          text: "Connexion échouer : ",
          color: 'red',
          show: true,
          time:2000
        })
      })
    },
    async registerUser(registerInfo) {
      this.$axios.post('/api/auth/signup', {
        username: registerInfo.username,
        email: registerInfo.email,
        password: registerInfo.password,
        roles: ["user"]
      }).then(() => {
        this.loginUser({
          email: this.userInfoRegister.username,
          password: this.userInfoRegister.password
        })
      }).then(() => {
        this.show({
          text: "Enregistrement réussis",
          color: 'success',
          show: true,
          time:2000
        })
      }).catch(error => {
        this.show({
          text: "Enregistrement échouer, réessayer ",
          color: 'red',
          show: true,
          time:2000
        })
      })

    },
  }
}
</script>
