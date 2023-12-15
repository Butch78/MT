<script setup lang="ts">

import { ElText, ElButton, ElBaseInput, ElContainer } from './primitives';
import ElInput from '@/components/ElInput.vue';
import { ref, computed } from 'vue';
import { validate, required, emailValidation } from '../validation'
import { supabase } from '@/supabase';

const isSigningIn = ref<boolean>(false)
const emailSent = ref<boolean>(false)
const email = ref<string>('')
const emailStatus = computed(() => {
    return validate(email.value, [required, emailValidation])
})

const isInvalid = computed(() => {
    return (!emailStatus.value.valid || isSigningIn.value)
})

async function signIn() {
    try {
        isSigningIn.value = true;
        const { error } = await supabase.auth.signInWithOtp({ email: email.value })
        if (error) throw error
        console.log('Check your email for the login link!')
        emailSent.value = true
    } catch (error) {
        localStorage.removeItem('redirectRoute');
    } finally {
        isSigningIn.value = false;
    }
}
</script>

<template>
    <ElContainer>
        <ElBaseInput>
            <template #el-base-input>
                <ElInput name="email-login" label="Sign In" :status="emailStatus" class="mb-10" placeholder="Email"
                    v-model="email" type="email" />
                <div v-if="emailSent" class="mb-4">
                    <ElText id="signing-in" label="signing-in" tag="p" text="Email Sent! Check your inbox" />
                </div>
            </template>
            <template #el-action>
                <ElButton class="mb-4" id="sign-in" :disabled="isInvalid" label="Sign In" @clicked="signIn">
                    Sign in
                </ElButton>
            </template>

        </ElBaseInput>
    </ElContainer>
</template>