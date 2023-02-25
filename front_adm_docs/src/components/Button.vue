<template>
    <button class="btn" :class="type" :disabled="isAvailable == false"><i :v-if="iconName" :class="iconName" />{{ textButton }}</button>
</template>

<script>
export default {
    props: {
        type: String,
        textButton: String,
        iconName: String,
        isAvailable: Boolean
    }
}
</script>

<style>
.btn {
    display: flex;
    align-items: center;
    border-radius: 4px;
    font-weight: 500;
    justify-content: center;
    letter-spacing: 0.0892857143em;
    line-height: normal;
    max-width: 100%;
    text-transform: uppercase;
    vertical-align: middle;
    border-style: solid;
    border-width: 0;
    cursor: pointer;
    box-shadow: 0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, .2)), 0 2px 2px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, .14)), 0 1px 5px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, .12));
    font-size: 20px;
    padding: 10px 20px;
}

.btn-primary {
    background-color: #0459ed;
    color: #fff;
}

.btn-secondary {
    background-color: #c3c3c3;
    color: #000;
}

.btn-warning {
    background-color: #ede204;
    color: #000;
}

.btn-danger {
    background-color: #ed2b04;
    color: #000;
}
</style>