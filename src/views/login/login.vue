<template>
    <v-form v-model="valid">
    <v-card class="login_container">
        
        <div class="group">
            <v-card class="form">
                <div class="text-h4">👋 Hallo!</div>
                <div class="mt-4">
                    <div class="mb-2" style="font-weight: 700">Account</div>
                    <v-text-field             
                        variant="outlined"          
                        density="compact"
                        clearable
                        hide-details
                    ></v-text-field>
                </div>
                <div class="my-4">
                    <div class="mb-2 mt-6" style="font-weight: 700">Password</div>
                    <v-text-field
                        model-value=""
                        type="password"
                        variant="outlined"
                        density="compact"
                        clearable
                        hide-details
                    ></v-text-field>
                </div>
                <div style="text-align: right">
                    <v-btn
                        color="primary"
                        append-icon="mdi-arrow-right"
                        size="large"
                        type="submit"
                        href="/vue-material-admin/"
                        >Go !</v-btn
                    >
                </div>
            </v-card>
            
        </div>
    </v-card>
</v-form>
</template>
<script lang="ts" setup>

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
