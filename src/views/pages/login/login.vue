<template>
    <v-card class="login_container">
        <div class="group">
            <v-card class="form">
                <v-card-title>Social Market Login</v-card-title>
                <div class="mt-8 mb-8 login-description">
                    <p>Click the button below to login to your account</p>
                </div>
                <div style="text-align: center">
                    <v-btn
                        color="primary" 
                        size="large"
                        prepend-icon="mdi-login"
                        :loading="isLoading"
                        :disabled="isLoading"
                        @click="redirectToLogin">
                        {{ isLoading ? 'Logging in...' : 'Login with Browser' }}
                    </v-btn>
                </div>
            </v-card>
        </div>
    </v-card>
    <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card>
          <v-card-text>
           {{ alertContent }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script setup lang="ts">
//import { UserModule } from '@/views/store/modules/user'
import {openPage} from "@/views/api/users"
import { onMounted, ref } from "vue";
import {receiveRedirectevent} from "@/views/api/users"
import router from '@/views/router';
//import { defineComponent } from "vue";
import {NATIVATECOMMAND} from "@/config/channellist"
const alertContent=ref('');
const dialog=ref(false);    
const isLoading = ref(false);

onMounted(() => {
 
  receiveMsg()
})
const redirectToLogin = async () => {
    try {
        isLoading.value = true;
        // Open the browser to the login page
        await openPage();
    } catch (error) {
        console.error('Login failed:', error);
        alertContent.value = 'Failed to open login page. Please try again.';
        dialog.value = true;
        isLoading.value = false; // Reset loading on error
    }
}

const receiveMsg = () => {
    receiveRedirectevent(NATIVATECOMMAND, function (data)  {
        console.log("Received redirect event:", data);
        isLoading.value = false; // Reset loading state when receiving response
        if (data.path) {
            router.push({
                name: data.path
            });
        }
      
    });
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
            height: 300px;
            padding: 40px;
            text-align: center;

            .title {
                font-size: 36px;
                font-weight: 700;
                font-family: Roboto, sans-serif !important;
                margin-bottom: 20px;
            }
        }
    }
}

.login-description {
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
}

@media only screen and (max-width: 778px) {
    .login_container {
        .group {
            .form {
                background: transparent;
            }
        }
    }
}
</style>
