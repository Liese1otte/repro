<script lang="ts">
import { Canvas } from "@threlte/core";

import InputMenu from "$lib/InputMenu.svelte";
import MainScene from "$lib/MainScene.svelte";
</script>

<div class="website">
    <div class="canvas-container">
        <Canvas
            toneMapping={0}
            colorSpace={"srgb-linear"}
        >
            <MainScene />
        </Canvas>
    </div>
    <div class="menu-container">
        <InputMenu />
    </div>
</div>

<style>
@import "/src/globals.css";

div.website {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    width: 100%;
    height: 100%;
}

div.canvas-container {
    grid-column: 1 / span 2;

    margin: 20px 10px 20px 20px;
}

div.menu-container {
    grid-column: 3 / span 1;

    margin: 20px 20px 20px 10px;
}
</style>
