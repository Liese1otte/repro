<script lang="ts">
import { resolveMap, currentMapId, heightMap, prefabMap } from '../stores/stores';
import { getMapArraysFromCGPString } from "../patternParsing";
import { row, col } from "../utils"; 

function swapMaps(): void {
    $currentMapId = $currentMapId == 0 ? 1 : 0;
}

$: currentMap = resolveMap($currentMapId);

let patternFileInput: HTMLInputElement;

async function parsePattern(): Promise<void> {
if (patternFileInput.files == null) {
    return;
}
let [file] = patternFileInput.files;
if (!file || (file && !file.name.endsWith('.cgp'))) {
    return;
}
currentPatternName = file.name.replace(/\.[^/.]+$/, '');
setPatternFromCgp(await file.text());
}

function setPatternFromCgp(cgp: string): void {
let [heights, prefabs] = getMapArraysFromCGPString(cgp);
$heightMap = heights;
$prefabMap = prefabs;
}

let currentPatternName: string;
</script>

<div class="maps">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="map"
        on:contextmenu={(e) => {
            e.preventDefault();
        }}
    >
        {#each Array(256) as _, index (index)}
            <button
                class="map-cell"
                id={index.toString()}
                on:click={() => {
                    currentMap.updateMap(index, 1);
                }}
                on:contextmenu={() => {
                    currentMap.updateMap(index, -1);
                }}
                >{$currentMap[row(index)] === undefined
                    ? 0
                    : $currentMap[row(index)][col(index)]}</button
            >
        {/each}
    </div>
</div>
<button
    class="toggle-maps"
    on:click={() => {
        swapMaps();
    }}>Switch Maps</button
>
<button
    class="height-reset"
    on:click={() => {
        $currentMap = Array.from(Array(16), () => Array(16).fill(0));
    }}>Reset Pattern</button
>
<input
type="file"
on:change={() => {
    parsePattern();
}}
bind:this={patternFileInput}
accept=".cgp"
/>

<style lang="less">
.maps {
    display: grid;
    grid-template: 1fr / 1fr;
}
.map {
    display: grid;
    width: calc(100% - 10px);
    aspect-ratio: 1 / 1;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(16, 1fr);
    gap: 5px;
    padding: 5px;
    grid-column: 1 / 1;
    grid-row: 1 / 1;
}
.map-cell {
    background: #222222;
    color: #999999;
}
</style>
