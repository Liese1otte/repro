<script lang="ts">
import { T } from "@threlte/core";
import { InstancedMesh, Instance, useTexture } from "@threlte/extras";

import * as THREE from "three";

import { row, col } from "../utils";
import { heightMap } from "../stores/stores";

import { base } from "$app/paths";

const unitCoefficient = 0.5;

// ### Pillars ### //

const pillarPath: string = `${base}/cube.png`;

const verticalTexture = useTexture(pillarPath).then((texture) => {
    texture = texture.clone();
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 10);
    return texture;
});

const horizontalTexture = useTexture(pillarPath).then((texture) => {
    texture = texture.clone();
    return texture;
});

// ### Horizontal coordinates ### //

function horizontalCoords() {
    let outputArray = [];
    for (let i = 0; i < 256; i++) {
        outputArray.push({ x: col(i) - 7.5, z: row(i) - 7.5 });
    }
    return outputArray;
}

const horizontal = horizontalCoords();
</script>

{#await Promise.all([horizontalTexture, verticalTexture]) then [textureH, textureV]}
    <InstancedMesh>
        <T.BoxGeometry args={[1, 10, 1]} />
        <T.MeshStandardMaterial
            map={textureV}
            attach={(parent, self) => {
                if (Array.isArray(parent.material)) parent.material = [...parent.material, self];
                else parent.material = [self];
            }}
        />
        <T.MeshStandardMaterial
            map={textureV}
            attach={(parent, self) => {
                if (Array.isArray(parent.material)) parent.material = [...parent.material, self];
                else parent.material = [self];
            }}
        />
        <T.MeshStandardMaterial
            map={textureH}
            attach={(parent, self) => {
                if (Array.isArray(parent.material)) parent.material = [...parent.material, self];
                else parent.material = [self];
            }}
        />
        <T.MeshStandardMaterial
            map={textureH}
            attach={(parent, self) => {
                if (Array.isArray(parent.material)) parent.material = [...parent.material, self];
                else parent.material = [self];
            }}
        />
        <T.MeshStandardMaterial
            map={textureV}
            attach={(parent, self) => {
                if (Array.isArray(parent.material)) parent.material = [...parent.material, self];
                else parent.material = [self];
            }}
        />
        <T.MeshStandardMaterial
            map={textureV}
            attach={(parent, self) => {
                if (Array.isArray(parent.material)) parent.material = [...parent.material, self];
                else parent.material = [self];
            }}
        />
        {#each Array(256) as _, i (i)}
            <Instance
                position.x={horizontal[i].x}
                position.y={$heightMap[row(i)][col(i)] * unitCoefficient}
                position.z={horizontal[i].z}
            />
        {/each}
    </InstancedMesh>
{/await}
