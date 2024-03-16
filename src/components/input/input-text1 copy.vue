<template>
       
    <div class="field is-horizontal ">
        <div class="field-label  is-normal" style="" >
            <label class="label has-text-grey has-text-left" style="width:180px" >  {{ labelInputText }} </label>
        </div>
        <div class="field-body">
            <div class="field">
                <p class="control is-expanded">
                    <input :disabled="is_disabled" class="input" type="text has-text-dark" :value="valueInputText" >
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
props:['labelInputText','valueInputText','devise','is_disabled']
}
</script>
