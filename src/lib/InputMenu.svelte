<script lang="ts">
import InputMatrix from './InputMatrix.svelte';

import {
    cameraPosition,
    defaultCameraPosition,
    cameraTarget,
    defaultCameraTarget
} from '../stores/stores';
</script>

<div class="menu-background">
    <InputMatrix />
    <div class="control-menu">
        <button
            class="camera-reset"
            on:click={() => {
                $cameraPosition = defaultCameraPosition;
                $cameraTarget = defaultCameraTarget;
            }}>Reset Camera</button
        >
    </div>
</div>

<style lang="less">
.menu-background {
    width: 100%;
    height: 100%;
    background: #111111;
}
</style>
