<style scoped></style>

<template>
  <div class="validate-input-container pb-3">
    <input 
    type="text"
    class="form-control"
    v-model="inputRef.val"
    @blur="validateInput"
    >
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, PropType } from "vue";
// 表单验证正则
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

 interface RuleProp {
  type: "required" | "email";
  message: string;

}

export type RulesProp = RuleProp[];

export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    
  },
  setup() {
    const inputRef = reactive({
        val:'',
        error:false,
        message:''
    })
    const validateInput = () =>{

    }
    return {
        inputRef,
        validateInput
    }


  },
});
</script>
