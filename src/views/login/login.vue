<template>
    <v-form ref="form" v-model="valid">

        <v-card class="login_container">

            <div class="group">
                <v-card class="form">
                    <v-card-title>Login Form</v-card-title>
                    <div class="mt-4">
                        <div class="mb-2" style="font-weight: 700">E-mail</div>
                        <v-text-field
v-model="email" :rules="emailRules" label="E-mail" variant="outlined"
                            density="compact" clearable hide-details></v-text-field>
                    </div>
                    <div class="my-4">
                        <div class="mb-2 mt-6" style="font-weight: 700">Password</div>
                        <v-text-field 
                        v-model="password" type="password" variant="outlined" density="compact" label="password"
                            :rules="passwordRules" clearable hide-details></v-text-field>
                    </div>
                    <div style="text-align: right">
                        <v-btn
color="primary" append-icon="mdi-arrow-right" size="large"
                            @click="submitForm">Submit</v-btn>
                    </div>
                </v-card>

            </div>
        </v-card>
    </v-form>

    <v-dialog
        v-model="dialog"
        
        width="auto"
      >
        <v-card>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script lang="ts">
import { UserModule } from '@/store/modules/user'
export default{
    data: () => ({
        alertContent:'',
        dialog: false,
        valid: false,
        email: '',
        password: '',
        emailRules: [
            value => {
                if (value) {
                    return true
                }
                return 'E-mail is requred.'
            },
            value => {
                if (/.+@.+\..+/.test(value)) return true

                return 'E-mail must be valid.'
            },
        ],
        passwordRules: [
            value => {
                if (value) {
                    return true
                }
                return 'password is requred.'
            },
        ],
       
    }),
    methods: {
        async submitForm() {
          //valid form
            if (this.$refs.form.validate()) {
                console.log("valid form")
                //login
                await UserModule.Login({
                username: this.email.trim(),
                password: this.password.trim(),
                }).then(() => {
                    
                    console.log("login success")
                }).catch((err) => {
                    this.dialog=true
                    console.log(err)
                    console.log("login fail")
                });
                //redirect
                this.$router.push(this.$route.query.redirect || '/')
            }
            
        },
    },
}

</script>
<style lang="scss" scoped>
.login_container {
    height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    position: relative;
    overflow: hidden;

    .frame {
        position: absolute;
        left: -5%;
        top: -5%;
        width: 110%;
        height: 110%;
        filter: blur(20px);
    }

    .group {
        display: flex;
        position: relative;
        z-index: 1;
        border-radius: 20px;
        overflow: hidden;

        .form {
            width: 360px;
            margin: 0 auto;
            height: 400px;
            padding: 60px;

            .title {
                font-size: 36px;
                font-weight: 700;
                font-family: Roboto, sans-serif !important;
                margin-bottom: 20px;
            }
        }

        .desc {
            height: 100%;
            margin: 0 auto;
            width: 360px;
            background-image: linear-gradient(to bottom, #d4e5f5, #e1edf3);
            height: 400px;
            padding: 60px;
            text-align: center;

            .logo {
                text-align: center;
            }
        }
    }
}

@media only screen and (max-width: 778px) {
    .login_container {
        .group {
            .form {
                background: transparent;
            }

            .desc {
                display: none;
            }
        }
    }
}
</style>
