<script lang="ts">
import { T } from '@threlte/core';
import { InstancedMesh, useTexture, Instance } from '@threlte/extras';
import * as THREE from 'three';
import { prefabMap, heightMap } from '../stores/stores';
import { base } from '$app/paths';
import { degToRad } from '../utils';

// bad

const meleePrefabTexture = useTexture(`${base}/melee.png`).then((texture) => {
    texture.magFilter = THREE.NearestFilter;
    return texture;
});

const projectilePrefabTexture = useTexture(`${base}/projectile.png`).then((texture) => {
    texture.magFilter = THREE.NearestFilter;
    return texture;
});

const hideousPrefabTexture = useTexture(`${base}/hideous.png`).then((texture) => {
    texture.magFilter = THREE.NearestFilter;
    return texture;
});

function generateEnemyPrefabConfig(prefabs: number[][]) {
    let outArray: { i: number; j: number; type: number }[] = [];
    for (let i = 0; i < prefabs.length; i++) {
        for (let j = 0; j < prefabs[i].length; j++) {
            if (prefabs[i][j] == 1 || prefabs[i][j] == 2 || prefabs[i][j] == 5) {
                outArray.push({ i: i, j: j, type: prefabs[i][j] });
            }
        }
    }
    return outArray;
}

let enemyPrefabConfig: { i: number; j: number; type: number }[];

$: enemyPrefabConfig = generateEnemyPrefabConfig($prefabMap);
</script>

<!-- do these as one thing smh -->
{#await meleePrefabTexture then texture}
    <InstancedMesh>
        <T.PlaneGeometry />
        <T.MeshStandardMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
        {#each enemyPrefabConfig as enemyPrefab}
            {#if enemyPrefab.type == 1}
                <Instance
                    position={[
                        enemyPrefab.j - 7.5,
                        $heightMap[enemyPrefab.i][enemyPrefab.j] * 0.5 + 5.01,
                        enemyPrefab.i - 7.5
                    ]}
                    rotation.x={degToRad(90)}
                />
            {/if}
        {/each}
    </InstancedMesh>
{/await}
{#await projectilePrefabTexture then texture}
    <InstancedMesh>
        <T.PlaneGeometry />
        <T.MeshStandardMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
        {#each enemyPrefabConfig as enemyPrefab}
            {#if enemyPrefab.type == 2}
                <Instance
                    position={[
                        enemyPrefab.j - 7.5,
                        $heightMap[enemyPrefab.i][enemyPrefab.j] * 0.5 + 5.01,
                        enemyPrefab.i - 7.5
                    ]}
                    rotation.x={degToRad(90)}
                />
            {/if}
        {/each}
    </InstancedMesh>
{/await}
{#await hideousPrefabTexture then texture}
    <InstancedMesh>
        <T.PlaneGeometry />
        <T.MeshStandardMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
        {#each enemyPrefabConfig as enemyPrefab}
            {#if enemyPrefab.type == 5}
                <Instance
                    position={[
                        enemyPrefab.j - 7.5,
                        $heightMap[enemyPrefab.i][enemyPrefab.j] * 0.5 + 5.01,
                        enemyPrefab.i - 7.5
                    ]}
                    rotation.x={degToRad(90)}
                />
            {/if}
        {/each}
    </InstancedMesh>
{/await}
