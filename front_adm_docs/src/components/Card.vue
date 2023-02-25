<template>
    <div class="location-contain">
        <div class="locations">
            <div class="place" :style="{ height: heightCard }">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        heightCard: String
    }
}
</script>

<style>
.location-contain {
    display: flex;
    justify-content: center;
}

.locations { width: 95% }

.place {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    background: white;
    border: 1px solid #ddd;
    padding: 20px 20px;
    margin: 10px;
}

.place h2 {
    margin: 0;
    text-align: center;
}
</style>