<script lang="ts">
import { T, useThrelte } from "@threlte/core";
import { OrbitControls } from "@threlte/extras";

import type { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Grid from "$lib/Grid.svelte";
import Pads from "$lib/Pad.svelte";
import Enemies from "./Enemy.svelte";

import { cameraPosition, cameraTarget } from "../stores/stores";

// ### Camera persistence ### //

const { camera } = useThrelte();

let controls: ThreeOrbitControls;

window.onbeforeunload = () => {
    $cameraTarget = controls.target.toArray();
    $cameraPosition = $camera.position.toArray();
};
</script>

<T.PerspectiveCamera makeDefault position={$cameraPosition}>
    <OrbitControls
        bind:ref={controls}
        target={$cameraTarget}
        enableDamping
    />
</T.PerspectiveCamera>

<T.AmbientLight intensity={1} color="white" />

<T.Group>
    <Grid />
    <Pads />
    <Enemies />
</T.Group>
